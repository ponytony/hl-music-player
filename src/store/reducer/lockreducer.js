/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/8/4
 * Time: 19:48
 *
 */

import cloneDeep from 'lodash/cloneDeep';
import {randomIndex} from 'utils/randonIndex'
//import {changeCollect} from 'utils/changeCollect'

const changeCollect=(collect,index)=>{
  collect.forEach((value)=>{
    if(value.playindex===index){
      return value
    }
  });
}

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

    case 'ADD_PLAYINDEX':
      let _state=cloneDeep(state.collect);
      _state.forEach((value,index)=>{
        if(value.id===action.id){
          _state[index].playindex=action.value
        }
      });

      return Object.assign({},state,{collect:_state});

    case 'prev':
      let newcollect;
      let playindex=action.index;
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
    //  newcollect=changeCollect(state.collect,playindex)
      return Object.assign({},state,{playindex:playindex});

    case 'next':
      playindex=action.index;
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
    //  newcollect=changeCollect(state.collect,playindex)

      return Object.assign({},state,{playindex:playindex});

    case 'PLAY_BUTTON':
      if(state.playindex===-1){
        playindex=0;

        newcollect=changeCollect(state.collect,playindex);
        return Object.assign({},state,{playindex:playindex,pause:!state.pause})
      }
      newcollect=changeCollect(state.collect,playindex)

      debugger;

      return Object.assign({},state,{pause:!state.pause,play:newcollect});


    default:
      return state
  }
}


