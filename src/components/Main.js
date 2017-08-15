require('normalize.css/normalize.css');
require('styles/app.less');

import React from 'react';
import icons from '../utils/parseIcon';
import LockBar from  './lockbar';
import Control from './control'
import List from './list';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';


class AppComponent extends React.Component {
 /* constructor(props){
    super(props);
    this.props=props
  }
  */


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
        <div className="stage" ref="stage" onMouseLeave={(this.props.showlist||this.props.locked)?null:this.handleMouseLeave.bind(this)}
             onMouseOver={this.handleMouseOver.bind(this)}>
          <LockBar/>
          <div className="handle" ref="handle" ></div>
          <div className="bg" style={styleObj1}></div>
          <Control/>
          <List ref="list"/>

          <audio></audio>
          <audio></audio>



      </div>

      </div>


    )
  }
}

AppComponent.defaultProps = {
};

const mapStateToProps =(state)=>{
  return {locked:state.locked,
  showlist:state.showlist}
}

AppComponent=connect(mapStateToProps)(AppComponent)


export default AppComponent;
