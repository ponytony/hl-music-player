/**
 * Created by:homelan
 * User: pijiu3302@outlook.com
 * Date: 2017/8/7
 * Time: 16:16
 *
 */

export const parseLrc=(lrcs)=>{
  const lyric = lrcs.split('\n');
  let lrc = [];
  const lyricLen = lyric.length;
  for (let i = 0; i < lyricLen; i++) {
    // match lrc time
    const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g);
    // match lrc text
    const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '');

    if (lrcTimes) {
      const timeLen = lrcTimes.length;
      for (let j = 0; j < timeLen; j++) {
        const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j]);
        const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2])
        lrc.push([lrcTime, lrcText]);
      }
    }
  }
  lrc.sort((a, b) => a[0] - b[0]);
  return lrc;
};


