/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/7/31
 * Time: 17:38
 *
 */
import React from 'react';
import icons from '../utils/parseIcon';

class LockBar extends React.Component {


  render() {
    let styleObj1={};
    styleObj1.background='url('+icons.playbar+')';

    return (
      <div className="updn">
      <div className='lock-bg' style={styleObj1}>
        <a className="btn" href="javascripts:;" style={styleObj1}></a>
      </div>
        <div className="lock-bg2" style={styleObj1}></div>
      </div>
    )
  }
}

export default LockBar;



