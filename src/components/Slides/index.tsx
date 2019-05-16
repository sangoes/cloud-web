import * as React from 'react';
import styles from './index.less';
import { ToolBar } from './Toolbar';
import { Content } from './Content';
import { BottomBar } from './Bottombar';
import { SiderBar } from './Sidebar';

interface Props {}

interface State {}

/**
 * @description 幻灯片
 * @author jerrychir
 * @export
 * @class Slide
 * @extends {React.Component<Props, State>}
 */
export class Slide extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.background}>
        <ToolBar />
        <div className={styles.layout}>
          <SiderBar />
          <Content />
          <div style={{ width: '16rem', backgroundColor: '#f32' }}>dsfdsaf</div>
        </div>
        <BottomBar />
      </div>
    );
  }
}
