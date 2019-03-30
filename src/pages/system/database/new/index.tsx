import React from 'react';
import styles from '../index.less';
import { Modal, Button, Form, Input, Icon, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  visible?: boolean;
  handleOk?: (value: string) => any;
  handleCancel?: () => void;
}

interface State {}

/**
 * @description 新建数据链接
 * @author jerrychir
 * @export
 * @class NewDataBase
 * @extends {React.Component<Props, State>}
 */
class NewDataBase extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 点击ok
   * @private
   * @memberof NewDataBase
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
   * @memberof NewDataBase
   */
  render() {
    const { visible, handleCancel } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        destroyOnClose
        title="数据库链接"
        width="800px"
        visible={visible}
        onOk={this.handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={24}>
          <div className={styles.formList}>
            {/* 链接名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="链接名">
                {getFieldDecorator('connectionName', {
                  rules: [{ required: true, message: '链接名最多20位', max: 20 }],
                })(<Input placeholder="链接名 cloud本地" />)}
              </FormItem>
            </Col>
            {/* 数据库IP */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="数据库IP">
                {getFieldDecorator('ip', {
                  rules: [{ required: true, message: '数据库IP最多40', max: 40 }],
                })(<Input placeholder="数据库IP 127.0.0.1" />)}
              </FormItem>
            </Col>
            {/* 端口 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="端口">
                {getFieldDecorator('port', {
                  rules: [{ required: true, message: '端口最多6', max: 6 }],
                })(<Input placeholder="端口 3306" />)}
              </FormItem>
            </Col>
            {/* 数据库名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="数据库名">
                {getFieldDecorator('dbName', {
                  rules: [{ required: true, message: '数据库名最多30', max: 30 }],
                })(<Input placeholder="数据库名 cloud" />)}
              </FormItem>
            </Col>
            {/* 用户名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
                {getFieldDecorator('dbUsername', {
                  rules: [{ required: true, message: '用户名最多30', max: 30 }],
                })(<Input placeholder="用户名 sangoes" />)}
              </FormItem>
            </Col>
            {/* 密码 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
                {getFieldDecorator('dbPassword', {
                  rules: [{ required: true, message: '密码最多20', max: 20 }],
                })(<Input placeholder="密码 " />)}
              </FormItem>
            </Col>
            {/* 备注 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
                {getFieldDecorator('des', {
                  rules: [{ message: '备注最多50', max: 50 }],
                })(<Input placeholder="备注" />)}
              </FormItem>
            </Col>
          </div>
        </Row>
      </Modal>
    );
  }
}
export default Form.create<Props>()(NewDataBase);
