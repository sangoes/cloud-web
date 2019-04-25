import React, { Fragment } from 'react';
import { Button, Icon, Divider, Dropdown, Menu, Modal } from 'antd';
import { ContentLayout } from '@/components/ContentLayout';
import styles from './index.less';
import BaseTable from '@/components/BaseTable';
import {
  ColumnProps,
  PaginationConfig,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/lib/table';
import { connect } from 'dva';
import { createActions, createAction } from '@/utils';
import { ListDictItem, PageDictItem } from '@/interface/upms/dict';
import { ADD_DICT, PAGE_DICT, BATCH_REMOVE_DICT } from '@/actions/upms/dict';
import AddDict from './add';
import AddSubDict from './check';
import { REMOVE_DICT } from '../../../actions/upms/dict';

const confirm = Modal.confirm;
interface Props {
  dispatch?: any;
  dictPage: PageDictItem;
  pageDictLoading: boolean;
}

interface State {
  addDictVisible?: boolean;
  addSubDictVisible?: boolean;
  dictItem?: ListDictItem;
  selectedRows: ListDictItem[];
}

/**
 * @description 字典管理
 * @author jerrychir
 * @export
 * @class DictManage
 * @extends {React.Component<Props, State>}
 */
@connect(({ dict, loading }) => ({ ...dict, pageDictLoading: loading.effects[PAGE_DICT] }))
export default class DictManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }
  componentDidMount = () => {
    // 分页
    this.props.dispatch(createAction(PAGE_DICT)({}));
  };

  /**
   * @description 表格变化
   * @private
   * @memberof DictManage
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
    this.props.dispatch(createAction(PAGE_DICT)(params));
  };

  /**
   * @description 设置生产代码Modal看见与否
   * @private
   * @memberof DictManage
   */
  private setDictVisible = (visible: boolean) => {
    this.setState({
      addDictVisible: visible,
    });
  };

  /**
   * @description 设置
   * @private
   * @memberof DictManage
   */
  private setSubDictVisible = (visible: boolean) => {
    this.setState({
      addSubDictVisible: visible,
    });
  };

  /**
   * @description 保存字典
   * @private
   * @memberof DictManage
   */
  private saveDict = (fields: any) => {
    this.props.dispatch(
      createActions(ADD_DICT)({ ...fields })(() => {
        // 隐藏
        this.setDictVisible(false);
      })
    );
  };

  /**
   * @description 删除字典
   * @private
   * @memberof DictManage
   */
  private deleteDict = (value: string) => {
    const { dispatch } = this.props;
    const { dictItem } = this.state;
    confirm({
      title: '确定删除字典?',
      content: '一旦删除将不可恢复数据',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch(createAction(REMOVE_DICT)({ key: value, pkey: dictItem && dictItem.id }));
      },
      onCancel() {},
    });
  };

  /**
   * @description 批量删除
   * @private
   * @memberof DictManage
   */
  private batchDeleteDict = () => {
    const { selectedRows } = this.state;
    const selectedKeys = selectedRows.map((item: ListDictItem) => {
      return item.id;
    });
    const { dispatch } = this.props;
    const _this = this;
    confirm({
      title: '确定批量删除字典?',
      content: '一旦删除将不可恢复数据',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch(
          createActions(BATCH_REMOVE_DICT)({ keys: selectedKeys })(() => {
            _this.setState({ selectedRows: [] });
          })
        );
      },
      onCancel() {},
    });
  };

  /**
   * @description 查看字典
   * @private
   * @memberof DictManage
   */
  private checkDict = (record: ListDictItem) => {
    // 赋值
    this.setState({ dictItem: record });
    // 显示
    this.setSubDictVisible(true);
  };

  /**
   * @description 添加字典
   * @private
   * @memberof DictManage
   */
  private addDict = () => {
    this.setDictVisible(true);
  };

  /**
   * @description 更多按钮点击
   * @private
   * @memberof DictManage
   */
  private handleMoreMenu = (key: any, item: ListDictItem) => {
    switch (key) {
      case 'delete':
        this.deleteDict(item.id);
        break;

      default:
        break;
    }
  };
  /**
   * @description 更多按钮
   * @memberof DictManage
   */
  moreMenu = (item: ListDictItem) => (
    <Menu onClick={({ key }) => this.handleMoreMenu(key, item)}>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
  );

  /**
   * @description 字典列
   * @type {ColumnProps<ListDictItem>[]}
   * @memberof DictManage
   */
  columns: ColumnProps<ListDictItem>[] = [
    {
      key: 'dictValue',
      title: '字典名称',
      dataIndex: 'dictValue',
      sorter: true,
    },
    {
      key: 'dictKey',
      title: '字典值',
      dataIndex: 'dictKey',
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.checkDict(record)}>查看</a>
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
   * @memberof DictManage
   */
  render() {
    const { addDictVisible, addSubDictVisible, dictItem, selectedRows } = this.state;
    const { dictPage, pageDictLoading } = this.props;
    return (
      <ContentLayout>
        <div>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={this.addDict}>
              新建字典
            </Button>
            {selectedRows.length > 0 && <Button onClick={this.batchDeleteDict}>批量删除</Button>}
          </div>
          {/* 表格 */}
          <BaseTable
            columns={this.columns}
            data={dictPage}
            loading={pageDictLoading}
            onChange={this.handleTableChange}
            onSelectRow={selectedRows => this.setState({ selectedRows })}
          />
        </div>
        {/* 添加字典 */}
        <AddDict
          visible={addDictVisible}
          handleOk={this.saveDict}
          handleCancel={() => this.setDictVisible(false)}
        />
        {/* 查看字典 */}
        {addSubDictVisible && (
          <AddSubDict
            visible={addSubDictVisible}
            item={dictItem}
            remove={this.deleteDict}
            handleCancel={() => this.setSubDictVisible(false)}
          />
        )}
      </ContentLayout>
    );
  }
}
