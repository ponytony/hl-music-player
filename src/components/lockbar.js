/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/7/31
 * Time: 17:38
 *
 */
import React from 'react';
import icons from '../utils/parseIcon';
import {connect} from 'react-redux';
import {lockPlayer} from '../store/action/actionindex';

class LockBar extends React.Component {
  render() {
    const {handleClick}=this.props;

    let styleObj1={};
    styleObj1.background='url('+icons.playbar+')';
    return (
      <div className="updn" >
        <div className='lock-bg' style={styleObj1}>
          <a className={this.props.locked?'btn':'btn-unlock'} style={styleObj1} onClick={e=>handleClick(e)}></a>
        </div>
        <div className="lock-bg2" style={styleObj1} ></div>
      </div>
    )
  }
}


const mapStateToProps=(state)=>{
  return {locked:state.locked}
}

const mapDispatchToProps=(dispatch)=> {
  return {
    handleClick: (e) => {
      dispatch(lockPlayer())

      e.preventDefault();
      e.stopPropagation()
    }
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(LockBar);//important



/*function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => dispatch(lockPlayer())
  };
}
connect(
  mapDispatchToProps
)(LockBar);
*/





