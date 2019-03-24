import React from 'react';
import styles from './MemberLayout.less';

interface Props {}

interface State {}

/**
 * @description 用户布局
 * @author jerrychir
 * @export
 * @class MemberLayout
 * @extends {React.Component<Props, State>}
 */
export class MemberLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof MemberLayout
   */
  render() {
    return <div className={styles.container}>{this.props.children}</div>;
  }
}
