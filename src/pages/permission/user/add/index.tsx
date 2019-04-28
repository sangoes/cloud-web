import React from 'react';
import styles from '../index.less';
import { Form, Input, Modal, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ListUserItem } from '@/interface/permission/user';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  visible?: boolean;
  item?: ListUserItem;
  status?: 'save' | 'check' | 'edit';
  confirmLoading?: boolean;
  handleOk?: (value: string, status: string) => any;
  handleCancel?: () => void;
}

interface State {}

/**
 * @description 添加用户表
 * @author jerrychir
 * @export
 * @class AddUser
 * @extends {React.Component<Props, State>}
 */
class AddUser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  /**
   * @description 确认
   * @private
   * @memberof AddUser
   */
  private handleOk = () => {
    const { form, handleOk, status, item } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      item && (fieldsValue.id = item.id);
      handleOk(fieldsValue, status);
    });
  };

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof AddUser
   */
  render() {
    const { visible, handleCancel, form, item, status, confirmLoading } = this.props;
    const disabled = status === 'check' ? true : false;
    const title =
      (status === 'save' && '添加用户') ||
      (status === 'edit' && '编辑用户') ||
      (status === 'check' && '查看用户');
    return (
      <Modal
        title={title}
        visible={visible}
        destroyOnClose
        onOk={this.handleOk}
        okButtonProps={{ disabled: disabled }}
        onCancel={handleCancel}
        width="800px"
        confirmLoading={confirmLoading}
      >
        <Row gutter={24}>
          <div className={styles.formList}>
            {/** 用户名 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
                {form.getFieldDecorator('username', {
                  initialValue: item && item.username,
                  rules: [{ required: true, message: '用户名不能为空' }],
                })(<Input placeholder="用户名" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 加密密码 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
                {form.getFieldDecorator('password', {
                  initialValue: item && item.password,
                  rules: [{ required: true, message: '密码不能为空' }],
                })(<Input placeholder="密码" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 真实姓名 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
                {form.getFieldDecorator('realName', {
                  initialValue: item && item.realName,
                  rules: [{ required: true, message: '姓名不能为空' }],
                })(<Input placeholder="姓名" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 手机号 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
                {form.getFieldDecorator('mobile', {
                  initialValue: item && item.mobile,
                  rules: [],
                })(<Input placeholder="手机号" disabled={disabled} />)}
              </FormItem>
            </Col>

            {/** 邮箱 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
                {form.getFieldDecorator('email', {
                  initialValue: item && item.email,
                  rules: [],
                })(<Input placeholder="邮箱" />)}
              </FormItem>
            </Col>
          </div>
        </Row>
      </Modal>
    );
  }
}

export default Form.create<Props>()(AddUser);
