import React from 'react';
import styles from '../index.less';
import { Modal, Button } from 'antd';

interface Props {
  visible?: boolean;
  handleOk?: (value: string) => any;
  handleCancel?: () => void;
}

interface State {}

/**
 * @description 新建代码生产
 * @author jerrychir
 * @export
 * @class NewCodeGen
 * @extends {React.Component<Props, State>}
 */
export default class NewCodeGen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 点击ok
   * @private
   * @memberof NewCodeGen
   */
  private handleOk = () => {
    const { handleOk } = this.props;
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof NewCodeGen
   */
  render() {
    const { visible, handleCancel } = this.props;
    return (
      <div>
        <Modal title="Basic Modal" visible={visible} onOk={this.handleOk} onCancel={handleCancel}>
          asdfsa
        </Modal>
      </div>
    );
  }
}
