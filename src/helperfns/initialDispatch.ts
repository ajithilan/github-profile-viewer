//@ts-ignore
import { updateUserRandomValue, updateRepoRandomValue } from "../ReduxStore/Userslice";
import { intervalCycle } from "./intervalCycle";
import { params } from "../types";

export async function initialDispatch(param: params, firstBatch:boolean, newRepo=false){
    const {
      reposelector,
      timer,
      setRepoBtnDisabled,
      setRepoBtnText,
      apiEmpty
    } = param;

    async function initialUserDispatch(){
      const { userselector } = param;
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
      return new Promise<void>(async initialResolve=>{
        await intervalCycle(param, AddtParam);
        initialResolve();
      })
    }

    !newRepo && await initialUserDispatch();
    async function repoDispatch(){
      for(const key of Object.keys(reposelector)){
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
          await intervalCycle(param, AddtParam);
        }
    }
    }
    await repoDispatch();
    if(!firstBatch){
      setRepoBtnText(apiEmpty.current ? 'no more repos' : 'more');
      !apiEmpty.current && setRepoBtnDisabled(false);
      setTimeout(()=>timer.current = 0, timer.current);
    }
  }