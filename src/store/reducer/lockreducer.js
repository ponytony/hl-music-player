/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/8/4
 * Time: 19:48
 *
 */

import cloneDeep from 'lodash/cloneDeep'

export const lockReducer=(state,action)=>{
  switch (action.type){
    case 'CHANGE_LOCK':
      //return {locked:true}
     return Object.assign({},state,{locked:!state.locked});

    case 'SHOW_LIST':
      return Object.assign({},state,{showlist:!state.showlist});

    case 'SHOW_VOLBAR':
      return Object.assign({},state,{showvol:!state.showvol});

    case 'CHANGE_MODE':
      let newmode;
      if(state.mode==='circle'){
        newmode='shuffle'
      }else if(state.mode==='shuffle'){
        newmode='one'
      }else if(state.mode==='one'){
        newmode='circle'
      }
      return Object.assign({},state,{mode:newmode});
    /*
    case 'PLAY_PAUSE':
      return Object.assign({},state,{showvol:!state.showvol});
*/  case 'ADD_PLAY':
      return Object.assign({},state,{mode:newmode});

    case 'ADD_PLAYINDEX':
      let _state=cloneDeep(state);
      _state.collect.playindex=action.value;

      return _state;

    default:
      return state
  }
}
