
export const updateInitialStoreValue = (type : string, apiResponse, repoDetails)=>{
  type RD = {
    [key : string] : string | Boolean
  }
  const userData : RD = {
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
  const repoData : RD = {
      semiHypered:false,
      node_id:'',
      name:'',
      language:'',
      ...repoDetails
    }
  const newuserdata = {...userData};
  let repoArr;
  let i;
  
  function storeapidata(data : RD, res){
    for(i in data){
      data[i] = (i === 'semiHypered' || i === 'hypered') ? false : res[i];
    }
    return data
  }
  if(type === 'main') storeapidata(newuserdata, apiResponse)
  else{
    repoArr = apiResponse.map(entry=>{
      const newrepoData = {...repoData};
      return storeapidata(newrepoData, entry)
    })
  }
  return type === 'main' ? newuserdata : repoArr
  }
