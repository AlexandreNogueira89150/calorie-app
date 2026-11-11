(function(root){
  'use strict';
  const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
  // Apply only local changes since the last observed server version.
  function merge(base,local,remote){
    if(equal(base,local))return remote;
    if(local===undefined)return undefined;
    if(remote===undefined&&base!==undefined)return local;
    if(Array.isArray(local)&&Array.isArray(remote)){
      const previous=Array.isArray(base)?base:[];
      const all=[...previous,...local,...remote];
      const field=all.every(x=>object(x)&&x.id!=null)?'id':all.every(x=>object(x)&&x.date!=null)?'date':null;
      if(field&&[previous,local,remote].every(a=>new Set(a.map(x=>String(x[field]))).size===a.length)){
        const map=a=>new Map(a.map(x=>[String(x[field]),x]));
        const b=map(previous),l=map(local),r=map(remote),result=[];
        const order=equal(previous.map(x=>x[field]),local.map(x=>x[field]))?[...r.keys(),...l.keys()]:[...l.keys(),...r.keys()];
        for(const id of new Set(order)){
          const value=merge(b.get(id),l.get(id),r.get(id));
          if(value!==undefined)result.push(value);
        }
        return result;
      }
    }
    if(object(local)&&(remote===undefined||object(remote))){
      const b=object(base)?base:{},r=remote||{},out={};
      for(const key of new Set([...Object.keys(b),...Object.keys(local),...Object.keys(r)])){
        if(['__proto__','constructor','prototype'].includes(key))continue;
        const value=merge(b[key],local[key],r[key]);
        if(value!==undefined)out[key]=value;
      }
      return out;
    }
    return local;
  }
  root.CalorieSyncMerge={merge,equal};
  if(typeof module!=='undefined')module.exports=root.CalorieSyncMerge;
})(globalThis);
