import React from 'react';
import styles from './index.less';
import MainLayout from './MainLayout';
import router from 'umi/router';
import { MemberLayout } from './MemberLayout';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  const { location } = props;
  const currentPath = location.pathname;

  // 注册 登录
  if (currentPath.startsWith('/member')) {
    return <MemberLayout>{props.children}</MemberLayout>;
  }
  // 注册 登录
  if (currentPath.startsWith('/slides')) {
    return <div>{props.children}</div>;
  }
  return <MainLayout>{props.children}</MainLayout>;
};

export default BasicLayout;
