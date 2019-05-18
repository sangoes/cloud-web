import * as React from 'react';
import styles from './index.less';

const ratio = 1.5;

interface Props {}

interface State {
  contentWidth?: number;
  contentHeight?: number;
}

interface IRefs {
  slideRef?: HTMLDivElement;
}

/**
 * @description 内容
 * @author jerrychir
 * @export
 * @class Content
 * @extends {React.Component<Props, State>}
 */
export class Content extends React.Component<Props, State> {
  refKey: IRefs = {};

  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  componentDidMount(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({ contentHeight: (this.refKey.slideRef.clientWidth * 9) / 16 });
  }
  componentWillMount(): void {}

  private handleResize = e => {
    this.setState({ contentHeight: (this.refKey.slideRef.clientWidth * 9) / 16 });
  };
  render() {
    const { contentHeight } = this.state;
    return (
      <div className={styles.background}>
        <div
          ref={ref => (this.refKey.slideRef = ref)}
          className={styles.content}
          style={{ height: contentHeight }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
