import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

export const initialState ={
  repos:{active:-1,items:[],isFetching:false},
  uploads:{}
}

export default function (){
  return createStore(reducers,initialState,applyMiddleware(thunkMiddleware))
}
