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
 * @description 新建代码生产
 * @author jerrychir
 * @export
 * @class NewCodeGen
 * @extends {React.Component<Props, State>}
 */
class NewCodeGen extends React.Component<Props, State> {
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
  getFields() {
    const count = 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof NewCodeGen
   */
  render() {
    const { visible, handleCancel } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        destroyOnClose
        title="生产配置"
        width="800px"
        visible={visible}
        onOk={this.handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={24}>
          <div className={styles.formList}>
            {/* 模块名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模块名">
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="模块名 upms" />)}
              </FormItem>
            </Col>
            {/* 子模块名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="子模块名">
                {getFieldDecorator('dictValue', {
                  rules: [{ message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="子模块名 upms-service" />)}
              </FormItem>
            </Col>
            {/* 包名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="包名">
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="包名 com.sangoes.cloud.upms" />)}
              </FormItem>
            </Col>
            {/* 表名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="表名">
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="表名 sys_user" />)}
              </FormItem>
            </Col>
            {/* 表前缀 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="表前缀">
                {getFieldDecorator('dictValue', {
                  rules: [{ message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="表前缀 sys" />)}
              </FormItem>
            </Col>
            {/* 备注 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
                {getFieldDecorator('dictValue', {
                  rules: [{ message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="备注" />)}
              </FormItem>
            </Col>
          </div>
        </Row>
      </Modal>
    );
  }
}
export default Form.create<Props>()(NewCodeGen);
