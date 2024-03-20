import { useContext, useEffect, useRef, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import { updateRepoInitialValue } from "../ReduxStore/Userslice";
import { userContext } from "../App";
import { repoFetch } from "../helperfns/repoFetch";
import { repoToggle } from "../helperfns/repotoggle";
import { updateInitialStoreValue } from "../helperfns/updateInitialStoreValue";
import { initialDispatch } from "../helperfns/initialDispatch";
import { RootState, context } from "../types";

export const ReposComponent = ()=>{
    const {
        userselector,
        reposelector,
        repoDetails,
        username,
        repoCount,
        totalRepos,
        timeoutID,
        timer,
        inc
    } = useContext<context>(userContext);
    const dispatch = useDispatch();
    const args = {dispatch, userselector, reposelector, repoDetails, timeoutID, timer, inc};
    const repoInitialSelector = useSelector((state:RootState)=>state.user.repoInitialValue);
    const repoRandomSelector = useSelector((state:RootState)=>state.user.repoRandomValue);
    const moreRepoFetched = useRef<boolean>(false);
    let subRepo;
    const [repoBtnDisabled, setRepoBtnDisabled] = useState<boolean>(repoCount.current < 5 ? true : false);
    const repostyle = {
        backgroundColor:'rgba(0, 0, 0, 0.3)',
        borderRadius:'8px !important',
        display:'flex',
        flexDirection:'column',
        width:'100%',
        boxSizing:'border-box'
    }
    const langColors : {[key:string] : string} = {
        'HTML':'orange',
        'CSS':'blue',
        'JavaScript':'yellow',
        'TypeScript':'green',
        'python':'green',
        '-':'white'
    }

    const toggleRepoDetail = (e : React.SyntheticEvent<Element, Event>)=>{
        repoToggle(args, repoDetails, e.currentTarget.parentElement?.dataset.id);
    }

    interface APIresponse {
        [key:string] : any;
    }

    function fetchMoreRepos(){
        repoCount.current += 5;
        const newRepoData = repoFetch({username, repoCount});
        newRepoData
        .then(response=>response.json())
        .then(data=>{
            const filteredData = data.filter((obj: APIresponse)=>{
                return !(Object.keys(repoInitialSelector).includes(obj.node_id))
            })
            dispatch(updateRepoInitialValue([updateInitialStoreValue(filteredData, repoDetails), null]));
            moreRepoFetched.current = true;
        });
    }

    const handleRepoFetch = ()=>{
        const count = repoCount.current;
        const total = totalRepos.current;
        !repoBtnDisabled && (
            fetchMoreRepos(),
            ((count + 5) > total) &&
            setTimeout(() => {
                document.querySelector('.more_repo_btn')?.setAttribute('disabled', 'true');
                setRepoBtnDisabled(true);
            }, 300)
        )
    }

    useEffect(()=>{
        moreRepoFetched.current && (
            initialDispatch(args, true, true),
            initialDispatch(args, false, true),
            moreRepoFetched.current = false
        );
    },[moreRepoFetched.current])

    return <>
            <div className="repo_container">
                {Object.keys(repoRandomSelector).map((key)=>{
                    subRepo = repoRandomSelector[key];
                    return <Accordion className="repo" data-id={subRepo.node_id} onChange={toggleRepoDetail} sx={repostyle} key={subRepo.node_id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'whitesmoke'}}/>}>
                                <div className="repo_summary">
                                    <span className="repo_name">{subRepo.name}</span>
                                    <span className={'repo_main_lang ' + (langColors[subRepo.language] ?? 'pink')}>{subRepo.language && `[ ${subRepo.language} ]`}</span>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className="repo_details" sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
                                <p className="repo_detail">{subRepo.description}</p>
                                <span className="repo_detail">forks : {subRepo.forks_count}</span>
                                <span>homepage : <a className="repo_detail" href={subRepo.homepage}>{subRepo.homepage}</a></span>
                                <span className="repo_detail">watchers : {subRepo.watchers_count}</span>
                                <span>source : <a className="repo_detail" href={subRepo.html_url}>{subRepo.html_url}</a></span>
                            </AccordionDetails>
                    </Accordion>
                })}
            </div>
            <div className="more_repo_container">
                <button className="more_repo_btn" onClick={handleRepoFetch} disabled={repoBtnDisabled}>
                    <span>{repoBtnDisabled ? 'no more repos' : 'more'}</span>
                    <ExpandMoreIcon className="expand_btn"/>
                </button>
            </div>
            </>
}