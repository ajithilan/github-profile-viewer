//@ts-ignore
import {updateRepoInitialValue, updateUserRandomValue} from "../ReduxStore/Userslice";
import { scrollProfile } from "./scrollProfile";
import { dispatchLoop } from "./dispatchloop";
import emptyprofile from "../assets/emptyprofile.jpg"
import { params } from "../types";
import { Action } from "redux";

interface AddtParam {
  method: (value:any)=>Action;
  type: string;
  selector: {[key:string]:any};
  keys: string|string[];
  subkey?: string[]|[];
  repoDetail: boolean;
  firstBatch: boolean;
}

export async function intervalCycle(param: params, additionalParam: AddtParam){
    const {dispatch, timer, inc} = param;
    const {method, type, selector, keys, subkey = [], repoDetail, firstBatch} = additionalParam;
    const typeTruthy = type === 'main';

    return new Promise<void>(async (intervalResolve)=>{
      for (let key of (typeTruthy ? keys : subkey)){
        if(!firstBatch && !repoDetail){
          if(type === 'repo' && !(key === 'name' || key === 'language')) continue
        }
        const text = !(typeof keys === 'string') ?  selector[key] : selector[keys][key];
        const loopCount = firstBatch ? 1 : text?.toString().length;
        let len = typeof text === 'string' ? text.length : text?.toString().length;
        switch(key){
          case null : {
            !typeTruthy && dispatchLoop(param,{key,selectortxt:'-', method,len:0,subkey:'', firstBatch});
            break;
          }
          case 'avatar_url' : {
            if(firstBatch) dispatch(method(['avatar_url', '', emptyprofile]))
            else{
              for(let i=0; i<16;i++){
                const finalIteration: string|null = i === 15 ? selector[key] : null;
                setTimeout(() => dispatch(method(['avatar_url', '', finalIteration ?? scrollProfile()])), 100 + timer.current);
                if(i !== 15){
                  timer.current += 100;
                }else{
                  setTimeout(() => {
                    timer.current = 0;
                  }, timer.current + 150);
                }
              }
            }
            break;
          }
          case 'node_id' : {
            dispatch(method([keys, key, keys]));
            break;
          }
          case 'semiHypered' : {
            dispatch(updateRepoInitialValue([keys, 'semiHypered']));
            break;
          }
          case 'hypered' : {
            repoDetail && dispatch(updateRepoInitialValue([keys, 'hypered']));
            break;
          }
          default : {
            if(text !== undefined){
              async function loopContainer(key1:string, key2:string|string[]){
                return new Promise<void>(async res=>{
                  for(let i=0;i<loopCount;i++){
                    await dispatchLoop(param,{key: key1, selectortxt: text, method, len, subkey: key2, firstBatch});
                  }
                  res();
                });
              }
              if(typeTruthy) await loopContainer(key, keys)
              else{
                if(typeof keys === 'string') await loopContainer(keys, key);
              }
            }
          }
        }
        inc.current = 0;
      }
      intervalResolve();
    });
  }