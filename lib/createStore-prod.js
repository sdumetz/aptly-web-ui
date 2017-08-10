import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

export const initialState ={
  repos:{active:null,items:[],isFetching:false},
  uploads:{}
}

export default function (){
  return createStore(reducers,initialState,applyMiddleware(thunkMiddleware))
}
