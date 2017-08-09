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


import icons from '../utils/parseIcon';
import {showList,playIndex,addPlay,setData} from 'action/actionindex'
import {isEventOnNode,calculateHandle} from 'utils/scrollBar'

let styleObj2={};
styleObj2.background='url('+icons.playlist+')';
let styleObj3={};
styleObj3.background='url('+icons.playlist_bg+')';



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
/*
it is a test,i want to konw how to setstate in mount
  componentDidMount(){
    const {addIndex}=this.props;
    const playindex=this.props.playindex;
    const id=this.props.collect.id;
    (function submit(playindex,id){
      addIndex(playindex,id)
    })(playindex,id)

  }
*/
  render(){
    const {addPlaying}=this.props;
    const collect=this.props.collect;
    return(
    <li onClick={(e)=>{addPlaying(e,collect)}}>
      <div className="col col1">

      </div>
      <div className="col col2">
        {this.props.collect.songname}
      </div>
      <div className="col col3">
        <div className="icns">
          <i className="icn icn-del" title="删除" style={styleObj2}>删除</i>
          <i className="icn icn-dl" title="下载" style={styleObj2}>下载</i>
          <i className="icn icn-share1" title="分享" style={styleObj2}>分享</i>
          <i className="j-t icn icn-add2" title="收藏" style={styleObj2}>收藏</i>
        </div>
      </div>
      <div className="col col4"><span>
        <a href="http://music.163.com/#/artist?id=93183" >{this.props.collect.artists}</a></span>
      </div>
      <div className="col col5"></div>
      <div className="col col6">
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
    addPlaying:(e)=>{
      dispatch(addPlay(ownprops.collect));

      e.preventDefault();
      e.stopPropagation()
    }
  }
};


SongList=connect(mapStateToSongList,mapDispatchToSongList)(SongList);









class LrcList extends React.Component{
  render(){
    return (
      <p className="songlrc" ></p>

    )
  }
}

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
      <div className="playicn"></div>
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

  componentDidMount(){
    //scrollbar1
    const {mountSetData}=this.props;
    //content
    const visibleContent=this.getElementNode(this._songlist);
    const visibleRange=visibleContent.clientHeight;
    const totalRange=visibleContent.scrollHeight;
    const visibleSTop=visibleContent.scrollTop;

    //bar 500px+
    const barContent=this.getElementNode(this._bar1div);
    const visibleBar=barContent.clientHeight;
     //handle
    const handleContent=this.getElementNode(this._handle1span);
    const handleTop=handleContent.offsetTop;
    const handleHeight=calculateHandle(visibleRange,totalRange);

    //自执行函数，render后自行提交到store
    (function submit(handleheight, handletop, barheight,
              visiblerange, totalrange, visibleSTop, visibleBar){
      mountSetData(handleheight, handletop, barheight,
        visiblerange, totalrange, visibleSTop, visibleBar)
    })(handleHeight, handleTop, visibleBar,
      visibleRange, totalRange, visibleSTop, visibleBar)
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
    event.clientX<range.height+range.top)
  }

  onMouseDown1(e){
    if(!this.props.scrollbar1.handleheight&&this.isOnNode(e,this._bar1div)&&!this.isOnNode(e,this._handle1span){

    })
  }

  setScrollTop(value,ele){
    let node=findDOMNode(ele);
    node.scrollTop=value}




  render(){
    const {handleShowList} =this.props;
    let songList=[];
    let handle1Sty={};
    handle1Sty=this.props.scrollBar1.handleheight;

    this.props.collect.forEach((value,index)=>
    {songList.push(<SongList key={value.id} ref={'li'+index}
                             collect={value} playindex={index}/>)});

    return(
      <div className={this.props.showlist?'list':'list nodisplay'}>
        <div className="list-top" style={styleObj3}>
          <div className="list-top-detail">
            <h4>播放列表(<span className="topspan">{this.props.collect.length}</span>)</h4>
            <a href="javascript:" className="addall">
              <span className="icn icn-add1" style={styleObj2}></span>
              收藏全部</a>
            <span className="line"></span>
            <a href="javascript:" className="clean">
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
          <div className="song-list" ref={div=>this._songlist=div}>
            <ul className="songul">{songList}</ul>
          </div>
          <div className="scrollbar1" ref={div=>this._bar1div=div}>
            <span className="scroll"  style={handle1Sty} ref={span=>this._handle1span =span}></span>
          </div>
          <div className="error">
            <a href="aaaaaaaa">报错</a>
          </div>
          <div className="msk2"></div>
          <div className="song-lrc" ref={div=>this._songlrc=div}>
            {!this.props.play||this.props.play.lrcurl?<LrcList/>:<FindLrc/>}
          </div>
          <Ask/>
          <div className="scrollbar2"  ref={div=>this._bar2div=div}>
            <span className="scroll scroll-1" ref={span=>this._handle2span=span}></span>
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
    scrollBar1:state.scrollbar1
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    handleShowList:(e)=>{
      dispatch(showList());

      e.preventDefault();
      e.stopPropagation()
    },
    mountSetData:(handleheight, handletop, barheight,
                  visiblerange, totalrange, visibleSTop, visibleBar)=>{
      dispatch(setData(handleheight, handletop, barheight,
        visiblerange, totalrange, visibleSTop, visibleBar))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(List)
