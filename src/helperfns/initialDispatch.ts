import { updateUserRandomValue, updateRepoRandomValue } from "../ReduxStore/Userslice";
import { intervalCycle } from "./intervalCycle";

export function initialDispatch(param, firstBatch, newRepo=false){
    const { userselector, reposelector, timer } = param;

    function initialUserDispatch(){
      const userkeystopass = Object.keys(userselector);
      intervalCycle(param, updateUserRandomValue, 'main', userselector, userkeystopass, [], false, firstBatch);
    }
    !newRepo && initialUserDispatch();
    Object.keys(reposelector).map((key)=>{
      if(!reposelector[key].semiHypered){
        const repokeystopass = Object.keys(reposelector[key]);
        intervalCycle(param, updateRepoRandomValue, 'repo', reposelector, key, repokeystopass, false, firstBatch);
      }
    })
    !firstBatch && setTimeout(()=>timer.current = 0, timer.current);
  }