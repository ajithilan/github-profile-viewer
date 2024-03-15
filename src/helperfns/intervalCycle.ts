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

export function intervalCycle(param: params, additionalParam: AddtParam){
    const {dispatch, timer, inc} = param;
    const {method, type, selector, keys, subkey = [], repoDetail, firstBatch} = additionalParam;
    const typeTruthy = type === 'main';

    for (let key of (typeTruthy ? keys : subkey)){
      if(!firstBatch && !repoDetail){
        if(type === 'repo' && !(key === 'name' || key === 'language')) continue
      }
      const text = !(typeof keys === 'string') ?  selector[key] : selector[keys][key];
      const loopCount = firstBatch ? 1 : text?.toString().length;
      let len: number = typeof text === 'string' ? text.length : text?.toString().length;
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
              scrollProfile({dispatch, method : updateUserRandomValue, timer, finalIteration});
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
          if(!(text === undefined)){
            function loopContainer(key1:string, key2:string|string[]){
              for(let i=0;i<loopCount;i++){
                dispatchLoop(param,{key: key1, selectortxt: text, method, len, subkey: key2, firstBatch});
              }
            }
            typeTruthy ? loopContainer(key, keys) : (typeof keys === 'string' && loopContainer(keys, key));
          }
        }
      }
      inc.current = 0;
    }
  }