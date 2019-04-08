import React from 'react';
import { ContentLayout } from '@/components/ContentLayout';
import { Tree, Input, Icon, Table, Pagination, Button, Dropdown, Menu } from 'antd';
import styles from './index.less';
import AddMenu from './add';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const Search = Input.Search;

interface Props {}

interface State {
  // 添加菜单可见
  addMenuVisible?: boolean;
}

/**
 * @description 菜单管理
 * @author jerrychir
 * @export
 * @class MenuManage
 * @extends {React.Component<Props, State>}
 */
export default class MenuManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };
  /**
   * @description 添加菜单可见
   * @private
   * @memberof MenuManage
   */
  private setAddMenuVisible = (visible: boolean) => {
    this.setState({ addMenuVisible: visible });
  };
  /**
   * @description 菜单下拉
   * @private
   * @memberof MenuManage
   */
  private renderMenuDropdown = () => {
    return (
      <Dropdown overlay={this.renderMenus()} trigger={['click']}>
        <a>
          <Icon type="plus" className={styles.plusIcon} />
        </a>
      </Dropdown>
    );
  };
  /**
   * @description 菜单
   * @private
   * @memberof MenuManage
   */
  private renderMenus = () => {
    return (
      <Menu onClick={this.addMenuClick}>
        <Menu.Item key="add">添加部门</Menu.Item>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );
  };
  /**
   * @description 添加菜单点击
   * @private
   * @memberof MenuManage
   */
  private addMenuClick = e => {
    switch (e.key) {
      // 添加菜单
      case 'add':
        this.setAddMenuVisible(true);
        break;
      // 编辑菜单
      case 'edit':
        break;
      // 删除菜单
      case 'delete':
        break;
      default:
        break;
    }
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof MenuManage
   */
  render() {
    const { addMenuVisible } = this.state;
    return (
      <ContentLayout>
        <div className={styles.parent}>
          {/* 菜单 */}
          <div className={styles.menu}>
            <Input
              style={{ marginBottom: 8 }}
              placeholder="搜索菜单"
              addonAfter={this.renderMenuDropdown()}
            />
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={this.onSelect}
              onExpand={this.onExpand}
            >
              <TreeNode icon={<Icon type="setting" />} title="设置" key="0-0">
                <TreeNode title="系统设置" key="0-0-0" isLeaf />
                <TreeNode title="安全设置" key="0-0-1" isLeaf />
              </TreeNode>
              <TreeNode icon={<Icon type="setting" />} title="管理" key="0-1">
                <TreeNode title="用户" key="0-1-0" isLeaf />
                <TreeNode title="菜单" key="0-1-1" isLeaf />
              </TreeNode>
            </DirectoryTree>
          </div>
          {/* 权限 */}
          <div className={styles.permission}>
            <Table dataSource={[]}>
              <Table.Column key="name" title="" dataIndex="name" />
            </Table>
          </div>
        </div>
        {/* 添加菜单 */}
        <AddMenu visible={addMenuVisible} handleCancel={() => this.setAddMenuVisible(false)} />
      </ContentLayout>
    );
  }
}
