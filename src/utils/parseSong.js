/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/8/7
 * Time: 9:43
 *
 */

const songurl=require('../lrc/songurl.json')


/*
let lrcurl=((obj)=>{
  for(let k in obj){
    obj[k].lrcurl=require('../lrc/'+obj[k].songname+'.lrc');
}
})(songurl);
*/
//因为不知道通过node获取文件架所有的文件名会不会有后遗症，比如说不能使用github的展示功能，就用了这种
//折中的方法，反正也没有复用的可能
const lrclist=['Civil War','Don\'t Cry (Original)','Estranged','Patience','Used To Love Her','Yesterdays']
let songurl1=[];
let lrcurl=((obj)=>{
  for(let k in obj){
    let temp=obj[k].songname.replace(/.lrc/,'');

    if(lrclist.indexOf(temp)!==-1){
      let key=k;
      obj[k].lrcurl=require('../lrc/'+obj[k].songname+'.lrc');
    }
    songurl1.push(obj[k])
  }
})(songurl);

/*
let lrcurl=(songurl)=>{
  songurl.forEach((key,value)=>{
    let newurl;
    try{
      newurl=require('../lrc/'+value.songname+'lrc')
    }catch(e) {
      console.log('don\'t find'+value.songname+'in lrc directory')
    }
    if(newurl){
      value.lrcurl=newurl
    }
  });
  return songurl
}
*/




export default songurl1
