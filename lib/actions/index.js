
function updateRepo(repo){
  return fetch(`/api/publish/:./${repo}`,{method:"PUT",body:JSON.stringify({ForceOverwrite:true}),headers: {
    "Content-type": "application/json"
  }});
}

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

export function setActive(item){
  return {type:'SET_ACTIVE',item:item}
}


function startUpload(file){
  console.log("START UPLOAD : ",file);
  return {type:'UPLOAD_START',name:file.name,size:file.size,progress:file.progress,active:file.active};
}

function updateUpload(name,progress){
  return {type:'UPLOAD_PROGRESS',name:name,progress:progress}
}
function removeUpload(name){
  return {type:'UPLOAD_REMOVE',name:name}
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
        if(files.length == 1 && files[0].error){
          return [];
        }
        return files.map((name)=>{
          return dispatch(startUpload({name:name,size:0,progress:true}));
        })
      }).catch((e)=>{
        console.warn("Can't get previous uploads : ",e)
      })
  }
}
//Target can be a repo's index or a repo Object with a Name attribute
export function sendSelectedFiles(target){
  return (dispatch, getState) => {
    const state = getState()
    const activeRepo = (typeof target == "number")?state.repos.items[target].Name:target.Name;
    const activeFiles = Object.keys(state.uploads).filter(function(filename){
      return state.uploads[filename].active;
    })
    Promise.all(activeFiles.map((file)=>{
      return fetch(`/api/repos/${activeRepo}/file/upload/${file}`,{method:"POST"}).then(res=>res.json()).then((json)=>{
        if(json.FailedFiles.length >0){
          console.log("Some failed files:",json.Report);
          return null;
        }
        return file;
      }).catch((e)=>{
        console.warn("Failed to push packages:", e);
      }).then(function(r){
        return updateRepo(activeRepo).catch(function(e){
          console.warn("error updating repo",activeRepo,e);
          return;
        }).then(function(){
          return r;
        });
      })
    })).then((files)=>{
      return files.map((file)=>{
        return dispatch(removeUpload(file))
      })
    });

  }
}
export function removeSelectedFiles(){
  return (dispatch, getState) => {
    const state = getState()
    const activeFiles = Object.keys(state.uploads).filter(function(filename){
      return state.uploads[filename].active;
    })
    Promise.all(activeFiles.map((file)=>{
      return fetch(`/api/files/upload/${file}`,{method:"DELETE"}).then(res=>res.json()).then((json)=>{
        console.log(json);
        return file;
      }).catch((e)=>{
        console.warn(e);
      })
    })).then((files)=>{
      return files.map((file)=>{
        return dispatch(removeUpload(file))
      })
    });

  }
}
