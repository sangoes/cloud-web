import React, { Fragment } from 'react';
import { Button, Icon, Divider, Dropdown, Menu } from 'antd';
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
import { ListDictItem, PageDictItem, TreeDict } from '@/interface/upms/dict';
import { ADD_DICT, PAGE_DICT, TREE_DICT, UPDATE_DICT } from '@/actions/upms/dict';
import AddDict from './add';
import AddSubDict from './check';
interface Props {
  dispatch?: any;
  dictPage: PageDictItem;
  pageDictLoading: boolean;
}

interface State {
  addDictVisible?: boolean;
  addSubDictVisible?: boolean;
  dictItem?: ListDictItem;
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
    this.state = {};
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
   * @description 保存子字典
   * @private
   * @memberof DictManage
   */
  private saveSubDict = (fields: any, mode: string) => {
    switch (mode) {
      // 保存
      case 'save':
        console.log(fields);

        this.props.dispatch(createAction(TREE_DICT)({ ...fields }));
        break;
      // 更新
      case 'update':
        console.log(fields);
        this.props.dispatch(createAction(UPDATE_DICT)({ ...fields }));
        break;
      default:
        break;
    }
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
   * @description 字典列
   * @type {ColumnProps<ListDictItem>[]}
   * @memberof DictManage
   */
  columns: ColumnProps<ListDictItem>[] = [
    {
      key: 'dictValue',
      title: '字典名称',
      dataIndex: 'dictValue',
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
        <span>
          <a onClick={() => this.checkDict(record)}>查看</a>
          <Divider type="vertical" />
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => {}}>
                <Menu.Item key="edit">编辑</Menu.Item>
                <Menu.Item key="delete">删除</Menu.Item>
              </Menu>
            }
          >
            <a>
              更多 <Icon type="down" />
            </a>
          </Dropdown>
        </span>
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
    const { addDictVisible, addSubDictVisible, dictItem } = this.state;
    const { dictPage, pageDictLoading } = this.props;
    return (
      <ContentLayout>
        <div>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={() => this.addDict()}>
              新建字典
            </Button>
          </div>
          {/* 表格 */}
          <BaseTable
            columns={this.columns}
            data={dictPage}
            loading={pageDictLoading}
            onChange={this.handleTableChange}
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
            handleOk={this.saveSubDict}
            item={dictItem}
            handleCancel={() => this.setSubDictVisible(false)}
          />
        )}
      </ContentLayout>
    );
  }
}
