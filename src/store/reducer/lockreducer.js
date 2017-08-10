/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/8/4
 * Time: 19:48
 *
 */

import cloneDeep from 'lodash/cloneDeep';
import {randomIndex} from 'utils/randonIndex'




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
      return Object.assign({},state,{play:action.play});
/*
    case 'ADD_PLAYINDEX':
      let _state=cloneDeep(state.collect);
      _state.forEach((value,index)=>{
        if(value.id===action.id){
          _state[index].playindex=action.value
        }
      });

      return Object.assign({},state,{collect:_state});
  */
    case 'PREV':
      let newcollect;
      let playindex=state.playindex;
      if(playindex===-1||state.mode==='one'){
        return Object.assign({},state)
      }
      if(state.mode==='circle'){
        playindex-=1;
        if(playindex<0){
          playindex=state.collect.length-1
        }
      }else if(state.mode==='shuffle'){
        playindex=randomIndex(playindex,state.collect.length)
      }
      newcollect=state.collect[playindex]

      return Object.assign({},state,{playindex:playindex,play:newcollect});

    case 'NEXT':
      playindex=state.playindex;
      if(playindex===-1||state.mode==='one'){
        return Object.assign({},state)
      }
      if(state.mode==='circle'){
        playindex+=1;
        if(playindex>state.collect.length){
          playindex=0
        }
      }else if(state.mode==='shuffle'){
        playindex=randomIndex(playindex,state.collect.length)

      }
      newcollect=state.collect[playindex]

      return Object.assign({},state,{playindex:playindex,play:newcollect});

    case 'PLAY_BUTTON':
      if(state.playindex===-1){
        playindex=0;
        newcollect=state.collect[playindex]
      }
      else{
        playindex=state.playindex;
        newcollect=state.collect[playindex]
      }
      return Object.assign({},state,{pause:!state.pause,playindex:playindex,play:newcollect});

    case 'SET_DATA':
      return Object.assign({},state,{scrollbar1:action.data});

    case 'UPDATE_STOP':
      let _state=cloneDeep(state.scrollbar1);
      _state.visibleSTop=action.data;
      _state.handletop=action.handletop;

      return Object.assign({},state,{scrollbar1:_state});

    case 'SET_VOLUMN':
      return Object.assign({},state,{volumn:action.data});


    default:
      return state
  }
}


