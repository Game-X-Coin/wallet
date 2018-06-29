import React, { Component } from 'react';
import dayjs from 'dayjs';

import echarts from 'echarts';

import './style.scss';

const debounce = (fn, ms) => {
  let timeout;

  return function() {
    const func = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(func, ms);
  };
};

class TradeChart extends Component {
  constructor() {
    super();

    this.chartRef = React.createRef();
    this.echart = null;
    this.xAxis = null;
    this.series = null;
  }

  componentWillUnmount() {
    if (this.echart) {
      this.echart.dispose();
      this.echart = null;
    }

    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.updateChart();
    }
  }

  componentDidMount() {
    this.drawChart();
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    if (this.echart) {
      this.echart.resize();
    }
  }, 100);

  updateChart() {
    const { data } = this.props;
    const { series, xAxis } = this;

    if (!series || !xAxis) {
      return;
    }

    xAxis.data = data.map(v => dayjs(v.timestamp).format('MMM DD hh:mm'));
    series[0].data = data.map(v => v.value);

    this.echart.setOption({
      xAxis,
      series
    });
  }

  drawChart() {
    if (this.echart) {
      this.echart.dispose();
      this.echart = null;
    }

    this.echart = echarts.init(this.chartRef.current);

    const { data } = this.props;

    if (!data.length) {
      return;
    }

    const dates = data.map(v => dayjs(v.timestamp).format('MMM DD hh:mm'));
    const values = data.map(v => v.value);

    const option = {
      grid: [
        {
          top: 0,
          left: 0,
          right: 0,
          height: '80%',
          borderWidth: 0
        },
        {
          left: '0%',
          right: '0%',
          bottom: 0
        }
      ],
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          margin: 12,
          color: '#666'
        },
        axisTick: {
          length: 7
        },
        axisLine: {
          lineStyle: {
            color: ['rgba(0, 0, 0, 0.1)']
          }
        }
      },
      yAxis: {
        position: 'right',
        scale: true,
        type: 'value',
        offset: 10,
        splitNumber: 7,
        axisLabel: {
          padding: 10,
          margin: 10,
          inside: true,
          verticalAlign: 'bottom',
          color: '#666'
        },
        splitLine: {
          lineStyle: {
            color: ['rgba(0, 0, 0, 0.06)']
          }
        },
        z: 10
      },
      axisPointer: {
        label: {
          backgroundColor: '#383838',
          formatter({ value }) {
            return isNaN(value)
              ? dayjs(value).format('YYYY MMM DD HH:mm')
              : value.toFixed(2);
          }
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 80,
          end: 100
        },
        {
          start: 80,
          end: 100,
          showDetail: false
        }
      ],
      tooltip: {
        trigger: 'axis',
        alwaysShowContent: true,
        position: [10, 10],
        backgroundColor: '',
        padding: 0,
        textStyle: {
          color: '#666'
        },
        axisPointer: {
          type: 'cross'
        },
        formatter([{ value, axisValueLabel, seriesName }]) {
          return `${axisValueLabel} | ${value}`;
        }
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          sampling: 'average',
          lineStyle: {
            width: 1,
            color: 'rgba(255, 70, 131, 1)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 158, 68, 0.25)'
              },
              {
                offset: 1,
                color: 'rgba(255, 70, 131, 0.25)'
              }
            ])
          },
          /* markPoint: {
            data: [
              {
                type: 'min'
              },
              {
                type: 'max'
              }
            ]
          }, */
          data: values
        }
      ]
    };

    this.series = option.series;
    this.xAxis = option.xAxis;
    this.echart.setOption(option);
  }

  render() {
    return <div className="chart" ref={this.chartRef} />;
  }
}

export default TradeChart;
