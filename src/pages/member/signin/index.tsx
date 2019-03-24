import * as React from 'react';
import styles from './index.less';
import { MemberHeader } from '@/components/MemberHeader';
import { MemberFooter } from '../../../components/MemberFooter/index';
import { Layout } from 'antd';

const { Content } = Layout;

interface Props {}

interface State {}

/**
 * @description 登录页面
 * @author jerrychir
 * @export
 * @class SignInPage
 * @extends {React.Component<Props, State>}
 */
export default class SignInPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof SignInPage
   */
  render() {
    return (
      <div>
        {/* header */}
        <MemberHeader />
        {/* content */}
        <div className={styles.content}>
          {/* 登陆 */}
          <div className={styles.login}>dd</div>
        </div>
        {/* footer */}
        <MemberFooter />
      </div>
    );
  }
}
