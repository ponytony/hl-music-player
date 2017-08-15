/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/7/31
 * Time: 22:15
 *
 */


import React from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

import axios from 'axios'
import icons from '../utils/parseIcon';
import {showList,playIndex,addPlay,setData,updateSTop,delACollect,cleanList,setLrc,setData2,
updateHandleH,updateLrcHandleH,updateVisibleSTop2,setScrollHeight} from 'action/actionindex'
import {calculateHandleHeight,calculateNewHandlePos,calculateScrollTop} from 'utils/scrollBar'
import {parseLrc} from 'utils/parseLrc'

let styleObj2={};
styleObj2.background='url('+icons.playlist+')';
let styleObj3={};
styleObj3.background='url('+icons.playlist_bg+')';

const Block=()=>{
  return(<div></div>)}

class NoSong extends React.Component{
  render(){
    return (
      <div className="nocnt" ref="nocnt">
        <i className="icn" style={styleObj2}></i>
          你还没有添加任何歌曲
        <br/>
          去首页
          <a href='shouye' className='nolist'>发现音乐</a>
          ,或者在
          <a href='wodeyinyue' className='nolist'>我的音乐</a>
          收听自己收藏的歌单
      </div>
    )
  }
}


class SongList extends React.Component{
  constructor(){
    super()
    //this.handleAddPlaying=this.handleAddPlaying.bind(this)
    //this.isOnNode=this.isOnNode.bind(this)
   // this.getElementNode=this.getElementNode.bind(this)
  }

  isOnNode(event,ref){
    const Element=this.getElementNode(ref);
    const range=Element.getBoundingClientRect();
    return(event.clientX>range.left&&
    event.clientY>range.top&&
    event.clientX<range.width+range.left&&
    event.clientY<range.height+range.top)
  }
  getElementNode(ref){
    return findDOMNode(ref)
  }



  componentDidMount() {
   // document.addEventListener('click',this.handleAddPlaying)
  }







  render(){
    const {handleDelACollect,addPlaying}=this.props;
    const collect=this.props.collect;
    return(
    <li ref={'_li'+this.props.playindex} className={this.props.collect==this.props.play?'white':''}>
      <div className="col col1" onClick={(e)=>addPlaying(e)}>
        {collect.id===this.props.play.id?<PlayIcn/>:<Block/>}
      </div>
      <div className="col col2" onClick={(e)=>addPlaying(e)}>
        {this.props.collect.songname}
      </div>
      <div className="col col3">
        <div className="icns" ref={'_btns'+this.props.playindex}>
          <i className="icn icn-del" title="删除" style={styleObj2} onClick={(e)=>handleDelACollect(e)}>删除</i>
          <i className="icn icn-dl" title="下载" style={styleObj2}>下载</i>
          <i className="icn icn-share1" title="分享" style={styleObj2}>分享</i>
          <i className="j-t icn icn-add2" title="收藏" style={styleObj2}>收藏</i>
        </div>
      </div>
      <div className="col col4" onClick={(e)=>addPlaying(e)}><span>
        <a href="http://music.163.com/#/artist?id=93183" >{this.props.collect.artists}</a></span>
      </div>
      <div className="col col5" onClick={(e)=>addPlaying(e)}></div>
      <div className="col col6" ref={'_col6'+this.props.playindex}>
        <a href="{gedan}" className="icn icn-src" title="来自歌单" style={styleObj2}>来源</a>
      </div>
    </li>)
  }
}

const mapStateToSongList=(state)=>{
  return{
    play:state.play
  }
};

const mapDispatchToSongList=(dispatch,ownprops)=>{
  return {
    addIndex:(playindex,id)=>{
      dispatch(playIndex(playindex,id))
    },
    addPlaying:()=>{
      dispatch(addPlay(ownprops.collect,ownprops.playindex));
    },
    handleDelACollect:(e)=>{
      dispatch(delACollect(ownprops.playindex))
      e.preventDefault();
      e.stopPropagation()
    }
  }
};


SongList=connect(mapStateToSongList,mapDispatchToSongList)(SongList);









class LrcList extends React.Component{

  handleLrc(){

  }

  componentDidMount(){
    const url=this.props.play.lrcurl;
    const {handleSetLrc}=this.props;
    if(url) {
      axios({
        method: 'get',
        url: url,
        responseType: 'text'
      })
        .then(function (response) {
          const data = response.data;
          let datas=parseLrc(data);
          let newdata={};
          newdata.url=url;
          newdata.data=datas;
          handleSetLrc(newdata);
        });
    }
  }


  componentDidUpdate(){
    const url=this.props.play.lrcurl;
    const {handleSetLrc,handleScrollTop}=this.props;

    if(url!==this.props.playlrc.url) {
      axios({
        method: 'get',
        url: url,
        responseType: 'text'
      })
        .then(function (response) {
          const data = response.data;
          let datas=parseLrc(data);
          let newdata={};
          newdata.url=url;
          newdata.data=datas;
          handleSetLrc(newdata);
        });
    }
    //打了一个补丁，因为在LIST中无法正确获取更新后的LRCLIST组件的scrollheight
    const scrollheight=this._div.scrollHeight;
    if(scrollheight!==this.props.scrollBar2.totalrange){
      handleScrollTop(scrollheight)
    }
  }



  render(){
    const lrc=[];
    if(this.props.playlrc.data){
      const playlrc=this.props.playlrc;
      for(let i=0,len=playlrc.data.length;i<len;i++){
        lrc.push(<p className={playlrc.data[i][0]<=this.props.currenttime&&playlrc.data[i+1][0]>this.props.currenttime?'changecolor':''}
                    key={i}>{playlrc.data[i][1]}</p>)
      }
    }

    return (
      <div ref={div=>this._div=div}>
        {lrc}
      </div>

    )
  }
}

const mapStateToLrcList=(state)=>{
  return{
    play:state.play,
    currenttime:state.currenttime,
    playlrc:state.playlrc,
    scrollBar2:state.scrollbar2
  }
}

const mapDispatchToLrcList=(dispatch)=>{
  return{
    handleSetLrc:(data)=>{
      dispatch(setLrc(data))
    },
    handleScrollTop:(data)=>{
      dispatch(setScrollHeight(data))
  }
  }
}

LrcList=connect(mapStateToLrcList,mapDispatchToLrcList)(LrcList)



class FindLrc extends React.Component{
  render(){
    return(
        <div className="nocnt nolyric">
          <span className="s-fc4">暂时没有歌词</span>
          <a href="#" className="f-tdu">求歌词</a>
        </div>
    )
  }
}




class PlayIcn extends React.Component{
  render(){
    return (
      <div className="playicn" style={styleObj2} title="正在播放"></div>
    )
  }
}

class Ask extends  React.Component{
  render(){
    return(
      <div className="ask">
        <a className="icn icn-ask" style={styleObj2}></a>
      </div>
    )
  }
}




class List extends React.Component{

  constructor(){
    super()
    this.onDragHandle=this.onDragHandle.bind(this);
    this.onDragHandleStart=this.onDragHandleStart.bind(this);
    this.onDragHandleEnd=this.onDragHandleEnd.bind(this);
    this.onMouseDownForBar2Start=this.onMouseDownForBar2Start.bind(this);
    this.onMouseDownForBar2End=this.onMouseDownForBar2End.bind(this);
    this.onMouseDownForBar2=this.onMouseDownForBar2.bind(this);
  }

  componentDidMount(){
    //scrollbar1
    const {mountSetData,handleSetDate2}=this.props;
    //content
    const visibleContent=this.getElementNode(this._songlist);
    const visibleRange=visibleContent.clientHeight;
    const totalRange=visibleContent.scrollHeight;
    const visibleSTop=visibleContent.scrollTop;

    //bar 500px+
    const barContent=this.getElementNode(this._bar1div);
    const visibleBar=barContent.clientHeight;
     //handle
    const handleTop=0;
    const handleHeight=calculateHandleHeight(visibleBar,visibleRange,totalRange);

    //这里可以不用自执行函数，就是试试
    (function submit(handleheight, handletop, barheight,
              visiblerange, totalrange, visibleSTop){
      mountSetData(handleheight, handletop, barheight,
        visiblerange, totalrange, visibleSTop)
    })(handleHeight, handleTop, visibleBar,
      visibleRange, totalRange, visibleSTop)

    //scroll bar of right

    const visibleContent2=this.getElementNode(this._songlrc);
    const visibleRange2=visibleContent2.clientHeight;
    const totalRange2=visibleContent2.scrollHeight;
    const visibleSTop2=visibleContent2.scrollTop;

    const barContent2=this.getElementNode(this._bar2div);
    const visibleBar2=barContent2.clientHeight;

    const handleTop2=0;
    const handleHeight2=calculateHandleHeight(visibleBar2,visibleRange2,totalRange2);
    handleSetDate2(handleHeight2,handleTop2,visibleBar2,visibleRange2,totalRange2,visibleSTop2)
  }

  componentDidUpdate(){
    //left scroll bar
    const {updataDelHandleH}=this.props
    const visibleContent=this.getElementNode(this._songlist);
    const visibleRange=visibleContent.clientHeight;
    const totalRange=visibleContent.scrollHeight;
    const barContent=this.getElementNode(this._bar1div);
    const visibleBar=barContent.clientHeight;
    const handleHeight=calculateHandleHeight(visibleBar,visibleRange,totalRange);
    if(handleHeight!==this.props.scrollBar1.handleheight){
      updataDelHandleH(handleHeight,totalRange)
    }

    //update right bar
    const{updataLrcHandleH}=this.props
    const visibleContent2=this.getElementNode(this._songlrc);
    const visibleRange2=visibleContent2.clientHeight;
    const totalRange2=visibleContent2.scrollHeight;
    const barContent2=this.getElementNode(this._bar2div);
    const visibleBar2=barContent2.clientHeight;
    const handleHeight2=calculateHandleHeight(visibleBar2,visibleRange2,totalRange2);

    if(handleHeight2!==this.props.scrollBar2.handleheight){
      updataLrcHandleH(handleHeight2,totalRange2)
    }

  }

  getElementNode(ref){
    return findDOMNode(ref)
  }

  isOnNode(event,ref){
    const Element=this.getElementNode(ref);
    const range=Element.getBoundingClientRect();
    return(event.clientX>range.left&&
    event.clientY>range.top&&
    event.clientX<range.width+range.left&&
    event.clientY<range.height+range.top)
  }


  /*
  songlist
   */
  setScrollTop(value,handletop){//update scrolltop of content
    const {updateVisibleSTop} =this.props;

      updateVisibleSTop(value,handletop)

  }

  onMouseDown1(e){

    const clientY=e.clientY-this.getElementNode(this._bar1div).getBoundingClientRect().top;
    const newhandlepos=calculateNewHandlePos(clientY,this.props.scrollBar1.handleheight,this.props.scrollBar1.barheight)
    const newscrolltop=calculateScrollTop(this.props.scrollBar1.barheight,newhandlepos,
      this.props.scrollBar1.handleheight,this.props.scrollBar1.visiblerange,this.props.scrollBar1.totalrange)
    this.setScrollTop(newscrolltop,newhandlepos)
    this._songlist.scrollTop=newscrolltop
  }
  onDragHandle(e){
    e.preventDefault()
    /*if(!this.isOnNode(e,this._handle1span)||this.props.scrollBar1.barheight===0){
      return
    }*/

    document.addEventListener('mousemove',this.onDragHandleStart)
    document.addEventListener('mouseup',this.onDragHandleEnd)

  }
  onDragHandleStart(e){
    e.preventDefault()
    const {barheight,handleheight,visiblerange,totalrange}=this.props.scrollBar1
    if(handleheight===0||!this.isOnNode(e,this._list)){
      document.removeEventListener('mousemove',this.onDragHandleStart)
      document.removeEventListener('mouseup',this.onDragHandleEnd)
    }
    const clientY=e.clientY-this.getElementNode(this._handle1span).getBoundingClientRect().top;
    const newhandlepos=calculateNewHandlePos(clientY,handleheight,barheight)
    const newscrolltop=calculateScrollTop(barheight,newhandlepos,
      handleheight,visiblerange,totalrange)
    this.setScrollTop(newscrolltop,newhandlepos)
    this._songlist.scrollTop=newscrolltop
    }


  onDragHandleEnd(e){


    e.preventDefault()
    if(this.isOnNode(e,this._list)){
      document.removeEventListener('mousemove',this.onDragHandleStart)
      document.removeEventListener('mouseup',this.onDragHandleEnd)
    }
  }



/*
  onDragEnd1(e){
    e.preventDefault()
    const {barheight,handleheight,visiblerange,totalrange}=this.props.scrollBar1
    if(this.props.scrollBar1.handleheight===0){
      return
    }
    const clientY=e.clientY-this.getElementNode(this._handle1span).getBoundingClientRect().top;
    const newhandlepos=calculateNewHandlePos(clientY,handleheight,barheight)
    const newscrolltop=calculateScrollTop(barheight,newhandlepos,
      handleheight,visiblerange,totalrange)
    this.setScrollTop(newscrolltop,newhandlepos)
    this._songlist.scrollTop=newscrolltop
  }
  */

  onWhell(e){

    if(this.props.scrollBar1.handleheight===0){
      return
    }
    const {barheight,visiblerange,totalrange,visibleSTop,handleheight}=this.props.scrollBar1
    const delta = e.deltaY % 3 ? (e.deltaY/2) : (e.deltaY * 5)
    const maxrange=totalrange-visiblerange;
    let newhandlepos;
    let newscrolltop=visibleSTop;
    if(newscrolltop>maxrange||newscrolltop<0){
      return
    } else if(maxrange-newscrolltop<delta){
      newscrolltop=maxrange
    }else if(newscrolltop<-delta){
      newscrolltop=0
    } else{
      newscrolltop=newscrolltop+delta
    }

    if(newscrolltop===0){
      newhandlepos=0
    }else{
      newhandlepos=newscrolltop/maxrange*(barheight-handleheight);
    }


    this.setScrollTop(newscrolltop,newhandlepos)
    this._songlist.scrollTop=newscrolltop
    e.preventDefault()
    e.stopPropagation()
  }

  /*
  for scrollbar of right
   */
  setScrollTop2(value,handletop){
    const {updataScrolltop}=this.props;
    updataScrolltop(value,handletop)
  }


  onMouseDown2(e){

    if(this.props.scrollBar2.handleheight===0){
      return
    }
    const clientY=e.clientY-this.getElementNode(this._bar2div).getBoundingClientRect().top;
    const newhandlepos=calculateNewHandlePos(clientY,this.props.scrollBar2.handleheight,this.props.scrollBar2.barheight)
    const newscrolltop=calculateScrollTop(this.props.scrollBar2.barheight,newhandlepos,
      this.props.scrollBar2.handleheight,this.props.scrollBar2.visiblerange,this.props.scrollBar2.totalrange)
    this.setScrollTop2(newscrolltop,newhandlepos)
    this._songlrc.scrollTop=newscrolltop


    e.preventDefault();
    e.stopPropagation()
  }

  onMouseDownForBar2(e){
    document.addEventListener('mousemove',this.onMouseDownForBar2Start);
    document.addEventListener('mouseup',this.onMouseDownForBar2End)

    e.preventDefault();
    e.stopPropagation()
  }

  onMouseDownForBar2Start(e){


    const clientY=e.clientY-this.getElementNode(this._bar2div).getBoundingClientRect().top;
    const newhandlepos=calculateNewHandlePos(clientY,this.props.scrollBar2.handleheight,this.props.scrollBar2.barheight)
    const newscrolltop=calculateScrollTop(this.props.scrollBar2.barheight,newhandlepos,
      this.props.scrollBar2.handleheight,this.props.scrollBar2.visiblerange,this.props.scrollBar2.totalrange)
    this.setScrollTop2(newscrolltop,newhandlepos);
    this._songlrc.scrollTop=newscrolltop;


    e.preventDefault();
    e.stopPropagation()
  }

  onMouseDownForBar2End(e){

    document.removeEventListener('mousemove',this.onMouseDownForBar2Start);
    document.removeEventListener('mouseup',this.onMouseDownForBar2End);

    e.preventDefault();
    e.stopPropagation()
  }

  onWheel2(e){
    const {barheight,visiblerange,totalrange,visibleSTop,handleheight}=this.props.scrollBar2
    const delta = e.deltaY % 3 ? (e.deltaY/2) : (e.deltaY * 5)
    const maxrange=totalrange-visiblerange;
    let newhandlepos;
    let newscrolltop=visibleSTop;
    if(newscrolltop>maxrange||newscrolltop<0){
      return
    } else if(maxrange-newscrolltop<delta){
      newscrolltop=maxrange
    }else if(newscrolltop<-delta){
      newscrolltop=0
    } else{
      newscrolltop=newscrolltop+delta
    }

    if(newscrolltop===0){
      newhandlepos=0
    }else{
      newhandlepos=newscrolltop/maxrange*(barheight-handleheight);
    }


    this.setScrollTop2(newscrolltop,newhandlepos)
    this._songlrc.scrollTop=newscrolltop
    e.preventDefault()
    e.stopPropagation()
  }

  autoMoveForLrc(){
    let newscrolltop;
    let newhandletop;
    const {barheight,visiblerange,totalrange,handleheight}=this.props.scrollBar2;
    const maxrange=totalrange-visiblerange;


    if(this.props.collect.lrcurl){
      const playlrc=this.props.playlrc.data;
      const playindex=this.props.playindex;
      for(let i=3,len=playlrc.length;i<len;i++){
        if(playlrc[0]===this.props.currenttime){
          newscrolltop=(i-3)*32;
          newhandletop=newscrolltop/maxrange*(barheight-handleheight);
          this.setScrollTop2(newscrolltop,newhandletop)

        }
      }
    }

  }



  render(){
    const {handleShowList,handleCleanList} =this.props;
    let songList=[];
    let handle1Sty={};
    handle1Sty.height=this.props.scrollBar1.handleheight;
    handle1Sty.top=this.props.scrollBar1.handletop;

    this.props.collect.forEach((value,index)=>
    {songList.push(<SongList key={value.id} ref={'li'+index}
                             collect={value} playindex={index}/>)});

    let handle2Sty={};
    handle2Sty.height=this.props.scrollBar2.handleheight;
    handle2Sty.top=this.props.scrollBar2.handletop;


    return(
      <div className={this.props.showlist?'list':'list nodisplay'}  ref={div=>this._list=div}>
        <div className="list-top" style={styleObj3}>
          <div className="list-top-detail">
            <h4>播放列表(<span className="topspan">{this.props.collect.length}</span>)</h4>
            <a href="javascript:" className="addall">
              <span className="icn icn-add1" style={styleObj2}></span>
              收藏全部</a>
            <span className="line"></span>
            <a href="javascript:" className="clean" onClick={()=>handleCleanList()}>
              <span className="icn icn-del" style={styleObj2}></span>
              清除
            </a>
            <p className="song-title"></p>
            <span className="close" style={styleObj2} onClick={(e)=>handleShowList(e)}>关闭</span>
            <span className="close" style={styleObj2} onClick={(e)=>handleShowList(e)}>关闭</span>
          </div>
        </div>
        <div className="list-bd" style={styleObj3}>
          <img className="songbg"></img>
          <div className="msk"></div>
          <div className="song-list" ref={div=>this._songlist=div} onWheel={(e)=>this.onWhell(e)}>
            {this.props.collect.length===0?<NoSong/>:<ul className="songul">{songList}</ul>}
          </div>
          <div className="scrollbar1" ref={div=>this._bar1div=div} onMouseDown={(e)=>{this.onMouseDown1(e)}}>
            <span className="scroll"  style={handle1Sty} ref={span=>this._handle1span =span}
                  onMouseDown={this.onDragHandle}></span>
          </div>
          <div className="error">
            <a href="aaaaaaaa">报错</a>
          </div>
          <div className="msk2"></div>
          <div className="song-lrc" ref={div=>this._songlrc=div} onWheel={(e)=>this.onWheel2(e)}>
            {!this.props.play||this.props.play.lrcurl?<LrcList />:<FindLrc/>}
          </div>
          <Ask/>
          <div className="scrollbar2"  ref={div=>this._bar2div=div} onMouseDown={e=>this.onMouseDown2(e)}>
            <span className="scroll scroll-1" ref={span=>this._handle2span=span}
                  style={handle2Sty} onMouseDown={this.onMouseDownForBar2}></span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {showlist:state.showlist,
    collect:state.collect,
    play:state.play,
    scrollBar1:state.scrollbar1,
    scrollBar2:state.scrollbar2,
    currenttime:state.currenttime,
    playlrc:state.playlrc,
    playindex:state.playindex
  }
}

const mapDispatchToProps=(dispatch)=> {
  return {
    handleShowList: (e) => {
      dispatch(showList());

      e.preventDefault();
      e.stopPropagation()
    },
    mountSetData: (handleheight, handletop, barheight,
                   visiblerange, totalrange, visibleSTop) => {
      dispatch(setData(handleheight, handletop, barheight,
        visiblerange, totalrange, visibleSTop,))
    },
    updateVisibleSTop: (visibleSTop, handletop) => {
      dispatch(updateSTop(visibleSTop, handletop))
    },
    handleCleanList: () => {
      dispatch(cleanList())
    },

    handleSetDate2: (handleheight, handletop, barheight,
                     visiblerange, totalrange, visibleSTop) => {
      dispatch(setData2(handleheight, handletop, barheight,
        visiblerange, totalrange, visibleSTop,))
    },
    updateVisibleSTop2: (visibleSTop, handletop) => {
      dispatch(updateLrcHandleH(visibleSTop, handletop))
    },
    updataDelHandleH:(handleheight,totalrange)=>{
      dispatch(updateHandleH(handleheight,totalrange))
    },
    updataLrcHandleH:(handleheight,totalrange)=>{
      dispatch(updateLrcHandleH(handleheight,totalrange))
    },
    updataScrolltop:(scrolltop,handletop)=>{
      dispatch(updateVisibleSTop2(scrolltop,handletop))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(List)
