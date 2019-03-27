import React from 'react';

interface Props {}

interface State {}

/**
 * @description 字典管理
 * @author jerrychir
 * @export
 * @class DictManage
 * @extends {React.Component<Props, State>}
 */
export default class DictManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>字典管理</div>;
  }
}
