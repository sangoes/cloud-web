import React from 'react';
import styles from './index.less';
import MainLayout from './MainLayout';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return <MainLayout>{props.children}</MainLayout>;
};

export default BasicLayout;
