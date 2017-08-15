/**
 * Created by:homelan
 * User: pijiu3302@outloog.com
 * Date: 2017/8/9
 * Time: 14:44
 *
 */



//计算滚动条的height

export const calculateHandleHeight=(barheight,visiblerange,totalrange)=>{
  let newdata;
  if(totalrange<=visiblerange){
    newdata=barheight
  }else{
    newdata=barheight/(totalrange/visiblerange)
  }
  return newdata
}
export const calculateNewHandlePos=(mousepos,handleheigth,barheight)=>{
  let newpos;
  if(mousepos<(handleheigth/2)){
    newpos=0
  }else if(mousepos>barheight-handleheigth/2){
    newpos=barheight-handleheigth
  }else{
    newpos=mousepos-handleheigth/2
  }
  return newpos
}

export const calculateScrollTop=(barheight,handletop,handleheigth,visiblerange,totalrange)=>{
  let newpos;
  if(handletop===0){
    newpos=0
  }else(newpos=handletop/(barheight-handleheigth)*(totalrange-visiblerange))
  return newpos
}


