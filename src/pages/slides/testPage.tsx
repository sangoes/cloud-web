import React from 'react';
import styles from './index.less';

interface Props {}

interface State {
  contentWidth?: number;
  contentHeight?: number;
}

export default class TestPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      contentHeight: window.innerHeight,
      contentWidth: window.innerWidth / 5,
    };
  }

  render() {
    const { contentWidth, contentHeight } = this.state;
    return (
      <div className={styles.content}>
        <div className={styles.box} style={{ width: contentWidth, height: contentHeight }}>
          dsadsa
        </div>
      </div>
    );
  }
}
