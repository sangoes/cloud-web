import React from 'react';
import { FooterToolbar } from 'ant-design-pro';
import { Breadcrumb, Icon } from 'antd';
import styles from './index.less';

interface Props {}

interface State {}

/**
 * @description 通用footer
 * @author jerrychir
 * @export
 * @class BaseFooter
 * @extends {React.Component<Props, State>}
 */
export class BaseFooter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
    );
  }
}
