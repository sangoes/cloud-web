import React from 'react';
import { Modal, Form, Tree, Input, Spin, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from '../index.less';
import { TreeDict, ListDictItem } from '@/interface/upms/dict';
import { AntTreeNodeSelectedEvent } from 'antd/lib/tree';
import { createActions, createAction } from '@/utils';
import { TREE_DICT, ADD_DICT, UPDATE_DICT } from '@/actions/upms/dict';
import { connect } from 'dva';
import { getTreeItem } from '@/utils/utils';
import Loading from '@/components/Loading';

const FormItem = Form.Item;
const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const confirm = Modal.confirm;

interface Props extends FormComponentProps {
  dispatch?: any;
  visible?: boolean;
  item?: ListDictItem;
  treeDict?: TreeDict[];
  handleCancel?: () => void;
  remove?: (value: string) => any;
}

interface State {
  // 是否可编辑
  disabled: boolean;
  // 选中的项目key
  selectedKeys: string[];
  // 选中项目
  dictItem?: TreeDict;
  // 临时项目
  tempItem?: TreeDict;
  // 模式 添加|更新
  mode: 'save' | 'update' | 'none';
}

/**
 * @description 添加子字典
 * @author jerrychir
 * @export
 * @class AddSubDict
 * @extends {React.Component<Props, State>}
 */
@connect(({ dict, loading }) => ({ ...dict, dictTreeLoading: loading.effects[TREE_DICT] }))
class AddSubDict extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      disabled: true,
      selectedKeys: [],
      mode: 'none',
    };
  }
  /**
   * @description 渲染完成
   * @memberof AddSubDict
   */
  componentDidMount = () => {
    const { item } = this.props;
    // 请求字典树形数据
    item &&
      this.props.dispatch(
        createActions(TREE_DICT)(item.id)(() => {
          const { treeDict } = this.props;
          const selectedKeys = treeDict.length > 0 ? [treeDict[0].id] : [];
          this.setState({
            selectedKeys: selectedKeys,
            dictItem: treeDict[0],
            tempItem: treeDict[0],
          });
        })
      );
  };

  /**
   * @description 确认
   * @private
   * @memberof AddSubDict
   */
  private handleOk = () => {
    const { form } = this.props;
    const { mode, tempItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // handleOk(fieldsValue, mode);
      const { item, form } = this.props;
      switch (mode) {
        case 'save':
          fieldsValue.pid = tempItem.id;
          this.props.dispatch(
            createActions(ADD_DICT)({ ...fieldsValue, key: item.id })(() => {
              form.resetFields();
              this.setState({ dictItem: tempItem, disabled: true, mode: 'none' });
            })
          );
          break;
        case 'update':
          fieldsValue.id = tempItem.id;
          fieldsValue.pid = tempItem.pid;
          this.props.dispatch(
            createActions(UPDATE_DICT)({ ...fieldsValue, key: item.id })(() => {
              form.resetFields();
              this.setState({ dictItem: tempItem, disabled: true, mode: 'none' });
            })
          );
          break;
        default:
          break;
      }
    });
  };

  /**
   * @description 构建树形
   * @memberof AddDict
   */
  private getDirectoryTreeNode = tree =>
    tree.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} value={item.value}>
            {this.getDirectoryTreeNode(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.id} value={item.value} isLeaf />;
    });
  /**
   * @description 树形点击
   * @private
   * @memberof AddDict
   */
  private onSelect = (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => {
    const { treeDict } = this.props;
    // 查询item
    const item = getTreeItem(treeDict, selectedKeys.join());
    this.setState({ selectedKeys: selectedKeys, dictItem: item, tempItem: item, disabled: true });
  };
  /**
   * @description 操作字典
   * @private
   * @memberof AddDict
   */
  private handleDict = (type: string) => {
    const { tempItem } = this.state;
    const { remove } = this.props;
    switch (type) {
      // 编辑
      case 'edit':
        this.setState({ disabled: false, mode: 'update' });
        break;
      // 添加
      case 'add':
        this.setState({ dictItem: null, disabled: false, mode: 'save' });
        break;
      // 返回
      case 'return':
        this.setState({ dictItem: tempItem, disabled: true, mode: 'none' });
        break;
      // 删除
      case 'delete':
        remove(tempItem.id);
        break;
      default:
        break;
    }
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof AddSubDict
   */
  render() {
    const { visible, handleCancel, form, treeDict } = this.props;
    const { disabled, selectedKeys, dictItem, mode } = this.state;
    return (
      <Modal
        title="添加字典"
        visible={visible}
        width="700px"
        destroyOnClose
        onOk={this.handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: mode === 'none' ? true : false }}
        // confirmLoading={confirmLoading}
      >
        <div className={styles.content}>
          <div className={styles.tree}>
            {selectedKeys.length > 0 ? (
              <DirectoryTree selectedKeys={selectedKeys} defaultExpandAll onSelect={this.onSelect}>
                {this.getDirectoryTreeNode(treeDict)}
              </DirectoryTree>
            ) : (
              <Loading size="default" />
            )}
          </div>
          <div className={styles.form}>
            {/* 字典名称 */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名称">
              {form.getFieldDecorator('dictValue', {
                initialValue: dictItem && dictItem.value,
                rules: [{ required: true }],
              })(<Input placeholder="字典名称" disabled={disabled} />)}
            </FormItem>
            {/* 字典值 */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典值">
              {form.getFieldDecorator('dictKey', {
                initialValue: dictItem && dictItem.key,
                rules: [{ required: true }],
              })(<Input placeholder="字典值" disabled={disabled} />)}
            </FormItem>
            {/* 备注 */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
              {form.getFieldDecorator('des', {
                initialValue: dictItem && dictItem.des,
                rules: [],
              })(<Input placeholder="备注" disabled={disabled} />)}
            </FormItem>
            {/* 按钮 */}
            {selectedKeys.length > 0 && (
              <div className={styles.btnGroup}>
                {!disabled ? (
                  <Button className={styles.btn} onClick={() => this.handleDict('return')}>
                    返回
                  </Button>
                ) : (
                  <div>
                    <Button className={styles.btn} onClick={() => this.handleDict('add')}>
                      添加
                    </Button>
                    <Button className={styles.btn} onClick={() => this.handleDict('edit')}>
                      编辑
                    </Button>
                  </div>
                )}

                <Button
                  className={styles.btn}
                  type="danger"
                  ghost
                  onClick={() => this.handleDict('delete')}
                >
                  删除
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}
export default Form.create<Props>()(AddSubDict);
