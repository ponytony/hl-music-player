/**
 * Created by:homelan
 * User: pijiu3302@outlool.com
 * Date: 2017/7/31
 * Time: 19:35
 *
 */

import React from 'react';

class Control extends React.Component{
  render(){

    return (
      <div className="control">
        <div className="btns">
          <a className="prev" title="上一首（ctrl+←">上一首</a>
          <a className="play" title="播放/暂停(p)">播放/暂停</a>
          <a className="next" title="下一首(ctrl+→">下一首</a>
        </div>
        <div className="head">
          <img src="aaaaaaaaaaaaaaaaaaaa">//歌曲图片
            <a href="javascripts:" hidefocus="true" className="mask">
            </a>
          </img>
        </div>
        <div className="playbar">
          <div className="topbar">{songname}</div>
          <div className="play-bar">
            <div className="time-bar">
              <div className="rdy"></div>//不知道 应该是控制回调长度的
              <div className="cur">//红条
                <span className="btn"><i></i></span>
              </div>
            </div>
            <span className="total-time">
              <em className="playing-time"></em>
            </span>
          </div>
        </div>
        <div className="oper">
          <a href="javascripts:" hidefocus="true" className="icn icn-add" title="收藏">收藏</a>
          <a href="javascripts:" hidefocus="true" className="icn icn-share" title="分享">分享</a>
        </div>
        <div className="ctrl">
          <div className="vol-cont">
            <div className="v-container"></div>
            <div className="v-bar">
              <div className="v-all"></div>
              <span className="volumn-cir"></span>
            </div>
          </div>
          <a href="javascripts:" hidefocus="true" className="icn icn-vol" title="音量"></a>
          <a href="javascripts:" hidefocus="true" className="mode" title="模式"></a>
          <span className="add">
            <span className="tip">已经添加到播放列表</span>  //平时隐藏
            <a href="javascripts:" hidefocus="true" title="播放列表" className="icn icn-list"></a>
          </span>
          <div className="tip tip-1">循环</div>   //平时隐藏

        </div>
      </div>
    )

  }
}
