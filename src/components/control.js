/**
 * Created by:homelan
 * User: pijiu3302@outlool.com
 * Date: 2017/7/31
 * Time: 19:35
 *
 */

import React from 'react';
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import icons from '../utils/parseIcon';
import {showList,showVolBar,changeMode,next,prev,playButton,setVolumn} from 'action/actionindex';

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

  getElementNode(ref){
    return findDOMNode(ref)
  }

  isOnNode(event,ref){
    const Element=this.getElementNode(ref);
    const range=Element.getBoundingClientRect();
    return(event.clientX>range.left&&
    event.clientY>range.top&&
    event.clientX<range.width+range.left&&
    event.clientX<range.height+range.top)
  }

  onMouseDown(e){
    const {setVol}=this.props
    const clientY=e.clientY-this.getElementNode(this._vbar).getBoundingClientRect().top;

    setVol(100-clientY)

    e.preventDefault()
    e.stopPropagation()
  }

  onMouseDownForvol(e){

    document.addEventListener('mousemove', this.onMouseDownStart)
    document.addEventListener('mouseup', this.onMouseDownEnd)
    debugger;
    e.preventDefault()
    e.stopPropagation()
    }


  onMouseDownStart(e){
    const clientY=e.clientY-findDOMNode(this._vbar).getBoundingClientRect().top;
    this.dispatch(setVolumn(100-clientY))



    e.preventDefault()
    e.stopPropagation()
  }

  onMouseDownEnd(e) {


    document.removeEventListener('mousemove', this.onMouseDownStart)
    document.removeEventListener('mouseup', this.onMouseDownEnd)
    e.preventDefault()
    e.stopPropagation()
  }




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
            <div className="v-container" style={styleObj1} onDoubleClick={(e)=>{handleShowVolBar(e)}}></div>
            <div className="v-bar" ref={div=>this._vbar=div} onMouseDown={(e)=>this.onMouseDown(e)}>
              <div className="v-all" style={{...styleObj1,'height':this.props.volumn}}></div>
              <span className="volumn-cir" style={{...styleObj5,'top':90-this.props.volumn}} ref={span=>this._cir=span}
                    onMouseDown={(e)=>this.onMouseDownForvol(e)}></span>
            </div>
          </div>
          <a href="javascripts:;" className="icn icn-vol" title="音量"
             style={styleObj1} onClick ={(e)=>{handleShowVolBar(e)}}></a>
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
    pause:state.pause,
    volumn:state.volumn
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

      e.preventDefault();
      e.stopPropagation()

    },
    handlePrev:(e)=>{
      dispatch(prev());

      e.preventDefault();
      e.stopPropagation()
    },

    handleNext:(e)=>{
      dispatch(next());

      e.preventDefault();
      e.stopPropagation()
    },
    handleKeyprev:(e)=>{
      if(e.keyCode===37){
        dispatch(prev());
      }
    },

    handleKeyNext:(e)=>{
      if(e.keyCode===39){
        dispatch(next());
      }
    },

    handlePlayButton:(e)=>{
      dispatch(playButton());

      e.preventDefault();
      e.stopPropagation()
    },

    setVol:(data)=>{
      dispatch(setVolumn(data))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Control)
