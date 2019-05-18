import * as React from 'react';
import styles from './index.less';

const ratio = 0.2;

interface Props {}

interface State {
  contentWidth?: number;
}

/**
 * @description 备注栏
 * @author jerrychir
 * @export
 * @class RemarkBar
 * @extends {React.Component<Props, State>}
 */
export class RemarkBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      contentWidth: window.innerWidth * ratio,
    };
  }
  /**
   * @description 渲染完成
   * @author jerrychir
   * @memberof RemarkBar
   */
  componentDidMount(): void {}
  /**
   * @description 调整大小
   * @private
   * @memberof RemarkBar
   */

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof RemarkBar
   */
  render() {
    return (
      <div className={styles.content} style={{ width: this.state.contentWidth }}>
        备注:
      </div>
    );
  }
}
