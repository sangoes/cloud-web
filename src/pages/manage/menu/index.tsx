import React from 'react';

interface Props {}

interface State {}

/**
 * @description 菜单管理
 * @author jerrychir
 * @export
 * @class MenuManage
 * @extends {React.Component<Props, State>}
 */
export default class MenuManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>菜单</div>;
  }
}
