import React from 'react';
import styles from './index.less';
import { Button, Table, Icon } from 'antd';
import NewDataBase from './new';
import { ContentLayout } from '@/components/ContentLayout';

interface Props {}

interface State {
  newDataBaseVisible?: boolean;
}

/**
 * @description 数据库管理
 * @author jerrychir
 * @export
 * @class DataBasePage
 * @extends {React.Component<Props, State>}
 */
export default class DataBasePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 设置生产代码Modal看见与否
   * @private
   * @memberof DataBasePage
   */
  private setDataBaseVisible = (visible: boolean) => {
    this.setState({
      newDataBaseVisible: visible,
    });
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof DataBasePage
   */
  render() {
    const { newDataBaseVisible } = this.state;

    return (
      <ContentLayout>
        <div>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={() => this.setDataBaseVisible(true)}>
              新建数据库链接
            </Button>
          </div>
          {/* 表格 */}
          <div>
            <Table dataSource={[]}>
              <Table.Column key="name" title="" dataIndex="name" />
            </Table>
          </div>
          {/* 新建数据库 */}
          {newDataBaseVisible && (
            <NewDataBase
              visible={newDataBaseVisible}
              handleCancel={() => this.setDataBaseVisible(false)}
            />
          )}
        </div>
      </ContentLayout>
    );
  }
}
