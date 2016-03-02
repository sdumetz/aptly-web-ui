
var request = {
  get(path){
    return req("GET",path)
  },
  getJSON(path){
    return this.get(path).then(function(r){return JSON.parse(r.text)})
  },
  delete(path,body){
    return req("DELETE",path);
  }
}
export default request

const req = function(type, path, body){
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open(type, path, true);
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
         if(req.status == 200)
          resolve({text:req.responseText});
         else
          reject(new Error(req.statustext))
      }
    };
    req.send(body||null);
  });
}
