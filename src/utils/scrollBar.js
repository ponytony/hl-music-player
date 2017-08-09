/**
 * Created by:homelan
 * User: pijiu3302@outloog.com
 * Date: 2017/8/9
 * Time: 14:44
 *
 */



//计算滚动条的height
export const calculateHandle=(visible,total)=>{
  let temp=total/visible;
  if(visible<=total){
    temp=1
  }
  return temp
}

