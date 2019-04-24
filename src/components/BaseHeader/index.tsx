import React from 'react';
import styles from './index.less';
import { Menu, Icon, Avatar } from 'antd';
import Link from 'umi/link';
import { HeaderDropdown } from 'ant-design-pro';

/**
 * @description Props
 * @author jerrychir
 * @interface Props
 */
interface Props {}

interface State {}

/**
 * @description 通用Header
 * @author jerrychir
 * @export
 * @class BaseHeader
 * @extends {React.Component<Props, State>}
 */
export class BaseHeader extends React.Component<Props, State> {
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
      <div>
        <div className={styles.header}>
          <h2 className={styles.title}>尼克魔法管理后台</h2>
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
                    <span>{'权限'}</span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={'/setting'}>
                  <span>
                    <span>{'系统'}</span>
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
              <Link to={'/system/user'}>
                <span>
                  <span>{'用户'}</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={'/system/department'}>
                <span>
                  <span>{'部门'}</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={'/system/permission'}>
                <span>
                  <span>{'权限'}</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={'/system/menu'}>
                <span>
                  <span>{'菜单'}</span>
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}
