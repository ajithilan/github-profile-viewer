export async function repoFetch(param){
    const {username, repoCount} = param;
    return fetch(`https://api.github.com/users/${username}/repos?per_page=${repoCount.current}`);
  }