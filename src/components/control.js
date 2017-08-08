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
import {showList,showVolBar,changeMode,next,prev,playButton} from 'action/actionindex';

class TopBar extends React.Component{
  render(){
    return(
      <div>
        <a className="topname" href="http://music.163.com/#/artist?id=93183"
           title={this.props.play.songname}>{this.props.play.songname}</a>
        <span className="topspan">
          <a href="http://music.163.com/#/artist?id=93183" title={this.props.play.artists}>{this.props.play.artists}</a>
        </span>
        <a className="icn-src1" href="http://music.163.com/#/playlist?id=4752814&_hash=songlist-18094991" title="来自歌单"></a>
      </div>
    )
  }
}

const mapStateToTopBar=(state)=>{
  return { play:state.play}
}

TopBar=connect(mapStateToTopBar)(TopBar)

class Control extends React.Component{
  render(){
    let styleObj1={};
    styleObj1.background='url('+icons.playbar+')';
    let styleObj4={};
    styleObj4.background='url('+icons.statbar+')';
    let styleObj5={};
    styleObj5.background='url('+icons.iconall+')';

    const {handleShowList,handleShowVolBar,handleChangeMode,mode,handleNext,
      handlePrev,handleKeyPrev,handleKeyNext,handlePlayButton}=this.props;

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
          <a className="prev" title="上一首（←)" style={styleObj1}
             onClick={(e)=>handlePrev(e)}  onKeyDown={(e)=>handleKeyPrev(e)}>上一首</a>
          <a className={this.props.pause?'pause':'play'} title="播放/暂停(p)" style={styleObj1}
             onClick={(e)=>handlePlayButton(e)}>播放/暂停</a>
          <a className="next" title="下一首(→)" style={styleObj1}
             onClick={(e)=>handleNext(e)} onKeyDown={(e)=>handleKeyNext(e)}>下一首</a>
        </div>
        <div className="head">
          <img src={this.props.play.img}/>
            <a href="javascripts:;" className="mask" style={styleObj1}>
            </a>

        </div>
        <div className="playbar">
          <div className="topbar">
            {!this.props.play?<div></div>:<TopBar/>}
          </div>
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
               style={styleObj1} onClick={e=>handleShowList(e)}>{this.props.collect.length}</a>
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
    mode:state.mode,
    play:state.play,
    collect:state.collect,
    pause:state.pause
  }
}

const mapDispatchToProps=(dispatch,ownprops)=>{
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

      e.preventDefault();
      e.stopPropagation()

    },
    handlePrev:(e)=>{
      dispatch(prev(ownprops.playindex));

      e.preventDefault();
      e.stopPropagation()
    },

    handleNext:(e)=>{
      dispatch(next(ownprops.playindex));

      e.preventDefault();
      e.stopPropagation()
    },
    handleKeyprev:(e)=>{
      if(e.keyCode===37){
        dispatch(prev(ownprops.playindex));
      }
    },

    handleKeyNext:(e)=>{
      if(e.keyCode===39){
        dispatch(next(ownprops.playindex));
      }
    },

    handlePlayButton:(e)=>{
      dispatch(playButton())

      e.preventDefault();
      e.stopPropagation()
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Control)
