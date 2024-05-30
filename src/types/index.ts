import React, { MutableRefObject, SetStateAction } from "react";
import { Action } from "redux";
//@ts-ignore
import rootState from "../ReduxStore/Userslice";

type RootState = rootState;

type DispatchType = (action: Action)=>void;

type UserData = {
    [key:string]:string|number|null;
}

interface params{
    dispatch: DispatchType;
    userselector: UserData;
    reposelector: RepoSelector;
    timer: MutableRefObject<number>;
    inc: MutableRefObject<number>;
    setRepoBtnDisabled: React.Dispatch<SetStateAction<boolean>>;
    repoBtnText: string;
    setRepoBtnText: React.Dispatch<SetStateAction<string>>;
    apiEmpty: MutableRefObject<boolean>;
  }

interface RepoSelector {
    [key:string]: RepoData;
}

type RepoData = {
    semiHypered:boolean;
    node_id:string;
    name:string;
    language:string;
} & RepoDetails;

type RepoDetails = {
    hypered:boolean;
    description:string|null;
    forks_count:string;
    homepage:string|null;
    watchers_count:string;
    html_url:string|null;
}

interface context {
    dispatch: DispatchType;
    userselector: {};
    reposelector: {};
    username: string;
    setUsername: React.Dispatch<SetStateAction<string>>;
    submit: boolean;
    setSubmit: React.Dispatch<SetStateAction<boolean>>;
    repoCount: MutableRefObject<number>;
    totalRepos: MutableRefObject<number>;
    repoDetails: RepoDetails;
    setMountInput: React.Dispatch<SetStateAction<boolean>>;
    mountUserComp: boolean;
    setMountUserComp: React.Dispatch<SetStateAction<boolean>>;
    input2: boolean;
    setInput2: React.Dispatch<SetStateAction<boolean>>;
    timer: MutableRefObject<number>;
    inc: MutableRefObject<number>;
    loading: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    errorDisplay: boolean;
    setErrorDisplay: React.Dispatch<SetStateAction<boolean>>;
    repoBtnDisabled: boolean;
    setRepoBtnDisabled: React.Dispatch<SetStateAction<boolean>>;
    repoBtnText: string;
    setRepoBtnText: React.Dispatch<SetStateAction<string>>;
    apiEmpty: MutableRefObject<boolean>;
}







export type { RootState, UserData, params, RepoSelector, RepoData, RepoDetails, context }