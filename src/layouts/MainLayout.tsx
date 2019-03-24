import React from 'react';
import { Layout, Menu, Avatar, Icon, Breadcrumb } from 'antd';
import Footer from './Footer';
import styles from './MainLayout.less';
import { HeaderDropdown, FooterToolbar } from 'ant-design-pro';
import Link from 'umi/link';

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
          {/* 一级菜单 */}
          <div className={styles.menu}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '48px', backgroundColor: '#2c3d62' }}
            >
              <Menu.Item key="1">
                <Link to={'/'}>
                  <span>
                    <span>{'首页'}</span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/manage'}>
                  <span>
                    <span>{'管理'}</span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={'/setting'}>
                  <span>
                    <span>{'设置'}</span>
                  </span>
                </Link>
              </Menu.Item>
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
        {/* 二级菜单 */}
        <div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '54px' }}
            className={styles.subHeader}
          >
            <Menu.Item key="1">
              <Link to={'/manage/user'}>
                <span>
                  <span>{'用户'}</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={'/manage/department'}>
                <span>
                  <span>{'部门'}</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={'/manage/permission'}>
                <span>
                  <span>{'权限'}</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={'/manage/menu'}>
                <span>
                  <span>{'菜单'}</span>
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        {/* 内容 */}
        <Layout>
          <Content className={styles.content}>{this.props.children}</Content>
        </Layout>
        {/* <Footer /> */}
        {/* 页脚 */}
        <FooterToolbar
          extra={
            <div className={styles.footer}>
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">管理</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }
        >
          Copyright <Icon type="copyright" /> 2018 叁果科技出品
        </FooterToolbar>
      </Layout>
    );
  }
}
