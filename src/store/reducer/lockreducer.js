/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/8/4
 * Time: 19:48
 *
 */



export const lockReducer=(state,action)=>{
  switch (action.type){
    case 'CHANGE_LOCK':
      //return {locked:true}
     return Object.assign({},state,{locked:!state.locked});

    case 'SHOW_LIST':
      return Object.assign({},state,{showlist:!state.showlist});

    case 'SHOW_VOLBAR':
      return Object.assign({},state,{showvol:!state.showvol});

    default:
      return state
  }
}
