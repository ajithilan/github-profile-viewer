import { intervalCycle } from "./intervalCycle";
import {updateRepoRandomValue} from "../ReduxStore/Userslice"

export function repoToggle(param, repoID){
    const { reposelector, repoDetails, timer } = param;
    
    function callInterval(obj, key, firstBatch){
      const repokeystopass = Object.keys(obj);
      intervalCycle(param, updateRepoRandomValue, 'repo', reposelector, key, repokeystopass, true, firstBatch);
    }
    !reposelector[repoID].hypered && callInterval(repoDetails, repoID, false);
    timer.current = 0;
  }