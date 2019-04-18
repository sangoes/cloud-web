import React from 'react';
import { Modal, Form, Tree, Icon, Input, Row, Col, Button, TreeSelect } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from '../index.less';
import { connect } from 'dva';
import { createActions } from '@/utils';
import { PAGE_DICT, TREE_DICT } from '@/actions/upms/dict';
import { ListDictItem, TreeDict } from '@/interface/upms/dict';
import { AntTreeNodeSelectedEvent, AntTreeNodeExpandedEvent } from 'antd/lib/tree';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const FormItem = Form.Item;

interface Props extends FormComponentProps {
  dispatch?: any;
  visible?: boolean;
  mode?: 'add' | 'check';
  item?: ListDictItem;
  treeDict?: TreeDict[];
  handleOk?: (value: string) => any;
  handleCancel?: () => void;
}

interface State {
  selectedKeys: string[];
  defaultDictValue: {};
}

/**
 * @description 添加菜单
 * @author jerrychir
 * @export
 * @class AddDict
 * @extends {React.Component<Props, State>}
 */
@connect(({ dict }) => ({ ...dict }))
class AddDict extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedKeys: [],
      defaultDictValue: {},
    };
  }

  componentDidMount(): void {
    const { item } = this.props;
    item &&
      this.props.dispatch(
        createActions(TREE_DICT)(item.id)(() => {
          const { treeDict } = this.props;
          this.setState({
            selectedKeys: [treeDict[0].key],
            defaultDictValue: { key: treeDict[0].key, value: treeDict[0].value },
          });
        })
      );
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
   * @description 所属字典
   * @private
   * @memberof AddDict
   */
  private renderDictSelect = () => {
    const { treeDict } = this.props;

    return (
      <TreeSelect
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeDict}
        placeholder="Please select"
        treeDefaultExpandAll
        labelInValue
        onChange={this.onTreeChange}
      />
    );
  };

  /**
   * @description 操作字典
   * @private
   * @memberof AddDict
   */
  private handleDict = (type: 'save' | 'update') => {};

  onDrop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    console.log('dropKey:', dropKey);
    console.log('dragKey:', dragKey);
    console.log('dropPos:', dropPos);
    console.log('dropPosition:', dropPosition);
  };
  onDragEnter = info => {};

  /**
   * @description 构建树形
   * @memberof AddDict
   */
  private getDirectoryTreeNode = tree =>
    tree.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} value={item.value}>
            {this.getDirectoryTreeNode(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key} value={item.value} isLeaf />;
    });
  /**
   * @description 树形点击
   * @private
   * @memberof AddDict
   */
  private onSelect = (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => {
    this.setState({ selectedKeys: selectedKeys });
  };
  private onTreeChange = (value: any, label: any, extra: any) => {
    console.log(value);
    console.log(label);
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof AddDict
   */
  render() {
    const { visible, handleCancel, form, treeDict } = this.props;
    const { selectedKeys, defaultDictValue } = this.state;
    return (
      <Modal
        title="添加字典"
        visible={visible}
        width="700px"
        destroyOnClose
        onOk={this.handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className={styles.content}>
          <div className={styles.tree}>
            {selectedKeys.length > 0 && (
              <DirectoryTree
                // multiple
                selectedKeys={selectedKeys}
                defaultExpandAll
                // draggable
                onDragEnter={this.onDragEnter}
                onDrop={this.onDrop}
                onSelect={this.onSelect}
              >
                {this.getDirectoryTreeNode(treeDict)}
              </DirectoryTree>
            )}
          </div>
          <div className={styles.form}>
            {/* 所属字典 */}
            {selectedKeys.length > 0 && (
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属字典">
                {form.getFieldDecorator('pid', {
                  initialValue: defaultDictValue,
                  rules: [{ required: true }],
                })(this.renderDictSelect())}
              </FormItem>
            )}

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
            {/* 按钮 */}
            <div className={styles.btnGroup}>
              <Button className={styles.btn} onClick={() => this.handleDict}>
                编辑
              </Button>
              <Button className={styles.btn} type="danger" ghost onClick={() => this.handleDict}>
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
