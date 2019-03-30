import React, { Fragment } from 'react';
import styles from './index.less';
import { Button, Table, Icon } from 'antd';
import NewDataBase from './new';
import { ContentLayout } from '@/components/ContentLayout';
import { connect } from 'dva';
import { createActions, createAction } from '@/utils';
import { ADD, LIST, PAGE } from '@/actions/connection';
import { ListItem } from '@/interface/connection';
import uuid from 'uuid/v4';
import { ColumnProps } from 'antd/lib/table';
import BaseTable from '@/components/BaseTable';

interface Props {
  dispatch?: any;
  list: ListItem[];
}

interface State {
  newDataBaseVisible?: boolean;
}

const columns: ColumnProps<ListItem>[] = [
  {
    key: 'id',
    title: '数据库链接名',
    dataIndex: 'connectionName',
  },
  {
    key: 'ip',
    title: 'IP',
    dataIndex: 'ip',
  },
  {
    key: 'port',
    title: '端口',
    dataIndex: 'port',
  },
  {
    key: 'dbName',
    title: '数据库名',
    dataIndex: 'dbName',
  },
  {
    key: 'dbUsername',
    title: '用户名',
    dataIndex: 'dbUsername',
  },
  {
    title: '操作',
    render: (text, record) => (
      <Fragment>
        <Icon type="close" onClick={() => {}} />
      </Fragment>
    ),
  },
];
/**
 * @description 数据库管理
 * @author jerrychir
 * @export
 * @class DataBasePage
 * @extends {React.Component<Props, State>}
 */
@connect(({ connection }) => ({ ...connection }))
export default class DataBasePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  /**
   * @description 渲染完成
   * @memberof DataBasePage
   */
  componentDidMount = () => {
    this.props.dispatch(createAction(LIST)({}));
  };

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
   * @description 添加链接确认
   * @private
   * @memberof DataBasePage
   */
  private addDataBaseHandleOk = (fieldsValue: string) => {
    this.props.dispatch(
      createActions(ADD)(fieldsValue)(() => {
        this.setDataBaseVisible(false);
      })
    );
  };

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof DataBasePage
   */
  render() {
    const { newDataBaseVisible } = this.state;
    const { list } = this.props;

    return (
      <ContentLayout>
        <div>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={() => this.setDataBaseVisible(true)}>
              新建数据库链接
            </Button>
          </div>
          {/* 表格 */}
          <BaseTable columns={columns} dataSource={list} pagination={false} />
          {/* 新建数据库 */}
          {newDataBaseVisible && (
            <NewDataBase
              visible={newDataBaseVisible}
              handleCancel={() => this.setDataBaseVisible(false)}
              handleOk={this.addDataBaseHandleOk}
            />
          )}
        </div>
      </ContentLayout>
    );
  }
}
