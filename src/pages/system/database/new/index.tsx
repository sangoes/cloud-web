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
    const { handleOk } = this.props;
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
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="链接名 cloud本地" />)}
              </FormItem>
            </Col>
            {/* 数据库IP */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="数据库IP">
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="数据库IP 127.0.0.1" />)}
              </FormItem>
            </Col>
            {/* 端口 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="端口">
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="端口 3306" />)}
              </FormItem>
            </Col>
            {/* 数据库名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="数据库名">
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="数据库名 cloud" />)}
              </FormItem>
            </Col>
            {/* 用户名 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="用户名 sangoes" />)}
              </FormItem>
            </Col>
            {/* 密码 */}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
                {getFieldDecorator('dictValue', {
                  rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
                })(<Input placeholder="密码 ENC(YdexccdKp+UxJ2pg==)" />)}
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
export default Form.create<Props>()(NewDataBase);
