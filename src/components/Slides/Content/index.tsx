import * as React from 'react';
import styles from './index.less';

const ratio = 1.5;

interface Props {}

interface State {
  contentWidth: number;
  contentHeight: number;
}

/**
 * @description 内容
 * @author jerrychir
 * @export
 * @class Content
 * @extends {React.Component<Props, State>}
 */
export class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      contentWidth: window.innerWidth / ratio,
      contentHeight: ((window.innerWidth / ratio) * 9) / 16,
    };
  }
  componentDidMount(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillMount(): void {}

  private handleResize = e => {
    console.log(e.x);

    this.setState({
      contentWidth: window.innerWidth / ratio,
      contentHeight: ((window.innerWidth / ratio) * 9) / 16,
    });
  };
  render() {
    const { contentWidth, contentHeight } = this.state;
    return (
      <div className={styles.background}>
        <div className={styles.content} style={{ width: contentWidth, height: contentHeight }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
