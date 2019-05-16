import * as React from 'react';
import styles from './index.less';
import { Icon } from 'antd';

interface Props {
  type: string;
  title?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface State {}

/**
 * @description 按钮
 * @author jerrychir
 * @export
 * @class SButton
 * @extends {React.Component<Props, State>}
 */
export class SButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    style: { fontSize: 24 },
  };

  render() {
    const { type, style, onClick, title } = this.props;
    return (
      <div className={styles.button}>
        <Icon type={type} style={style} onClick={onClick} />
        <div className={styles.text}>{title}</div>
      </div>
    );
  }
}
