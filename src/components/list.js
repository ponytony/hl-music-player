/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/7/31
 * Time: 22:15
 *
 */


import React from 'react';

class NoSong extends React.Component{
  render(){
    return (
      <div className="nocnt">
        <i className="icn icn-face"></i>
          你还没有添加任何歌曲
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
  render(){
    <li>
      <div className="col col1">{playicn}</div>
      <div className="col col2">{songname}</div>
      <div className="col col3">
        <div className="icns">
          <i className="ico icn-del" title="删除" >删除</i>
          <i className="ico ico-dl" title="下载" >下载</i>
          <i className="ico ico-share" title="分享" >分享</i>
          <i className="j-t ico ico-add" title="收藏" >收藏</i>
        </div>
      </div>
      <div className="col col4"><span title={singer}><a href="aaa" hidefocus="true">{singer}</a></span></div>
      <div className="col col5">{songtime}</div>
      <div className="col col6">
        <a href="{gedan}" class="ico ico-src" title="来自歌单">来源</a>
      </div>
    </li>
  }
}

class ScrollBar1 extends React.Component{
  render(){
    return (
      <span className="scrol" hidefocus="true"
            style={"height: 51.3678px; display: block; top: 0px;"}></span>
    )
  }
}

class LrcList extends React.Component{
  render(){
    return (
      <p className="songlrc" ></p><br><p className="songlrc" ></p>
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



class ScrollBar2 extends React.Component{
  render(){
    return (
    <span className="scrol scrol-1" hidefocus="true"
    style={"height: 48.0912px; display: block; top: 0px;"}>
    </span>
    )
  }
}

class List extends React.Component{
  render(){
    return (
      <div className="list">
        <div className="list-top">
          <div className="list-top-detail">
            <h4>播放列表(<span>{songnum}</span>)</h4>
            <a href="javascript:" className="addall">
              <span className="icn icn-add"></span>
              收藏全部</a>
            <span className="line"></span>
            <a href="javascript:" className="clean">
              <span className="icn icn-clean"></span>
              清除
            </a>
            <p className="song-title"></p>
            <span className="close">关闭</span>
          </div>
        </div>
        <div className="list-bd">
          <div className="song-list">{nonlist}{songlist}</div>
          <div className="scrollbar1">
            {scrollbar1}
          </div>
          <div className="song-lrc">
            <div className="song-lrc-list">
              {lrclist}
            </div>
          </div>
          <div className="ask">
            <a className="icn icn-ask"></a>
          </div>
          <div className="scrollbar2">
            {scrollbar2}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
