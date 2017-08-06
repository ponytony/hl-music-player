/**
 * Created by:homelan
 * User: pijiu3302@outlool.com
 * Date: 2017/7/31
 * Time: 19:35
 *
 */

import React from 'react';
import {connect} from 'react-redux'
import icons from '../utils/parseIcon';
import {showList,showVolBar,changeMode} from 'action/actionindex';

class Control extends React.Component{
  render(){
    let styleObj1={};
    styleObj1.background='url('+icons.playbar+')';
    let styleObj4={};
    styleObj4.background='url('+icons.statbar+')';
    let styleObj5={};
    styleObj5.background='url('+icons.iconall+')';

    const {handleShowList,handleShowVolBar,handleChangeMode,mode}=this.props;

    let newmode,newtitle;
    if(mode==='circle'){
      newmode='mode icn-loop';
      newtitle='循环'
    }else if(mode==='shuffle'){
      newmode='mode icn-shuffle';
      newtitle='随机'
    }else{
      newmode='mode icn-one';
      newtitle='单曲循环'
    }

    return (
      <div className="control">
        <div className="btns">
          <a className="prev" title="上一首（ctrl+←" style={styleObj1}>上一首</a>
          <a className="play" title="播放/暂停(p)" style={styleObj1}>播放/暂停</a>
          <a className="next" title="下一首(ctrl+→" style={styleObj1}>下一首</a>
        </div>
        <div className="head">
          <img/>
            <a href="javascripts:;" className="mask" style={styleObj1}>
            </a>

        </div>
        <div className="playbar">
          <div className="topbar"></div>
          <div className="play-bar">
            <div className="time-bar" style={styleObj4}>
              <div className="rdy" style={styleObj4}></div>
              <div className="cur" style={styleObj4}>
                <span className="btn" style={styleObj5}><i></i></span>
              </div>
            </div>
            <span className="total-time">
              <em className="playing-time"></em>
            </span>
          </div>
        </div>
        <div className="oper">
          <a href="javascripts:;"  className="icn icn-add" title="收藏" style={styleObj1}>收藏</a>
          <a href="javascripts:;" className="icn icn-share" title="分享" style={styleObj1}>分享</a>
        </div>
        <div className="ctrl">
          <div className={this.props.showvol?'vol-cont':'vol-cont nodisplay'}>
            <div className="v-container" style={styleObj1}></div>
            <div className="v-bar">
              <div className="v-all" style={styleObj1}></div>
              <span className="volumn-cir" style={styleObj5}></span>
            </div>
          </div>
          <a href="javascripts:;" className="icn icn-vol" title="音量"
             style={styleObj1} onClick={(e)=>{handleShowVolBar(e)}}></a>
          <a title={newtitle} className={newmode} style={styleObj1}
             onClick={(e,mode)=>handleChangeMode(e,mode)}></a>

          <span className="add">
            <span className="tip" style={styleObj1}>已经添加到播放列表</span>
            <a href="javascripts:;" title="播放列表" className="icn icn-list"
               style={styleObj1} onClick={e=>handleShowList(e)}></a>
          </span>
          <div className="tip tip-1" style={styleObj1}>循环</div>

        </div>
      </div>
    )

  }
}
/*
const mapStateToProps=(state)=>{
  return {showlist:state.showlist}
}
*/
const mapStateToProps=(state)=>{
  return{
    showvol:state.showvol,
    mode:state.mode
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    handleShowList:(e)=>{
      dispatch(showList());

      e.preventDefault();
      e.stopPropagation()
    },
    handleShowVolBar:(e)=>{
      dispatch(showVolBar());

      e.preventDefault();
      e.stopPropagation()
    },
    handleChangeMode:(e,mode)=>{
      dispatch(changeMode(mode));

    }

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Control)
