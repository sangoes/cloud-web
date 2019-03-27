import React from 'react';

interface Props {}

interface State {}

/**
 * @description 用户管理
 * @author jerrychir
 * @export
 * @class UserManage
 * @extends {React.Component<Props, State>}
 */
export default class UserManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof UserManage
   */
  render() {
    return <div>用户管理</div>;
  }
}
