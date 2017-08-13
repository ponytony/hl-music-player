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

export const addPlay=(collect,key)=>{
  return {
    type:'ADD_PLAY',
    play:collect,
    index:key
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
                      visiblerange, totalrange, visibleSTop)=>{
  return{
    type:'SET_DATA',
    data:{
      handleheight:handleheight,
      handletop:handletop,
      barheight:barheight,
      visiblerange:visiblerange,
      totalrange:totalrange,
      visibleSTop:visibleSTop
    }
  }
}

export const updateSTop=(newdata,handletop)=>{
  return {
    type:'UPDATE_STOP',
    data:newdata,
    handletop:handletop
  }
}

export const setVolumn=(data)=>{
  return {
    type:'SET_VOLUMN',
    data
  }
}

export const getDuration=(data)=>{
  return {
    type: 'GET_DURATION',
    data:data
  }
}
export const getCurrentTime=(data)=>{
  return {
    type: 'GET_CURRENTTIME',
    data:data
  }
}

export  const getBuffered=(data)=>{
  return {
    type:'GET_BUFFERED',
    data:data
  }
}

export const setCurrentTime=(data)=>{
  return{
    type:'SET_CURRENTTIME',
    data:data
  }
}

