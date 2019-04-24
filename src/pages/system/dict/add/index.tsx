import React from 'react';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  visible?: boolean;
  handleOk?: (value: string) => any;
  handleCancel?: () => void;
}

interface State {}

/**
 * @description 添加子字典
 * @author jerrychir
 * @export
 * @class AddDict
 * @extends {React.Component<Props, State>}
 */
class AddDict extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 确认
   * @private
   * @memberof AddDict
   */
  private handleOk = () => {
    const { form, handleOk } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.pid = -1;
      handleOk(fieldsValue);
    });
  };

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof AddDict
   */
  render() {
    const { visible, handleCancel, form } = this.props;
    return (
      <Modal
        title="添加字典"
        visible={visible}
        width="700px"
        destroyOnClose
        onOk={this.handleOk}
        onCancel={handleCancel}
        // confirmLoading={confirmLoading}
      >
        {/* 字典名称 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名称">
          {form.getFieldDecorator('dictValue', {
            rules: [{ required: true }],
          })(<Input placeholder="字典名称" />)}
        </FormItem>
        {/* 字典值 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典值">
          {form.getFieldDecorator('dictKey', {
            rules: [{ required: true }],
          })(<Input placeholder="字典值" />)}
        </FormItem>
        {/* 备注 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('des', {
            rules: [],
          })(<Input placeholder="备注" />)}
        </FormItem>
      </Modal>
    );
  }
}
export default Form.create<Props>()(AddDict);
