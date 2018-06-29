import React, { PureComponent } from 'react';
import classNames from 'classnames';

import './style.scss';

class Table extends PureComponent {
  render() {
    const { className, striped, hover, children, onClick } = this.props;

    return (
      <div
        className={classNames(
          'r-table',
          className,
          striped && 'striped',
          hover && 'hover'
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
}

const Ttitle = props => {
  return (
    <div
      className={classNames('r-table__title', props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const Thead = props => {
  return (
    <div
      className={classNames('r-table-head', props.className)}
      style={props.align && { textAlign: props.align }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const Tbody = props => {
  return (
    <div
      className={classNames('r-table-body', props.className)}
      style={
        (props.align && { textAlign: props.align },
        props.height && { height: props.height, overflow: 'auto' })
      }
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const Trow = props => {
  return (
    <div
      className={classNames('r-table-row', props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const Tcol = props => {
  return (
    <div
      className={classNames('r-table__col', props.className)}
      style={props.flex && { flex: props.flex }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export { Table, Ttitle, Thead, Tbody, Trow, Tcol };
