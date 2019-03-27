import React from 'react';

interface Props {}

interface State {}

/**
 * @description 角色管理
 * @author jerrychir
 * @export
 * @class RoleManage
 * @extends {React.Component<Props, State>}
 */
export default class RoleManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>角色管理</div>;
  }
}
