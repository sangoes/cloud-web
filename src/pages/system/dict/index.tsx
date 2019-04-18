import React, { Fragment } from 'react';
import { Table, Button, Icon, Divider, Popconfirm, Dropdown, Menu } from 'antd';
import { ContentLayout } from '@/components/ContentLayout';
import styles from './index.less';
import AddDict from './add';
import BaseTable from '@/components/BaseTable';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'dva';
import { createAction } from '@/utils';
import { ListDictItem, PageDictItem } from '@/interface/upms/dict';
import { ADD_DICT, PAGE_DICT } from '@/actions/upms/dict';

interface Props {
  dispatch?: any;
  dictPage: PageDictItem;
  pageDictLoading: boolean;
}

interface State {
  addDictVisible?: boolean;
  dictMode?: 'add' | 'check';
  dictItem?: ListDictItem;
}

/**
 * @description 字典管理
 * @author jerrychir
 * @export
 * @class DictManage
 * @extends {React.Component<Props, State>}
 */
@connect(({ dict, loading }) => ({ ...dict, pageDictLoading: loading.effects['dict/dictPage'] }))
export default class DictManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.dispatch(createAction(PAGE_DICT)({}));
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
   * @description 保存字典
   * @private
   * @memberof DictManage
   */

  private saveDict = (fields: any) => {
    this.props.dispatch(createAction(ADD_DICT)({ ...fields }));
  };
  /**
   * @description 查看字典
   * @private
   * @memberof DictManage
   */
  private checkDict = record => {
    this.setState({ dictMode: 'check', dictItem: record });
    this.setDictVisible(true);
  };

  /**
   * @description 添加字典
   * @private
   * @memberof DictManage
   */
  private addDict = () => {
    this.setState({ dictMode: 'add', dictItem: null });
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
    const { addDictVisible, dictItem } = this.state;
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
          <BaseTable columns={this.columns} data={dictPage} loading={pageDictLoading} />
        </div>
        {/* 添加字典 */}
        {addDictVisible && (
          <AddDict
            visible={addDictVisible}
            handleOk={this.saveDict}
            item={dictItem}
            handleCancel={() => this.setDictVisible(false)}
          />
        )}
      </ContentLayout>
    );
  }
}
