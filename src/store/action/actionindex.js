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
    play:collect
  }
};
/*
export const playIndex=(index,id)=>{
  return {
    type:'ADD_PLAYINDEX',
    value:index,
    id:id
  }
};
*/
export const prev=()=>{
  return {
    type:'PREV'
  }
};

export const next=()=>{
  return {
    type:'NEXT'
  }
};

export const playButton=()=>{
  return{
    type:'PLAY_BUTTON'
  }
};

export const setData=(handleheight, handletop, barheight,
                      visiblerange, totalrange, visibleSTop, visibleBar)=>{
  return{
    type:'SET_DATA',
    data:{
      handleheight:handleheight,
      handletop:handletop,
      barheight:barheight,
      visiblerange:visiblerange,
      totalrange:totalrange,
      visibleSTop:visibleSTop,
      visibleBar:visibleBar
    }
  }
}

