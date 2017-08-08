/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/8/8
 * Time: 21:48
 *
 */


export const changeCollect=(collect,index)=>{
  collect.forEach((value)=>{
    if(value.playindex===index){
      return value
    }
  });
}

