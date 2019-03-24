import React from 'react';
import styles from './index.less';

interface Props {}

interface State {}

/**
 * @description 主布局
 * @author jerrychir
 * @export
 * @class ContentLayout
 * @extends {React.Component<Props, State>}
 */
export class ContentLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className={styles.content}>{this.props.children}</div>;
  }
}
