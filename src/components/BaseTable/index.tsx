import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import styles from './index.less';

interface Props extends TableProps<any> {}

interface State {}

export default class BaseTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.table}>
        <Table rowKey="id" {...this.props} />
      </div>
    );
  }
}
