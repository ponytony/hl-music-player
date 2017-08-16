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
      return Object.assign({},state,{play:action.play},{playindex:action.index});
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
        if(playindex>=state.collect.length){
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

    case 'SET_DATA2':
      return Object.assign({},state,{scrollbar2:action.data});

    case 'UPDATE_STOP':
      let _state=cloneDeep(state.scrollbar1);
      _state.visibleSTop=action.data;
      _state.handletop=action.handletop;

      return Object.assign({},state,{scrollbar1:_state});

    case 'SET_VOLUMN':
      if(action.data>=100||action.data<=0){
        return state
      }


      return Object.assign({},state,{volumn:action.data});

    case 'GET_DURATION':


      return Object.assign({},state,{duration:action.data});

    case 'GET_CURRENTTIME':


      return Object.assign({},state,{currenttime:action.data});

    case 'GET_BUFFERED':

      return Object.assign({},state,{buffered:action.data});

    case 'SET_CURRENTTIME':
      return Object.assign({},state,{currenttime:action.data});

    case 'DEL_ACOLLECT':
      _state=cloneDeep(state.collect);
      _state.splice(action.index,1);
      let index=action.index
      if(state.playindex===-1){
        newcollect={};
        playindex=-1;
      }
      else if(_state[state.playindex]){
        newcollect=_state[state.playindex]
        playindex=state.playindex
      }else if(!_state[index]&&_state[0]&&state.playindex===index){
        newcollect=_state[0]
        playindex=0
      } else{
        newcollect={}
        playindex=-1
      }


      return Object.assign({},state,{collect:_state,playindex:playindex,play:newcollect});

    case'CLEAN_LIST':
      return Object.assign({},state,{collect:[],playindex:-1,play:{},duration:0,buffered:0,currenttime:0,playlrc:[]});

    case 'SET_LRC':
      return Object.assign({},state,{playlrc:action.data});

    case 'UPDATE_HANDLEh':

      _state=cloneDeep(state.scrollbar1);
      _state.totalrange=action.totalrange;
      _state.handleheight=action.handleheight;
      return Object.assign({},state,{scrollbar1:_state});

    case 'UPDATE_LRCHANDLEH':
      _state=cloneDeep(state.scrollbar2);
      _state.totalrange=action.totalrange;
      _state.handleheight=action.handleheight;
      return Object.assign({},state,{scrollbar2:_state});

    case 'UPDATE_VISIBLESTOP2':
      _state=cloneDeep(state.scrollbar2);
      _state.visibleSTop=action.scrolltop;
      _state.handletop=action.handletop;
      return Object.assign({},state,{scrollbar2:_state});

    case 'SET_SCROLLHEIGHT':
      _state=cloneDeep(state.scrollbar2);
      _state.totalrange=action.scrollheight;
      return Object.assign({},state,{scrollbar2:_state});

    case 'SET_PLAYINDEX1':

      return Object.assign({},state,{playindex1:action.playindex1});





    default:
      return state
  }
}


