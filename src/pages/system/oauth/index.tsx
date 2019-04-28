import React, { Fragment } from 'react';
import { Button, Divider, Dropdown, Icon, Menu, Modal } from 'antd';
import { ContentLayout } from '@/components/ContentLayout';
import styles from './index.less';
import { ListOauthItem, PageOauthItem } from '@/interface/upms/oauth';
import BaseTable from '@/components/BaseTable';
import {
  ColumnProps,
  PaginationConfig,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/lib/table';
import { connect } from 'dva';
import { createAction, createActions } from '@/utils';
import AddOauth from './add';
import {
  PAGE_OAUTH,
  ADD_OAUTH,
  BATCH_REMOVE_OAUTH,
  REMOVE_OAUTH,
  UPDATE_OAUTH,
} from '@/actions/upms/oauth';

const confirm = Modal.confirm;
const approve = ['是', '否'];

interface Props {
  dispatch?: any;
  oauthPage: PageOauthItem;
  pageOauthLoading: boolean;
}

interface State {
  selectedRows: ListOauthItem[];
  addOauthVisible?: boolean;
  oauthItem?: ListOauthItem;
  oauthStatus?: 'save' | 'check' | 'edit';
}

/**
 * @description 授权表页面
 * @author jerrychir
 * @export
 * @class OauthPage
 * @extends {React.Component<Props, State>}
 */
@connect(({ oauth, loading }) => ({ ...oauth, pageOauthLoading: loading.effects[PAGE_OAUTH] }))
export default class OauthPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  /**
   * @description 渲染完成
   * @private
   * @memberof OauthPage
   */
  componentDidMount = () => {
    // 分页
    this.props.dispatch(createAction(PAGE_OAUTH)({}));
  };

  /**
   * @description 设置授权表Modal是否可见
   * @private
   * @memberof OauthPage
   */
  private setAddOauthVisible = (visible: boolean) => {
    this.setState({
      addOauthVisible: visible,
    });
  };
  /**
   * @description 新建授权表
   * @private
   * @memberof OauthPage
   */
  private newOauth = () => {
    this.setState({ oauthItem: null, oauthStatus: 'save' });
    this.setAddOauthVisible(true);
  };

  /**
   * @description 保存授权表
   * @private
   * @memberof OauthPage
   */
  private saveOauth = (fields: any, status: string) => {
    if (status === 'edit') {
      console.log(fields);

      this.props.dispatch(
        createActions(UPDATE_OAUTH)({ ...fields })(() => {
          // 隐藏
          this.setAddOauthVisible(false);
        })
      );
    } else {
      this.props.dispatch(
        createActions(ADD_OAUTH)({ ...fields })(() => {
          // 隐藏
          this.setAddOauthVisible(false);
        })
      );
    }
  };

  /**
   * @description 表格变化
   * @private
   * @memberof OauthPage
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
    this.props.dispatch(createAction(PAGE_OAUTH)(params));
  };

  /**
   * @description 删除授权表
   * @private
   * @memberof OauthPage
   */
  private deleteOauth = (item: ListOauthItem) => {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除授权表?',
      content: '一旦删除将不可恢复数据',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch(createAction(REMOVE_OAUTH)({ key: item.id }));
      },
      onCancel() {},
    });
  };

  /**
   * @description 批量删除授权表
   * @private
   * @memberof OauthPage
   */
  private batchDeleteOauth = () => {
    const { selectedRows } = this.state;
    const selectedKeys = selectedRows.map((item: ListOauthItem) => {
      return item.id;
    });
    const { dispatch } = this.props;
    const _this = this;
    confirm({
      title: '确定批量删除授权表?',
      content: '一旦删除将不可恢复数据',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch(
          createActions(BATCH_REMOVE_OAUTH)({ keys: selectedKeys })(() => {
            _this.setState({ selectedRows: [] });
          })
        );
      },
      onCancel() {},
    });
  };

  /**
   * @description 查看Oauth
   * @private
   * @memberof OauthPage
   */
  private checkOauth = (record: ListOauthItem) => {
    this.setState({ oauthItem: record, oauthStatus: 'check' });
    this.setAddOauthVisible(true);
  };

  /**
   * @description 编辑Oauth
   * @private
   * @memberof OauthPage
   */
  private editOauth = (record: ListOauthItem) => {
    this.setState({ oauthItem: record, oauthStatus: 'edit' });
    this.setAddOauthVisible(true);
  };

  /**
   * @description 更多按钮
   * @memberof OauthPage
   */
  moreMenu = (item: ListOauthItem) => (
    <Menu onClick={({ key }) => this.handleMoreMenu(key, item)}>
      <Menu.Item key="edit">编辑</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
  );

  /**
   * @description 更多按钮点击
   * @private
   * @memberof OauthPage
   */
  private handleMoreMenu = (key: any, item: ListOauthItem) => {
    switch (key) {
      case 'edit':
        this.editOauth(item);
        break;
      case 'delete':
        this.deleteOauth(item);
        break;

      default:
        break;
    }
  };

  /**
   * @description 授权表列
   * @type {ColumnProps<ListOauthItem>[]}
   * @memberof OauthPage
   */
  columns: ColumnProps<ListOauthItem>[] = [
    {
      key: 'clientId',
      title: '客户端ID',
      dataIndex: 'clientId',
    },
    {
      key: 'clientSecret',
      title: '客户端密钥',
      dataIndex: 'clientSecret',
    },
    {
      key: 'scope',
      title: '授权域',
      dataIndex: 'scope',
    },
    {
      key: 'authorizedGrantTypes',
      title: '授权模式',
      dataIndex: 'authorizedGrantTypes',
    },
    {
      key: 'resourceIds',
      title: '资源ID',
      dataIndex: 'resourceIds',
    },
    {
      key: 'webServerRedirectUri',
      title: '回调地址',
      dataIndex: 'webServerRedirectUri',
    },
    {
      key: 'authorities',
      title: '权限',
      dataIndex: 'authorities',
    },
    {
      key: 'accessTokenValidity',
      title: '失效时间',
      dataIndex: 'accessTokenValidity',
    },
    {
      key: 'refreshTokenValidity',
      title: '刷新时间',
      dataIndex: 'refreshTokenValidity',
    },
    {
      key: 'additionalInformation',
      title: '扩展信息',
      dataIndex: 'additionalInformation',
    },
    {
      key: 'autoapprove',
      title: '是否自动放行',
      dataIndex: 'autoapprove',
      render(val) {
        return <div>{approve[val]}</div>;
      },
    },
    {
      key: 'des',
      title: '备注',
      dataIndex: 'des',
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.checkOauth(record)}>查看</a>
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
   * @memberof OauthPage
   */
  render() {
    const { selectedRows, addOauthVisible, oauthItem, oauthStatus } = this.state;
    const { oauthPage, pageOauthLoading } = this.props;
    return (
      <ContentLayout>
        <div>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={this.newOauth}>
              新建授权表
            </Button>
            {selectedRows.length > 0 && <Button onClick={this.batchDeleteOauth}>批量删除</Button>}
          </div>
          {/* 表格 */}
          <BaseTable
            columns={this.columns}
            data={oauthPage}
            loading={pageOauthLoading}
            onChange={this.handleTableChange}
            onSelectRow={selectedRows => this.setState({ selectedRows })}
          />
        </div>
        {/** 添加授权表 **/}
        <AddOauth
          visible={addOauthVisible}
          handleOk={this.saveOauth}
          item={oauthItem}
          status={oauthStatus}
          handleCancel={() => this.setAddOauthVisible(false)}
        />
      </ContentLayout>
    );
  }
}
