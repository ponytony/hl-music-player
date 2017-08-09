/**
 * Created by:homelan
 * User: pijiu3302@outloog.com
 * Date: 2017/8/4
 * Time: 22:37
 *
 */
const initState={
  locked:false,//bu 锁住player
  showlist:false,//不锁住list
  showvol:false,//隐藏音量模板
  volumn:'50%',//循环模式
  collect:[],//收藏夹
  play:{},//正在播放
  pause:true,
  playindex:-1,
  mode:'circle' , //音量
  scrollbar1:{
    handleheight:0, //滚动条长度
    handletop:0,//gaodu
    barheight:0,//bar的总厂
    visiblerange:0,
    totalrange:0,
    visibleSTop:0,
    visibleBar:0
  }
}
export default initState

//play:[id,playindex,songname,artists,album,mp3Url,img,playing(bool),ptime,lrcurl]

