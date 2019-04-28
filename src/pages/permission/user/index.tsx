import React, { Fragment } from 'react';
import { Button, Divider, Dropdown, Icon, Menu, Modal } from 'antd';
import { ContentLayout } from '@/components/ContentLayout';
import styles from './index.less';
import { ListUserItem, PageUserItem } from '@/interface/permission/user';
import BaseTable from '@/components/BaseTable';
import {
  ColumnProps,
  PaginationConfig,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/lib/table';
import { connect } from 'dva';
import { createAction, createActions } from '@/utils';
import {
  PAGE_USER,
  ADD_USER,
  BATCH_REMOVE_USER,
  REMOVE_USER,
  UPDATE_USER,
} from '@/actions/permission/user';
import AddUser from './add';

const confirm = Modal.confirm;

interface Props {
  dispatch?: any;
  userPage: PageUserItem;
  pageUserLoading: boolean;
  addUserLoading: boolean;
  editUserLoading: boolean;
}

interface State {
  selectedRows: ListUserItem[];
  addUserVisible?: boolean;
  userItem?: ListUserItem;
  userStatus?: 'save' | 'check' | 'edit';
}

/**
 * @description 用户表页面
 * @author jerrychir
 * @export
 * @class UserPage
 * @extends {React.Component<Props, State>}
 */
@connect(({ user, loading }) => ({
  ...user,
  pageUserLoading: loading.effects[PAGE_USER],
  addUserLoading: loading.effects[ADD_USER],
  editUserLoading: loading.effects[UPDATE_USER],
}))
export default class UserPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  /**
   * @description 渲染完成
   * @private
   * @memberof UserPage
   */
  componentDidMount = () => {
    // 分页
    this.props.dispatch(createAction(PAGE_USER)({}));
  };

  /**
   * @description 设置添加用户表Modal是否可见
   * @private
   * @memberof UserPage
   */
  private setAddUserVisible = (visible: boolean) => {
    this.setState({
      addUserVisible: visible,
    });
  };

  /**
   * @description 保存用户表
   * @private
   * @memberof UserPage
   */
  private saveUser = (fields: any, status: string) => {
    if (status === 'edit') {
      this.props.dispatch(
        createActions(UPDATE_USER)({ ...fields })(() => {
          // 隐藏
          this.setAddUserVisible(false);
        })
      );
    } else {
      this.props.dispatch(
        createActions(ADD_USER)({ ...fields })(() => {
          // 隐藏
          this.setAddUserVisible(false);
        })
      );
    }
  };

  /**
   * @description 表格变化
   * @private
   * @memberof UserPage
   */
  private handleTableChange = (
    pagination: PaginationConfig,
    filters: Record<string | number | symbol, string[]>,
    sorter: SorterResult<any>,
    extra: TableCurrentDataSource<any>
  ) => {
    // 参数
    const params = { ...pagination };
    // 分页
    this.props.dispatch(createAction(PAGE_USER)(params));
  };

  /**
   * @description 删除用户表
   * @private
   * @memberof UserPage
   */
  private deleteUser = (item: ListUserItem) => {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除用户表?',
      content: '一旦删除将不可恢复数据',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch(createAction(REMOVE_USER)({ key: item.id }));
      },
      onCancel() {},
    });
  };

  /**
   * @description 批量删除用户表
   * @private
   * @memberof UserPage
   */
  private batchDeleteUser = () => {
    const { selectedRows } = this.state;
    const selectedKeys = selectedRows.map((item: ListUserItem) => {
      return item.id;
    });
    const { dispatch } = this.props;
    const _this = this;
    confirm({
      title: '确定批量删除用户表?',
      content: '一旦删除将不可恢复数据',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch(
          createActions(BATCH_REMOVE_USER)({ keys: selectedKeys })(() => {
            _this.setState({ selectedRows: [] });
          })
        );
      },
      onCancel() {},
    });
  };

  /**
   * @description 查看User
   * @private
   * @memberof UserPage
   */
  private checkUser = (record: ListUserItem) => {
    this.setState({ userItem: record, userStatus: 'check' });
    this.setAddUserVisible(true);
  };

  /**
   * @description 编辑User
   * @private
   * @memberof UserPage
   */
  private editUser = (record: ListUserItem) => {
    this.setState({ userItem: record, userStatus: 'edit' });
    this.setAddUserVisible(true);
  };

  /**
   * @description 更多按钮
   * @memberof UserPage
   */
  moreMenu = (item: ListUserItem) => (
    <Menu onClick={({ key }) => this.handleMoreMenu(key, item)}>
      <Menu.Item key="edit">编辑</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
  );

  /**
   * @description 更多按钮点击
   * @private
   * @memberof UserPage
   */
  private handleMoreMenu = (key: any, item: ListUserItem) => {
    switch (key) {
      case 'edit':
        this.editUser(item);
        break;
      case 'delete':
        this.deleteUser(item);
        break;

      default:
        break;
    }
  };

  /**
   * @description 用户表列
   * @type {ColumnProps<ListUserItem>[]}
   * @memberof UserPage
   */
  columns: ColumnProps<ListUserItem>[] = [
    {
      key: 'realName',
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      key: 'username',
      title: '用户名',
      dataIndex: 'username',
    },
    {
      key: 'mobile',
      title: '手机号',
      dataIndex: 'mobile',
    },

    {
      key: 'gender',
      title: '性别',
      dataIndex: 'gender',
    },

    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.checkUser(record)}>查看</a>
          <Divider type="vertical" />
          <Dropdown overlay={() => this.moreMenu(record)}>
            <a>
              更多 <Icon type="down" />
            </a>
          </Dropdown>
        </Fragment>
      ),
    },
  ];

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof UserPage
   */
  render() {
    const { selectedRows, addUserVisible, userItem, userStatus } = this.state;
    const { userPage, pageUserLoading, addUserLoading, editUserLoading } = this.props;
    return (
      <ContentLayout>
        <div>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={() => this.setAddUserVisible(true)}>
              新建用户表
            </Button>
            {selectedRows.length > 0 && <Button onClick={this.batchDeleteUser}>批量删除</Button>}
          </div>
          {/* 表格 */}
          <BaseTable
            columns={this.columns}
            data={userPage}
            loading={pageUserLoading}
            onChange={this.handleTableChange}
            onSelectRow={selectedRows => this.setState({ selectedRows })}
          />
        </div>
        {/** 添加用户表 **/}
        <AddUser
          visible={addUserVisible}
          item={userItem}
          status={userStatus}
          confirmLoading={addUserLoading || editUserLoading}
          handleOk={this.saveUser}
          handleCancel={() => this.setAddUserVisible(false)}
        />
      </ContentLayout>
    );
  }
}
