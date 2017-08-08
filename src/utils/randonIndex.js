/**
 * Created by:homelan
 * User: pijiu3302@outloog.com
 * Date: 2017/8/8
 * Time: 19:50
 *
 */

export const randonIndex=(now,high)=>{
  let newindex=Math.floor(Math.random()*high+now);
  if(newindex>(high-1)){
    newindex-=(high)
  }
  return newindex
}
