import { combineReducers } from 'redux'
import crudReducer from './crudReducer'
import dndReducer from './dndReducer'
/* import counter2 from './counter2'
import counter from './counter'
import codedojo from './codedojo'
import friendlist from './friendlist' */

export default combineReducers({
  crudReducer,
  dndReducer
})