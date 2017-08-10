import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'
import { persistState } from 'redux-devtools';
import DevTools from './components/DevTools.jsx';

export const initialState ={
  repos:{active:null,items:[],isFetching:false},
  uploads:{}
}
const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function (){
  return createStore(reducers,initialState,enhancer)
}
