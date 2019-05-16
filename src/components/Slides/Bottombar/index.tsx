import * as React from 'react';
import styles from './index.less';

interface Props {}

interface State {}

/**
 * @description 底部工具栏
 * @author jerrychir
 * @export
 * @class BottomBar
 * @extends {React.Component<Props, State>}
 */
export class BottomBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.background}>
        <div className={styles.text}>1/30</div>
      </div>
    );
  }
}
