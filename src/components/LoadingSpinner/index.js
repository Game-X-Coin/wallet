import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import './style.scss';

class LoadingSpinner extends PureComponent {
  render() {
    const circleSize = 6;
    const circleWidth = 3;
    const logoSize = 4;

    const Element = ({ className, scale = 1 }) => (
      <div className={classNames('loading-spinner', className)}>
        <div
          className="loading-spinner__circle"
          style={{
            width: `${circleSize * scale}rem`,
            height: `${circleSize * scale}rem`,
            borderTopWidth: `${circleWidth * scale}px`
          }}
        />

        <svg
          className="loading-spinner__logo"
          viewBox="0 0 164 133"
          style={{
            width: `${logoSize * scale}rem`,
            height: `${logoSize * scale}rem`
          }}
        >
          <polygon fill="#FFD111" points="41,123 82,82 0,82 " />
          <rect
            x="53.009"
            y="12.009"
            transform="matrix(0.7071 0.7071 -0.7071 0.7071 53.0087 -45.9742)"
            fill="#0070BE"
            width="57.983"
            height="57.983"
          />
          <rect
            x="94.009"
            y="53.009"
            transform="matrix(0.7071 0.7071 -0.7071 0.7071 94.0088 -62.957)"
            fill="#33BA20"
            width="57.983"
            height="57.983"
          />
          <polygon fill="#FF4B34" points="0,82 82,82 41,41 " />
        </svg>
      </div>
    );

    if (this.props.global) {
      return ReactDOM.createPortal(
        <Element className="global" />,
        document.querySelector('body')
      );
    }

    return <Element {...this.props} />;
  }
}

export default LoadingSpinner;
