//@ts-ignore
import { updateUserRandomValue, updateRepoRandomValue } from "../ReduxStore/Userslice";
import { intervalCycle } from "./intervalCycle";
import { params } from "../types";

export function initialDispatch(param: params, firstBatch:boolean, newRepo=false){
    const { userselector, reposelector, timer } = param;

    function initialUserDispatch(){
      const userkeystopass = Object.keys(userselector);
      const AddtParam = {
        method: updateUserRandomValue,
        type: 'main',
        selector: userselector,
        keys: userkeystopass,
        subkey: [],
        repoDetail: false,
        firstBatch
      };
      intervalCycle(param, AddtParam);
    }
    !newRepo && initialUserDispatch();
    Object.keys(reposelector).map((key)=>{
      if(!reposelector[key].semiHypered){
        const repokeystopass = Object.keys(reposelector[key]);
        const AddtParam = {
          method: updateRepoRandomValue,
          type: 'repo',
          selector: reposelector,
          keys: key,
          subkey: repokeystopass,
          repoDetail: false,
          firstBatch
        };
        intervalCycle(param, AddtParam);
      }
    })
    !firstBatch && setTimeout(()=>timer.current = 0, timer.current);
  }