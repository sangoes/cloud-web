import React from 'react';
import { Table } from 'antd';
import { TableProps, PaginationConfig } from 'antd/lib/table';
import styles from './index.less';
import { PageDictItem } from '@/interface/upms/dict';

interface Props extends TableProps<any> {
  data?: any;
  onSelectRow?: any;
}

interface State {
  selectedRowKeys?: [];
}
/**
 * @description 自定义表格
 * @author jerrychir
 * @export
 * @class BaseTable
 * @extends {React.Component<Props, State>}
 */
export default class BaseTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 复选
   * @private
   * @memberof BaseTable
   */
  private handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys });
  };

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof BaseTable
   */
  render() {
    const { selectedRowKeys } = this.state;
    const { data } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: data.current,
      total: data.total,
    };
    return (
      <div className={styles.table}>
        <Table
          rowKey="id"
          size="middle"
          dataSource={data.records}
          {...this.props}
          pagination={paginationProps}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}
