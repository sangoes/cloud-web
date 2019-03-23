import React from 'react';
import { Layout, Menu, Avatar, Icon } from 'antd';
import Footer from './Footer';
import styles from './MainLayout.less';
import { HeaderDropdown } from 'ant-design-pro';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

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
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <Menu.Item key="avatar">
          <Avatar
            size="small"
            className={styles.avatar}
            // src={currentUser.avatar}
            alt="avatar"
          />
          <span>赵宇</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="userCenter">
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout>
        <div className={styles.header}>
          <h2 className={styles.title}>叁果科技管理后台</h2>
          <div className={styles.menu}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '48px', backgroundColor: '#2c3d62' }}
            >
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">统计</Menu.Item>
              <Menu.Item key="3">设置</Menu.Item>
            </Menu>
          </div>
          {/* 右边 */}
          <div className={styles.right}>
            <HeaderDropdown overlay={menu}>
              <span className={styles.name}>
                赵宇
                <Icon type="caret-down" />
              </span>
            </HeaderDropdown>
          </div>
        </div>
        <div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '54px' }}
            className={styles.subHeader}
          >
            <Menu.Item key="1">系统设置</Menu.Item>
            <Menu.Item key="2">管理中心</Menu.Item>
            <Menu.Item key="3">权限中心</Menu.Item>
          </Menu>
        </div>
        <Layout>
          <Content>main content</Content>
        </Layout>
        <Footer />
      </Layout>
    );
  }
}
