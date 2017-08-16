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
  volumn:30,//循环模式
  collect:[],//收藏夹
  play:{},//正在播放
  pause:true,
  playindex:-1,
  playindex1:-1,//为了在playindex切换时更新列表的scrolltop
  playtime:0,
  totaltime:0,
  mode:'circle' , //音量
  currenttime:0,
  duration:0,
  buffered:0,
  playlrc:{},
  scrollbar1:{
    handleheight:0, //滚动条长度
    handletop:0,//gaodu
    barheight:0,//bar的总厂
    visiblerange:0,
    totalrange:0,
    visibleSTop:0//important control content
  },
  scrollbar2:{
    handleheight:0, //滚动条长度
    handletop:0,//gaodu
    barheight:0,//bar的总厂
    visiblerange:0,
    totalrange:0,
    visibleSTop:0//important control content
  }
}
export default initState

//play:[id,playindex,songname,artists,album,mp3Url,img,playing(bool),ptime,lrcurl]

