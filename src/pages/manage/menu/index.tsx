import React from 'react';
import { ContentLayout } from '@/components/ContentLayout';
import { Tree, Input, Icon, Table, Pagination } from 'antd';
import styles from './index.less';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const Search = Input.Search;

interface Props {}

interface State {}

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
  render() {
    return (
      <ContentLayout>
        <div className={styles.parent}>
          {/* 菜单 */}
          <div className={styles.menu}>
            <Input
              style={{ marginBottom: 8 }}
              placeholder="Search"
              addonAfter={<Icon type="plus" />}
            />
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={this.onSelect}
              onExpand={this.onExpand}
            >
              <TreeNode title="设置" key="0-0">
                <TreeNode title="系统设置" key="0-0-0" isLeaf />
                <TreeNode title="安全设置" key="0-0-1" isLeaf />
              </TreeNode>
              <TreeNode title="管理" key="0-1">
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
      </ContentLayout>
    );
  }
}
