/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/8/4
 * Time: 15:40
 *
 */

export const lockPlayer=()=>{
  return{
    type:'CHANGE_LOCK'
  }
};

export const showList=()=>{
  return {
    type:'SHOW_LIST'
  }
};
export const showVolBar=()=>{
  return {
    type:'SHOW_VOLBAR'
  }
};
export const changeMode=()=>{
  return {
    type:'CHANGE_MODE'
  }
};

export const playPause=()=>{
  return {
    type:'PLAY_PAUSE'
  }
};

export const addPlay=(collect)=>{
  return {
    type:'ADD_PLAY',
    play:collect,//pass
  }
};

export const playIndex=(index)=>{
  return {
    type:'ADD_PLAYINDEX',
    value:index
  }
}

