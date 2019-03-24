import React from 'react';
import styles from './index.less';

interface Props {}

interface State {}

/**
 * @description Header
 * @author jerrychir
 * @export
 * @class MemberHeader
 * @extends {React.Component<Props, State>}
 */
export class MemberHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.header}>
        <h2 className={styles.title}>叁果科技管理后台</h2>
      </div>
    );
  }
}
