import React from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import styles from './index.less';
import { Scrollbars } from 'react-custom-scrollbars';

const ratio = 4.5;

interface Props {}

interface State {
  // 当前side bar的宽
  contentWidth: number;
  // 当前slide高
  slideHeight: number;
  // 当前选中的Slide
  currentSlide?: any;
}

interface IRefs {
  slideRef?: HTMLDivElement;
}

/**
 * @description 侧边栏
 * @author jerrychir
 * @export
 * @class SiderBar
 * @extends {React.Component<Props, State>}
 */
export class SiderBar extends React.Component<Props, State> {
  refKey: IRefs = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      contentWidth: window.innerWidth / ratio,
      slideHeight: 90,
    };
  }

  /**
   * @description 渲染完成
   * @author jerrychir
   * @memberof SiderBar
   */
  componentDidMount(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({ slideHeight: (this.refKey.slideRef.clientWidth * 9) / 16 });
  }

  /**
   * @description 调整大小
   * @private
   * @memberof SiderBar
   */
  private handleResize = e => {
    this.setState({ slideHeight: (this.refKey.slideRef.clientWidth * 9) / 16 });
  };

  /**
   * @description 当点击slide
   * @private
   * @memberof SiderBar
   */
  private onSlidePress = e => {
    // 移除当前slide的妙边属性
    if (this.state.currentSlide) {
      this.state.currentSlide.style.borderStyle = null;
      this.state.currentSlide.style.borderColor = null;
    }
    // 当前slide
    this.setState({ currentSlide: e.currentTarget });
    e.currentTarget.style.borderStyle = 'solid';
    e.currentTarget.style.borderColor = '#e27136';
  };

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof SiderBar
   */
  render() {
    const style = {
      slideStyle: {
        width: '100%',
        height: this.state.slideHeight,
      },
    };
    const { contentWidth } = this.state;
    const data = [];
    for (let index = 0; index < 15; index++) {
      data.push(index);
    }
    const pane = data.map(key => (
      <div className={styles.content} key={key}>
        {/* text */}
        <div className={styles.text}>{key + 1}</div>
        {/* slide */}
        <div
          ref={ref => (this.refKey.slideRef = ref)}
          className={styles.pane}
          style={style.slideStyle}
          onClick={this.onSlidePress}
        >
          {/*  */}
        </div>
      </div>
    ));

    return (
      <div className={styles.sortPane} style={{ width: contentWidth }}>
        {pane}
      </div>
    );
  }
}
