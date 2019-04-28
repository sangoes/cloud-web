import React from 'react';
import { Form, Input, Modal, Row, Col, TreeSelect, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from '../index.less';
import { connect } from 'dva';
import { createAction } from '@/utils';
import { GRANT_TYPE } from '@/actions/upms/oauth';
import { TreeDict } from '@/interface/upms/dict';
import { ListOauthItem } from '@/interface/upms/oauth';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  dispatch?: any;
  visible?: boolean;
  item?: ListOauthItem;
  confirmLoading?: boolean;
  status?: 'save' | 'check' | 'edit';
  handleOk?: (value: string, status: string) => any;
  handleCancel?: () => void;
  grantType?: TreeDict[];
}

interface State {}

/**
 * @description 添加授权表
 * @author jerrychir
 * @export
 * @class AddOauth
 * @extends {React.Component<Props, State>}
 */
@connect(({ oauth }) => ({ ...oauth }))
class AddOauth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static defaultProps: Partial<Props> = {};

  /**
   * @description 渲染完成
   * @memberof AddOauth
   */
  componentDidMount = () => {
    this.props.dispatch(createAction(GRANT_TYPE)('grantType'));
  };

  /**
   * @description 确认
   * @private
   * @memberof AddOauth
   */
  private handleOk = () => {
    const { form, handleOk, status, item } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      item && (fieldsValue.id = item.id);
      fieldsValue.authorizedGrantTypes = fieldsValue.authorizedGrantTypes.join(',');
      handleOk(fieldsValue, status);
    });
  };

  /**
   * @description 渲染选择项
   * @private
   * @memberof AddOauth
   */
  private renderRadioGroup = (disabled: boolean) => {
    return (
      <Radio.Group disabled={disabled}>
        <Radio value="0">是</Radio>
        <Radio value="1">否</Radio>
      </Radio.Group>
    );
  };

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof AddOauth
   */
  render() {
    const { visible, handleCancel, form, grantType, item, status, confirmLoading } = this.props;
    const treeData = grantType && grantType.length > 0 && grantType[0].children;
    const disabled = status === 'check' ? true : false;
    const title =
      (status === 'save' && '添加授权表') ||
      (status === 'edit' && '编辑授权表') ||
      (status === 'check' && '查看授权表');
    return (
      <Modal
        title={title}
        visible={visible}
        destroyOnClose
        onOk={this.handleOk}
        onCancel={handleCancel}
        width="800px"
        okButtonProps={{ disabled: disabled }}
        confirmLoading={confirmLoading}
      >
        <Row gutter={24}>
          <div className={styles.formList}>
            {/** 客户端ID **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="客户端">
                {form.getFieldDecorator('clientId', {
                  initialValue: item && item.clientId,
                  rules: [{ required: true, message: '客户端不能为空' }],
                })(<Input placeholder="客户端" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 客户端密钥 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密钥">
                {form.getFieldDecorator('clientSecret', {
                  initialValue: item && item.clientSecret,
                  rules: [{ required: true, message: '密钥不能为空' }],
                })(<Input placeholder="密钥" disabled={disabled} />)}
              </FormItem>
            </Col>

            {/** 授权域 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权域">
                {form.getFieldDecorator('scope', {
                  initialValue: item && item.scope,
                  rules: [{ required: true, message: '授权域不能为空' }],
                })(<Input placeholder="授权域" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 授权模式 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权模式">
                {form.getFieldDecorator('authorizedGrantTypes', {
                  initialValue: item && item.authorizedGrantTypes.split(','),
                  rules: [{ required: true, message: '授权模式不能为空' }],
                })(
                  <TreeSelect
                    style={{ width: 226 }}
                    // value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    placeholder="授权模式"
                    allowClear
                    multiple
                    treeDefaultExpandAll
                    // onChange={this.onChange}
                    disabled={disabled}
                  />
                )}
              </FormItem>
            </Col>
            {/** 资源ID **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="资源ID">
                {form.getFieldDecorator('resourceIds', {
                  initialValue: item && item.resourceIds,
                  rules: [],
                })(<Input placeholder="资源ID" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 回调地址 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="回调地址">
                {form.getFieldDecorator('webServerRedirectUri', {
                  initialValue: item && item.webServerRedirectUri,
                  rules: [],
                })(<Input placeholder="回调地址" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 权限 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限">
                {form.getFieldDecorator('authorities', {
                  initialValue: item && item.authorities,
                  rules: [],
                })(<Input placeholder="权限" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 失效时间 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="失效时间">
                {form.getFieldDecorator('accessTokenValidity', {
                  initialValue: item && item.accessTokenValidity,
                  rules: [],
                })(<Input placeholder="失效时间默认12小时" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 刷新时间 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="刷新时间">
                {form.getFieldDecorator('refreshTokenValidity', {
                  initialValue: item && item.refreshTokenValidity,
                  rules: [],
                })(<Input placeholder="刷新时间默认7天" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 扩展信息 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="扩展信息">
                {form.getFieldDecorator('additionalInformation', {
                  initialValue: item && item.additionalInformation,
                  rules: [],
                })(<Input placeholder="扩展信息" disabled={disabled} />)}
              </FormItem>
            </Col>
            {/** 是否自动放行 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="自动放行">
                {form.getFieldDecorator('autoapprove', {
                  initialValue: (item && item.autoapprove) || '0',
                  rules: [],
                })(this.renderRadioGroup(disabled))}
              </FormItem>
            </Col>
            {/** 备注 **/}
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
                {form.getFieldDecorator('des', {
                  initialValue: item && item.des,
                  rules: [],
                })(<Input placeholder="备注" disabled={disabled} />)}
              </FormItem>
            </Col>
          </div>
        </Row>
      </Modal>
    );
  }
  d;
}

export default Form.create<Props>()(AddOauth);
