import React from 'react';
import styles from './index.less';
import { Spin } from 'antd';
import { SpinSize } from 'antd/lib/spin';
import classNames from 'classnames';

interface Props {
  type?: 'default' | 'page';
  size?: SpinSize;
}

interface State {}

export default class Loading extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {
    type: 'default',
    size: 'large',
  };

  render() {
    const { type, size } = this.props;
    let classes = styles.defaultLoading;
    switch (type) {
      case 'page':
        classes = styles.pageLoading;
        break;
      default:
        break;
    }
    return (
      <div className={classes}>
        <Spin size={size} />
      </div>
    );
  }
}
