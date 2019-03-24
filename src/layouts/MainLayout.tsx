import React from 'react';
import { Layout } from 'antd';
import styles from './MainLayout.less';
import { BaseHeader } from '@/components/BaseHeader';
import { BaseFooter } from '@/components/BaseFooter';

const { Content } = Layout;

interface Props {}

interface State {}

/**
 * @description 基本布局
 * @author jerrychir
 * @export
 * @class BasicLayout
 * @extends {React.Component<Props, State>}
 */
export default class MainLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        {/* header */}
        <BaseHeader />
        {/* 内容 */}
        <Layout>
          <Content className={styles.content}>{this.props.children}</Content>
        </Layout>
        {/* 页脚 */}
        <BaseFooter />
      </Layout>
    );
  }
}
