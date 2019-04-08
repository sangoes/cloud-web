import React from 'react';
import { Modal, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends FormComponentProps {
  visible?: boolean;
  handleOk?: (value: string) => any;
  handleCancel?: () => void;
}

interface State {}

/**
 * @description 添加菜单
 * @author jerrychir
 * @export
 * @class AddMenu
 * @extends {React.Component<Props, State>}
 */
class AddMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 确认按钮
   * @private
   * @memberof AddMenu
   */
  private handleOk = () => {
    const { form, handleOk } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleOk(fieldsValue);
    });
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof AddMenu
   */
  render() {
    const { visible, handleCancel } = this.props;
    return (
      <Modal
        title="添加菜单权限"
        visible={visible}
        onOk={this.handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        添加菜单
      </Modal>
    );
  }
}
export default Form.create<Props>()(AddMenu);
