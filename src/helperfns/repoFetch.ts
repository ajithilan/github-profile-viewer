import { MutableRefObject } from "react";

type param = {
  username: string;
  repoCount: MutableRefObject<number>;
}

export async function repoFetch({username, repoCount} : param){
    return fetch(`https://api.github.com/users/${username}/repos?per_page=${repoCount.current}`);
  }