import { UserData, RepoData, RepoDetails } from "../types";

type ApiResponse = ApiEntry | ApiEntry[];

type ApiEntry = {[key:string]:string|number|boolean|null};

export const updateInitialStoreValue = (apiResponse: ApiResponse, repoDetails: RepoDetails)=>{
  const userData = {
      avatar_url:'',
      name:'',
      login:'',
      company:'',
      location:'',
      bio:'',
      followers:'',
      following:'',
      public_gists:'',
      public_repos:''
    }
  const repoData = {
      semiHypered:false,
      node_id:'',
      name:'',
      language:'',
      ...repoDetails
    }
  const newuserdata : UserData = {...userData};
  let repoArr;
  let i:string;
  const isArr = Array.isArray(apiResponse);
  
  function storeapidata(data:{[key:string]:any}, res:ApiEntry){
    for(i in data){
      data[i] = (i === 'semiHypered' || i === 'hypered') ? false : res[i];
    }
    return data
  }
  if(isArr){
    repoArr = apiResponse.map(entry=>{
      const newrepoData : RepoData = {...repoData};
      return storeapidata(newrepoData, entry)
    })
  }
  else storeapidata(newuserdata, apiResponse);

  return isArr ? repoArr : newuserdata
  }