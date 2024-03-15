//@ts-ignore
import {updateUserInitialValue, updateRepoInitialValue} from "../ReduxStore/Userslice";
import { updateInitialStoreValue } from "./updateInitialStoreValue";
import { repoFetch } from "./repoFetch";
import { RepoDetails } from "../types";
import { Action } from "redux";
import React, { MutableRefObject, SetStateAction } from "react";

interface payload {
    dispatch: (action:Action)=>void;
    repoDetails: RepoDetails;
    username: string;
    setSubmit: React.Dispatch<SetStateAction<boolean>>;
    repoCount: MutableRefObject<number>;
    totalRepos: MutableRefObject<number>;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    setErrorDisplay: React.Dispatch<SetStateAction<boolean>>;
}

export const fetchUserDetails = async (param : payload)=>{
    const {
        dispatch,
        repoDetails,
        username,
        setSubmit,
        repoCount,
        totalRepos,
        setLoading,
        setErrorDisplay
        } = param;
    const ghUserDetails = await fetch(`https://api.github.com/users/${username}`);
    const ghRepo = await repoFetch({username, repoCount});

    setLoading(true);

    Promise.all([ghUserDetails.json(), ghRepo.json()]).then(response=>{
        try{
            if(ghUserDetails.ok && ghRepo.ok){
                setErrorDisplay(false);
                const userInitialValue = JSON.parse(JSON.stringify(response[0]));
                totalRepos.current = userInitialValue.public_repos;
                repoCount.current = Math.min(totalRepos.current, 5);
                dispatch(updateUserInitialValue(updateInitialStoreValue(userInitialValue, repoDetails)));
                const repoInitialValue = JSON.parse(JSON.stringify(response[1]));
                dispatch(updateRepoInitialValue([updateInitialStoreValue(repoInitialValue, repoDetails), null]));
                setSubmit(true);
                setLoading(false);
            }else{
                setLoading(false);
                if(!ghUserDetails.ok){
                    setErrorDisplay(true);
                    throw new Error('User detail fetch unsuccessful');
                }
                else throw new Error('User repo fetch unsuccessful');
            }
        }
        catch(error){
            console.log('fetch unsuccessful', error);
        }
    });
}