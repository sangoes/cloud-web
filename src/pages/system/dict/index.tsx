import React, { Fragment } from 'react';
import { Table, Button, Icon } from 'antd';
import { ContentLayout } from '@/components/ContentLayout';
import styles from './index.less';
import AddDict from './add';
import BaseTable from '@/components/BaseTable';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'dva';
import { createAction } from '@/utils';
import { ADD } from '@/actions/upms/dict';

interface Props {
  dispatch?: any;
}

interface State {
  addDictVisible?: boolean;
}

const columns = [
  {
    key: 'dictName',
    title: '字典名称',
    dataIndex: 'dictName',
  },
  {
    key: 'dictType',
    title: '字典类型',
    dataIndex: 'dictType',
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
 * @description 字典管理
 * @author jerrychir
 * @export
 * @class DictManage
 * @extends {React.Component<Props, State>}
 */
@connect(({ dict }) => ({ ...dict }))
export default class DictManage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};

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
    this.props.dispatch(createAction(ADD)({ ...fields }));
  };

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof DictManage
   */
  render() {
    const { addDictVisible } = this.state;
    return (
      <ContentLayout>
        <div>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={() => this.setDictVisible(true)}>
              新建字典
            </Button>
          </div>
          {/* 表格 */}
          <BaseTable columns={columns} dataSource={[]} />
        </div>
        {/* 添加字典 */}
        <AddDict
          visible={addDictVisible}
          handleOk={this.saveDict}
          handleCancel={() => this.setDictVisible(false)}
        />
      </ContentLayout>
    );
  }
}
