import * as React from 'react';
import styles from './index.less';
import { MemberHeader } from '@/components/MemberHeader';
import { MemberFooter } from '../../../components/MemberFooter/index';
import { Form, Input, Icon, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends FormComponentProps {}

interface State {
  signinType?: 'password' | 'mobile' | 'qrCode' | 'forget';
}

/**
 * @description 登录页面
 * @author jerrychir
 * @export
 * @class SignInPage
 * @extends {React.Component<Props, State>}
 */

class SignInPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      signinType: 'password',
    };
  }
  /**
   * @description 手机登录点击
   * @author jerrychir
   * @returns {(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void}
   * @memberof SignInPage
   */
  mobileSignInClick = () => {
    this.setState({ signinType: 'mobile' });
  };
  /**
   * @description 密码登录点击
   * @memberof SignInPage
   */
  passwordSignInClick = () => {
    this.setState({ signinType: 'password' });
  };
  /**
   * @description 密码登录点击
   * @memberof SignInPage
   */
  qrCodeSignInClick = () => {
    this.setState({ signinType: 'qrCode' });
  };
  /**
   * @description 密码模式
   * @private
   * @memberof SignInPage
   */
  private passwordType = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* 标题 */}
        <h2>密码登录</h2>
        {/* 登陆 */}
        <Form className={styles.form}>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                className={styles.input}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                className={styles.input}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please input your Captcha!' }],
            })(
              <Row>
                <Col span={16}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                  })(
                    <Input
                      className={styles.input}
                      prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="验证码"
                    />
                  )}
                </Col>
                <Col span={8}>
                  <Button className={styles.button}>发送验证码</Button>
                </Col>
              </Row>
            )}
          </Form.Item>
          {/* 登录按钮 */}
          <Button type="primary" htmlType="submit" size="large" block className="login-form-button">
            登录
          </Button>
        </Form>
        {/* 其他 */}
        <div className={styles.other}>
          <a className={styles.margin} onClick={this.mobileSignInClick}>
            手机登录
          </a>
          <a className={styles.margin} onClick={this.qrCodeSignInClick}>
            扫码登录
          </a>
          <a className={styles.margin}>忘记密码</a>
        </div>
      </div>
    );
  };
  /**
   * @description 手机模式
   * @private
   * @memberof SignInPage
   */
  private mobileType = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* 标题 */}
        <h2>手机登录</h2>
        {/* 登陆 */}
        <Form className={styles.form}>
          <Form.Item>
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: '手机号码' }],
            })(
              <Input
                className={styles.input}
                prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="手机号码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Row>
                <Col span={16}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                  })(
                    <Input
                      className={styles.input}
                      prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="验证码"
                    />
                  )}
                </Col>
                <Col span={8}>
                  <Button className={styles.button}>发送验证码</Button>
                </Col>
              </Row>
            )}
          </Form.Item>
          {/* 登录按钮 */}
          <Button type="primary" htmlType="submit" size="large" block>
            登录
          </Button>
        </Form>
        {/* 其他 */}
        <div className={styles.other}>
          <a className={styles.margin} onClick={this.passwordSignInClick}>
            密码登录
          </a>
          <a className={styles.margin} onClick={this.qrCodeSignInClick}>
            扫码登录
          </a>
          <a className={styles.margin}>忘记密码</a>
        </div>
      </div>
    );
  };
  /**
   * @description 二维码模式
   * @private
   * @memberof SignInPage
   */
  private qrCodeType = () => {
    return (
      <div>
        {/* 标题 */}
        <h2> 二维码登录</h2>
        <div className={styles.qrCode} />
        {/* 其他 */}
        <div className={styles.other}>
          <a className={styles.margin} onClick={this.passwordSignInClick}>
            密码登录
          </a>
          <a className={styles.margin} onClick={this.mobileSignInClick}>
            手机登录
          </a>
          <a className={styles.margin}>忘记密码</a>
        </div>
      </div>
    );
  };
  /**
   * @description 登录模块
   * @private
   * @memberof SignInPage
   */
  private signinModule = type => {
    switch (type) {
      case 'password':
        return this.passwordType();

      case 'mobile':
        return this.mobileType();

      case 'qrCode':
        return this.qrCodeType();

      default:
        break;
    }
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof SignInPage
   */
  render() {
    const { signinType } = this.state;

    return (
      <div>
        {/* header */}
        <MemberHeader />
        {/* content */}
        <div className={styles.content}>
          {/* 登陆 */}
          <div className={styles.login}>
            {/* 判断登录方式 */}
            {this.signinModule(signinType)}
          </div>
        </div>
        {/* footer */}
        <MemberFooter />
      </div>
    );
  }
}

export default Form.create<Props>()(SignInPage);
