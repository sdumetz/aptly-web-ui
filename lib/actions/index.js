

function requestRepos(){
  return {type:'REQUEST_REPOS'}
}
function receiveRepos(repos){
  return {type:"RECEIVE_REPOS",items:repos}
}
function fetchRepos() {
  return dispatch => {
    dispatch(requestRepos())
    return fetch(`/api/repos`)
      .then(response => response.json())
      .then(json => dispatch(receiveRepos(json)))
  }
}

export function fetchReposIfNeeded(){
  return (dispatch, getState) => {
    var state = getState().repos
    if ((!Array.isArray(state.items) || state.items.length == 0) && !state.isFetching) {
      console.log("repos should be fetched : ",state);
      return dispatch(fetchRepos())
    }
  }
}

export function setActive(index){
  return {type:'SET_ACTIVE',index:index}
}
