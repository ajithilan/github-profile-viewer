import { intervalCycle } from "./intervalCycle";
//@ts-ignore
import {updateRepoRandomValue} from "../ReduxStore/Userslice"
import { RepoDetails, params } from "../types";

export function repoToggle(param:params, repoDetails: RepoDetails, repoID:string|undefined){
    const {reposelector, timer} = param;
    if(repoID && !reposelector[repoID].hypered){
      const repokeystopass = Object.keys(repoDetails);
      intervalCycle(param, {
        method:updateRepoRandomValue,
        type:'repo',
        selector:reposelector,
        keys:repoID,
        subkey:repokeystopass,
        repoDetail:true,
        firstBatch:false
      });
    }
    timer.current = 0;
  }