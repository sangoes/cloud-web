import React from 'react';
import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  visible?: boolean;
  handleOk?: (value: string) => any;
  handleCancel?: () => void;
}

interface State {}

/**
 * @description 添加授权表
 * @author jerrychir
 * @export
 * @class AddOauth
 * @extends {React.Component<Props, State>}
 */
class AddOauth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  /**
   * @description 确认
   * @private
   * @memberof AddOauth
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
   * @memberof AddOauth
   */
  render() {
    const { visible, handleCancel, form } = this.props;
    return (
      <Modal
        title="添加授权表"
        visible={visible}
        destroyOnClose
        onOk={this.handleOk}
        onCancel={handleCancel}
        // confirmLoading={confirmLoading}
      >
        {/** 备注 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('des', {
            rules: [{ required: true, message: '备注 不能为空' }],
          })(<Input placeholder="备注" />)}
        </FormItem>
        {/** 客户端ID **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="客户端ID">
          {form.getFieldDecorator('clientId', {
            rules: [{ required: true, message: '客户端ID 不能为空' }],
          })(<Input placeholder="客户端ID" />)}
        </FormItem>
        {/** 客户端密钥 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="客户端密钥">
          {form.getFieldDecorator('clientSecret', {
            rules: [{ required: true, message: '客户端密钥 不能为空' }],
          })(<Input placeholder="客户端密钥" />)}
        </FormItem>
        {/** 资源ID **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="资源ID">
          {form.getFieldDecorator('resourceIds', {
            rules: [{ required: true, message: '资源ID 不能为空' }],
          })(<Input placeholder="资源ID" />)}
        </FormItem>
        {/** 授权域 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权域">
          {form.getFieldDecorator('scope', {
            rules: [{ required: true, message: '授权域 不能为空' }],
          })(<Input placeholder="授权域" />)}
        </FormItem>
        {/** 授权模式 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权模式">
          {form.getFieldDecorator('authorizedGrantTypes', {
            rules: [{ required: true, message: '授权模式 不能为空' }],
          })(<Input placeholder="授权模式" />)}
        </FormItem>
        {/** 回调地址 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="回调地址">
          {form.getFieldDecorator('webServerRedirectUri', {
            rules: [{ required: true, message: '回调地址 不能为空' }],
          })(<Input placeholder="回调地址" />)}
        </FormItem>
        {/** 权限 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限">
          {form.getFieldDecorator('authorities', {
            rules: [{ required: true, message: '权限 不能为空' }],
          })(<Input placeholder="权限" />)}
        </FormItem>
        {/** 失效时间 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="失效时间">
          {form.getFieldDecorator('accessTokenValidity', {
            rules: [{ required: true, message: '失效时间 不能为空' }],
          })(<Input placeholder="失效时间" />)}
        </FormItem>
        {/** 刷新时间 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="刷新时间">
          {form.getFieldDecorator('refreshTokenValidity', {
            rules: [{ required: true, message: '刷新时间 不能为空' }],
          })(<Input placeholder="刷新时间" />)}
        </FormItem>
        {/** 扩展信息 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="扩展信息">
          {form.getFieldDecorator('additionalInformation', {
            rules: [{ required: true, message: '扩展信息 不能为空' }],
          })(<Input placeholder="扩展信息" />)}
        </FormItem>
        {/** 是否自动放行 **/}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否自动放行">
          {form.getFieldDecorator('autoapprove', {
            rules: [{ required: true, message: '是否自动放行 不能为空' }],
          })(<Input placeholder="是否自动放行" />)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<Props>()(AddOauth);
