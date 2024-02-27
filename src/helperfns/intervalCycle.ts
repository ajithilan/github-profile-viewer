import {updateRepoInitialValue, updateUserRandomValue} from "../ReduxStore/Userslice";
import { scrollProfile } from "./scrollProfile";
import { dispatchLoop } from "./dispatchloop";
import emptyprofile from "../assets/emptyprofile.jpg"


export function intervalCycle(param, method, type, selector, keys, subkey = [], repoDetail, firstBatch){
    const {dispatch, timer, inc} = param;
    const typeTruthy = type === 'main';

    for (let key of (typeTruthy ? keys : subkey)){
      if(!firstBatch && !repoDetail){
        if(type === 'repo' && !(key === 'name' || key === 'language')) continue
      }
      const text = typeTruthy ? selector[key] : selector[keys][key];
      const loopCount = firstBatch ? 1 : text?.toString().length;
      let len = typeof text === 'string' ? text.length : text?.toString().length;
      switch(key){
        case null : {
          !typeTruthy && dispatchLoop(param, key, '-', method, 0,'', firstBatch);
          break;
        }
        case 'avatar_url' : {
          if(firstBatch) dispatch(method(['avatar_url', '', emptyprofile]))
          else{
            for(let i=0; i<10;i++){
              const finalIteration = i === 9 ? selector[key] : null;
              scrollProfile(dispatch, updateUserRandomValue, timer, finalIteration);
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
            function loopContainer(key1, key2){
              for(let i=0;i<loopCount;i++){
                dispatchLoop(param, key1, text, method, len, key2, firstBatch);
              }
            }
            typeTruthy ? loopContainer(key, keys) : loopContainer(keys, key);
          }
        }
      }
      inc.current = 0;
    }
  }