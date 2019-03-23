import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';

const { Footer } = Layout;

interface Props {}

interface State {}

/**
 * @description
 * @author jerrychir
 * @export
 * @class FooterPage
 * @extends {React.Component<Props, State>}
 */
export default class FooterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Footer style={{ padding: 0 }}>
          <GlobalFooter
            copyright={
              <Fragment>
                Copyright <Icon type="copyright" /> 2018 叁果科技出品
              </Fragment>
            }
          />
        </Footer>
      </div>
    );
  }
}
