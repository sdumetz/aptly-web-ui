

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


function startUpload(file){
  return Object.assign({type:'UPLOAD_START'},file)
}

function updateUpload(name,progress){
  return {type:'UPLOAD_PROGRESS',name:file.name,progress:progress}
}

export function toggleUpload(name){
  return {type:'UPLOAD_TOGGLE',name}
}

export function upload(file){
  return (dispatch,getState)=>{
    var state = getState().uploads;
    var formData = new FormData();
    var req = new XMLHttpRequest();
    if (state[file.name]){
      return console.warn("Upload Error : file already exists" )
    }
    req.onprogress = (evt)=>{
      if (evt.lengthComputable) {
        return dispatch(updateUpload(file.name,Math.floor(evt.loaded / evt.total)*100));
      }
    }
    req.open('POST', '/api/files/upload', true);
    req.onreadystatechange = (aEvt)=> {
      if (req.readyState == 4){
        if(req.status == 200){
          console.log("upload of "+file.name+" complete")
          return dispatch(updateUpload(file.name,true))
        }else{
          console.warn(`Upload Error ${req.status} : ${req.statusText}`)
          return dispatch(updateUpload(file.name,false))
        }
      }
    };
    dispatch(startUpload(file));
    formData.append("file", file);
    req.send(formData);
  }
}

export function importUploadedFiles(){
  return dispatch => {
    return fetch("/api/files/upload")
      .then(response => response.json())
      .then((files) => {
        return files.map((name)=>{
          return dispatch(startUpload({name:name,size:0,progress:true}));
        })
      }).catch((e)=>{
        console.warn("Can't get previous uploads : ",e)
      })
  }
}
