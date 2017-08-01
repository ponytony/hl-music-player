/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/7/31
 * Time: 22:15
 *
 */


import React from 'react';

class List extends React.Component{
  render(){
    return (
      <div className="list">
        <div className="list-top">
          <div className="list-top-detail">
            <h4>播放列表(<span>0???</span>)</h4>
            <a href="javascript:" className="addall">
              <span className="ico ico-add"></span>
              收藏全部</a>
            <span className="line"></span>
            <a href="javascript:" className="clean">
              <span className="ico ico-clean"></span>
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
            <a className="ico ico-ask"></a>
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
