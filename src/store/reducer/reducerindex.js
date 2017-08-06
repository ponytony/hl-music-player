/**
 * Created by:homelan
 * User: pijiu3302@outloog.com
 * Date: 2017/8/4
 * Time: 20:08
 *
 */

import {combineReducers} from 'redux';
import {lockReducer} from './lockreducer';

export const playerReducer=combineReducers({
  lockReducer
});


