import React from 'react';
import { Slide } from '@/components/Slides';

interface Props {}

interface State {}

/**
 * @description 幻灯片
 * @author jerrychir
 * @export
 * @class SlidesPage
 * @extends {React.Component<Props, State>}
 */
export default class SlidesPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Slide />
      </div>
    );
  }
}
