'use strict';

//return a path from (component,filename)
export default function getPackagePath(c, f){
  return `/pool/${c}/${f[0].toLowerCase()}/${f.split("_")[0].toLowerCase()}/${f}`;
}
