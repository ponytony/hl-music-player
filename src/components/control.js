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
import {secondToTime} from 'utils/parseTime'
import {showList,showVolBar,changeMode,next,prev,playButton,setVolumn,getDuration,getCurrentTime,
         getBuffered,setCurrentTime} from 'action/actionindex';

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

  constructor(){
    super()
    this.onMouseDownStart=this.onMouseDownStart.bind(this);
    this.onMouseDownEnd=this.onMouseDownEnd.bind(this);
    this.onMouseDownForBarStart=this.onMouseDownForBarStart.bind(this);
    this.onMouseDownForBarEnd=this.onMouseDownForBarEnd.bind(this);
  }



  getElementNode(ref){
    return findDOMNode(ref)
  }

  isOnNode(event,ref){
    const Element=this.getElementNode(ref);
    const range=Element.getBoundingClientRect();


    return(event.clientX>range.left &&
    event.clientY>range.top &&
    event.clientX<range.width+range.left &&
    event.clientY<range.height+range.top)
  }

  onMouseDown(e){
    const {setVol}=this.props
    const clientY=e.clientY-this.getElementNode(this._vbar).getBoundingClientRect().top;

    setVol(100-clientY)

    e.preventDefault()
    e.stopPropagation()
  }

  onMouseDownForvol(e){//.bind 函数会返回一个新的函数，所以之前removelestener时都会发生错误,因为不是同一个函数了，所以说construct不能省略

    e.preventDefault()
    if(!this.isOnNode(e,this._cir)){
      return
    }
    document.addEventListener('mousemove', this.onMouseDownStart)
    document.addEventListener('mouseup', this.onMouseDownEnd)



    }


  onMouseDownStart(e){

    if(!this.isOnNode(e,this._vcontainer)){
      document.removeEventListener('mousemove', this.onMouseDownStart)
      document.removeEventListener('mouseup', this.onMouseDownEnd)
      return false
    }
    e.preventDefault()
    const {setVol}=this.props
    const clientY=e.clientY-findDOMNode(this._vbar).getBoundingClientRect().top;
    setVol(99-clientY)



  }

  onMouseDownEnd(e) {
    e.preventDefault()
    if(this.isOnNode(e,this._vcontainer)){
      document.removeEventListener('mousemove', this.onMouseDownStart)
      document.removeEventListener('mouseup', this.onMouseDownEnd)
    }
  }

/*
  componentDidMount(){
    document.addEventListener('mousedown', this.onMouseDownForvol.bind(this))
  }
  */
  componentDidMount(){
    const {handleKeyprev,handleKeyNext}=this.props

    this._audio.load()//init the audio
    //this._audio.play()
   // this._audio.pause();
    this._audio.volume=this.props.volumn/100;
    this._audio.addEventListener('loadedmetadata',()=>this.handleDuration());
    this._audio.addEventListener('progress',()=>this.handleBuffered());
    this._audio.addEventListener('timeupdate',()=>this.handleCurrentTime());
    this._audio.addEventListener('ended',(e)=>this.handleEnded(e));
    this._audio.addEventListener('error',()=>this.handleError());

    document.addEventListener('keydown',handleKeyprev)
    document.addEventListener('keydown',handleKeyNext)
    //this._audio.muted=(this.props.volumn===(0||1||2)?true:false);
  }


  componentWillUnmount(){
    document.removeEventListener('mousedown', this.onMouseDownForvol)
    document.removeEventListener('mousemove', this.onMouseDownStart)
    document.removeEventListener('mouseup', this.onMouseDownEnd)

  }


  /*
  audio 标签的相关事件
   */
  componentDidUpdate(){

    if(this._audio.volume/100!==this.props.volumn/100){
      this._audio.volume=this.props.volumn/100
    }

    if(!this.props.pause){
      this._audio.play()
    }else{
      this._audio.pause()
    }

    if(this.props.mode==='one'){
      this._audio.loop=true
    }else{
      this._audio.loop=false
    }
  }

  handleEnded(e){
    const {handleNext}=this.props;
    handleNext(e)
  }

  handleDuration(){
    const{handleDuration}=this.props;
    const data=Math.floor(this._audio.duration)
    handleDuration(data)
  }

  handleCurrentTime(){
    const {handleCurrentTime}=this.props;
    let data;

    if(this._audio.currentTime===0){
      data=1
    }else{
      data=Math.floor(this._audio.currentTime);
    }
    if(this.props.currenttime===data){return}
    handleCurrentTime(data)
  }

  handleBuffered(){
    const {handleBuffered}=this.props;
    let data;

    if(this._audio.buffered.end(0)===0){
      data=1
    }else{
      data=Math.floor(this._audio.buffered.end(0));
    }
    handleBuffered(data)
  }

  onMouseDownForBar(e){
    e.preventDefault()
    if(!this.isOnNode(e,this._btn)){
      return
    }
    document.addEventListener('mousemove', this.onMouseDownForBarStart)
    document.addEventListener('mouseup', this.onMouseDownForBarEnd)

  }

  onMouseDownForBarStart(e){
    const{handleSetCurrentTime}=this.props
    e.preventDefault()
    if(!this.isOnNode(e,this._btn)){
      document.removeEventListener('mousemove', this.onMouseDownForBarStart)
      document.removeEventListener('mouseup', this.onMouseDownForBarEnd)
      return false
    }
    let clientY
    clientY=e.clientX-findDOMNode(this._timebar).getBoundingClientRect().left;
    if(clientY===0){
      clientY=1
    }
    const newCurrentTime=Math.floor(clientY/493*this.props.duration)
    this._audio.currentTime=newCurrentTime
    handleSetCurrentTime(newCurrentTime)

  }

  onMouseDownForBarEnd(e){
    e.preventDefault()
    document.removeEventListener('mousemove', this.onMouseDownForBarStart)
    document.removeEventListener('mouseup', this.onMouseDownForBarEnd)

  }

  onMouseDownForClick(e){
    const{handleSetCurrentTime}=this.props
    e.preventDefault()
    if(!this.isOnNode(e,this._timebar)){

      return
    }
    let clientY
    clientY=e.clientX-findDOMNode(this._timebar).getBoundingClientRect().left;
    if(clientY===0){
      clientY=1
    }
    const newCurrentTime=Math.floor(clientY/493*this.props.duration)
    this._audio.currentTime=newCurrentTime
    handleSetCurrentTime(newCurrentTime)
  }

  handleError(){
    console.log('Error ' + this._audio.error.code + '; details: ' + this._audio.error.message)
  }








  render(){
    let styleObj1={};
    styleObj1.background='url('+icons.playbar+')';
    let styleObj4={};
    styleObj4.background='url('+icons.statbar+')';
    let styleObj5={};
    styleObj5.background='url('+icons.iconall+')';

    const {handleShowList,handleShowVolBar,handleChangeMode,mode,handleNext,
      handlePrev,handleKeyprev,handleKeyNext,handlePlayButton}=this.props;

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
             onClick={(e)=>handlePrev(e)}  onKeyUp={(e)=>{handleKeyprev(e)}} ref={a=>this._prev=a}>上一首</a>
          <a className={this.props.pause?'pause':'play'} title="播放/暂停(p)" style={styleObj1}
             onClick={(e)=>handlePlayButton(e)}>播放/暂停</a>
          <a className="next" title="下一首(→)" style={styleObj1}
             onClick={(e)=>handleNext(e)} onKeyUp={(e)=>handleKeyNext(e)} ref={a=>this._next=a}>下一首</a>
        </div>
        <div className="head">
          <img src={this.props.play.img}/>
            <a href="javascripts:;" className="mask" style={styleObj1}>
            </a>

        </div>
        <div className="playbar" ref={div=>this._playbar=div}>
          <div className="topbar">
            {!this.props.play?<div></div>:<TopBar/>}
          </div>
          <div className="play-bar">
            <div className="time-bar" style={styleObj4} ref={div=>this._timebar=div}
                 onClick={(e)=>this.onMouseDownForClick(e)}>
              <div className="rdy"
                   style={{...styleObj4,'width':(this.props.buffered+0.01)/this.props.duration*493}}></div>
              <div className="cur"
                   style={{...styleObj4,'width':(this.props.currenttime+0.01)/this.props.duration*493}}>
                <span className="btn" style={styleObj5} ref={span=>this._btn=span}
                      onMouseDown={(e)=>this.onMouseDownForBar(e)}><i></i></span>
              </div>
            </div>
            <span className="total-time">
              <em className="playing-time">{secondToTime(this.props.currenttime)}</em>
              /{secondToTime(this.props.duration)}
            </span>
          </div>
        </div>
        <div className="oper">
          <a href="javascripts:;"  className="icn icn-add" title="收藏" style={styleObj1}>收藏</a>
          <a href="javascripts:;" className="icn icn-share" title="分享" style={styleObj1}>分享</a>
        </div>
        <div className="ctrl">
          <div className={this.props.showvol?'vol-cont':'vol-cont nodisplay'}>
            <div className="v-container" style={styleObj1} onDoubleClick={(e)=>{handleShowVolBar(e)}}
                 ref={div=>this._vcontainer=div}></div>
            <div className="v-bar" ref={div=>this._vbar=div} onMouseDown={(e)=>this.onMouseDown(e)}>
              <div className="v-all" style={{...styleObj1,'height':this.props.volumn}}></div>
              <span className="volumn-cir" style={{...styleObj5,'top':90-this.props.volumn}} ref={span=>this._cir=span}
                    onMouseDown={this.onMouseDownForvol.bind(this)} title={this.props.volumn}></span>
            </div>
          </div>
          <a href="javascripts:;" className={this.props.volumn===(0||1||2)?'icn icn-volno':'icn icn-vol'}
             title="音量"
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
        <audio  ref={audio=>this._audio=audio} preload="auto" src={this.props.play.mp3Url.replace(/http:/g,'')}></audio>

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
    volumn:state.volumn,
    totaltime:state.totaltime,
    playtime:state.playtime,
    buffered:state.buffered,
    currenttime:state.currenttime,
    duration:state.duration
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
    },
    handleDuration:(data)=>{
      dispatch(getDuration(data))
    },
    handleCurrentTime:(data)=>{
      dispatch(getCurrentTime(data))
    },
    handleBuffered:(data)=>{
      dispatch(getBuffered(data))
    },

    handleSetCurrentTime:(data)=>{
      dispatch(setCurrentTime(data))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Control)
