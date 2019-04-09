import React from 'react';
import { Modal, Form, Tree, Icon, Input, Row, Col, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from '../index.less';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const FormItem = Form.Item;

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
 * @class AddDict
 * @extends {React.Component<Props, State>}
 */
class AddDict extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 确认按钮
   * @private
   * @memberof AddDict
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
   * @memberof AddDict
   */
  render() {
    const { visible, handleCancel, form } = this.props;
    return (
      <Modal
        title="添加字典"
        visible={visible}
        width="700px"
        onOk={this.handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className={styles.content}>
          <div className={styles.tree}>
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={this.onSelect}
              onExpand={this.onExpand}
            >
              <TreeNode icon={<Icon type="setting" />} title="设置" key="0-0">
                <TreeNode title="系统设置" key="0-0-0" isLeaf />
                <TreeNode title="安全设置" key="0-0-1" isLeaf />
                <TreeNode title="用户" key="0-1-0" isLeaf />
                <TreeNode title="菜单" key="0-1-1" isLeaf />
              </TreeNode>
            </DirectoryTree>
          </div>
          <div className={styles.form}>
            {/* 所属字典 */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属字典">
              {form.getFieldDecorator('parentDict', {
                rules: [{ required: true }],
              })(<Input placeholder="所属字典" />)}
            </FormItem>
            {/* 字典名称 */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名称">
              {form.getFieldDecorator('dictKey', {
                rules: [{ required: true }],
              })(<Input placeholder="字典名称" />)}
            </FormItem>
            {/* 字典值 */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典值">
              {form.getFieldDecorator('dictValue', {
                rules: [{ required: true }],
              })(<Input placeholder="字典值" />)}
            </FormItem>
            {/* 备注 */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
              {form.getFieldDecorator('des', {
                rules: [],
              })(<Input placeholder="备注" />)}
            </FormItem>
            {/* 按钮 */}
            <div className={styles.btnGroup}>
              <Button className={styles.btn} onClick={this._onEditClick}>
                编辑
              </Button>
              <Button className={styles.btn} type="primary" onClick={this._onSaveClick}>
                确定
              </Button>
              <Button className={styles.btn} type="danger" ghost onClick={this._onDeleteDict}>
                删除
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
export default Form.create<Props>()(AddDict);
