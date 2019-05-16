import * as React from 'react';
import styles from './index.less';
import { Divider, Select } from 'antd';
import { SButton } from '../SButton';
import { wordSize, word } from '../slides';

const Option = Select.Option;

interface Props {}

interface State {}

/**
 * @description 工具栏
 * @author jerrychir
 * @export
 * @class ToolBar
 * @extends {React.Component<Props, State>}
 */
export class ToolBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    // 字体大小
    const wordSizeOptions = wordSize.map(val => {
      return (
        <Option key={val} value={val}>
          {val}
        </Option>
      );
    });
    // 字体
    const wordOptions = word.map(val => {
      return (
        <Option key={val} value={val}>
          {val}
        </Option>
      );
    });
    return (
      <div className={styles.background}>
        {/* 新建页面 */}
        <SButton
          type="desktop"
          title={'新建页面▼'}
          onClick={() => {
            console.log('adsfsaf');
          }}
        />
        <Divider type="vertical" />
        {/* 字体 */}
        <div className={styles.word}>
          <Select size="small" defaultValue="宋体" style={{ width: 94 }}>
            {wordOptions}
          </Select>
          <div className={styles.type}>
            <SButton type="bold" style={{ fontSize: 14 }} />
            <SButton type="italic" style={{ fontSize: 14 }} />
            <SButton type="underline" style={{ fontSize: 14 }} />
            <SButton type="font-colors" style={{ fontSize: 14 }} />
          </div>
        </div>
        <Divider type="vertical" />
        {/* 字体大小 */}
        <Select size="small" defaultValue="20" style={{ width: 54 }}>
          {wordSizeOptions}
        </Select>
        <Divider type="vertical" />
        {/* 图片 */}
        <SButton
          type="picture"
          title={'图片'}
          onClick={() => {
            console.log('adsfsaf');
          }}
        />
        <Divider type="vertical" />
        {/* 文本框 */}
        <SButton
          type="project"
          title={'文本框'}
          onClick={() => {
            console.log('adsfsaf');
          }}
        />
        <Divider type="vertical" />
        {/* 预览 */}
        <SButton
          type="play-circle"
          title={'预览'}
          onClick={() => {
            console.log('adsfsaf');
          }}
        />
      </div>
    );
  }
}
