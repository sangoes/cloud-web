import React from 'react';

interface Props {}

interface State {}

/**
 * @description 部门管理
 * @author jerrychir
 * @export
 * @class DepartmentManage
 * @extends {React.Component<Props, State>}
 */
export default class DepartmentManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>部门管理</div>;
  }
}
