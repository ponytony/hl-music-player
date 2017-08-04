require('normalize.css/normalize.css');
require('styles/app.less');

import React from 'react';
import icons from '../utils/parseIcon';
import LockBar from  './lockbar';
import Control from './control'
import List from './list';
import {findDOMNode} from 'react-dom';


class AppComponent extends React.Component {
  constructor(state){
    super();
    this.state=state
  }


  handleMouseOver(e){
    const stage=findDOMNode(this.refs.stage);
    stage.style.top='-53px';


    e.stopPropagation();//取消默认行为
    e.preventDefault();

  }

  handleMouseLeave(e){
    const stage=findDOMNode(this.refs.stage);
    stage.style.top='0';


    e.stopPropagation();//取消默认行为
    e.preventDefault();
  }
  render() {
    let styleObj1={};
    styleObj1.background='url('+icons.playbar+')';

    return (
      <div className="player-base">
        <div className="stage" ref="stage" onMouseLeave={this.handleMouseLeave.bind(this)}>
          <LockBar/>
          <div className="handle" onMouseOver={this.handleMouseOver.bind(this)} ></div>
          <div className="bg" style={styleObj1} onMouseOver={this.handleMouseOver.bind(this)} ></div>
          <Control/>
          <List/>
      </div>

      </div>


    )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
