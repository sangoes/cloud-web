import React from 'react';
import styles from './index.less';
import { Button, Table, Icon } from 'antd';
import NewCodeGen from './new';
import { ContentLayout } from '@/components/ContentLayout';

interface Props {}

interface State {
  newCodeGenVisible?: boolean;
}

/**
 * @description 代码生产界面
 * @author jerrychir
 * @export
 * @class CodeGenPage
 * @extends {React.Component<Props, State>}
 */
export default class CodeGenPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 设置生产代码Modal看见与否
   * @private
   * @memberof CodeGenPage
   */
  private setCodeGenVisible = (visible: boolean) => {
    this.setState({
      newCodeGenVisible: visible,
    });
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof CodeGenPage
   */
  render() {
    const { newCodeGenVisible } = this.state;

    return (
      <ContentLayout>
        <div>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={() => this.setCodeGenVisible(true)}>
              新建生成配置
            </Button>
          </div>
          {/* 表格 */}
          <div>
            <Table dataSource={[]}>
              <Table.Column key="name" title="" dataIndex="name" />
            </Table>
          </div>
          {/* 新建代码 */}
          {newCodeGenVisible && (
            <NewCodeGen
              visible={newCodeGenVisible}
              handleCancel={() => this.setCodeGenVisible(false)}
            />
          )}
        </div>
      </ContentLayout>
    );
  }
}
