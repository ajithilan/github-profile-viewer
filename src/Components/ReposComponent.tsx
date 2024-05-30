import { useContext, useEffect, useRef } from "react";
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
        timer,
        inc,
        repoBtnDisabled,
        setRepoBtnDisabled,
        repoBtnText,
        setRepoBtnText,
        apiEmpty
    } = useContext<context>(userContext);
    const dispatch = useDispatch();
    const args = {
        dispatch,
        userselector,
        reposelector,
        repoDetails,
        timer,
        inc,
        setRepoBtnDisabled,
        repoBtnText,
        setRepoBtnText,
        apiEmpty
    };
    const repoInitialSelector = useSelector((state:RootState)=>state.user.repoInitialValue);
    const repoRandomSelector = useSelector((state:RootState)=>state.user.repoRandomValue);
    const moreRepoFetched = useRef<boolean>(false);
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
        'python':'red',
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
            setRepoBtnText('Hypering... please wait');
            setRepoBtnDisabled(true);
            moreRepoFetched.current = true;
        });
    }

    const handleRepoFetch = ()=>{
        const count = repoCount.current;
        const total = totalRepos.current;
        if(!repoBtnDisabled){
            fetchMoreRepos();
            if((count + 5) > total){
                setTimeout(() => {
                    apiEmpty.current = true;
                }, 300)
            }
        }
    }

    useEffect(()=>{
        if(moreRepoFetched.current){
            initialDispatch(args, true, true);
            initialDispatch(args, false, true);
            moreRepoFetched.current = false;
        }
    },[moreRepoFetched.current])

    return (
        <>
            <div className="repo_container">
                {
                    Object.keys(repoRandomSelector).map(key => {
                        const { node_id, name, language, description, forks_count, homepage, watchers_count, html_url } = repoRandomSelector[key];

                        return (
                            <Accordion className="repo" data-id={node_id} onChange={toggleRepoDetail} sx={repostyle} key={node_id}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon className="accordion_expand_btn"/>}>
                                        <div className="repo_summary">
                                            <span className="repo_name">{name}</span>
                                            <span className={`repo_main_lang ${langColors[language] ?? 'pink'}`}>{language && `[ ${language} ]`}</span>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails className="repo_details">
                                        <p>{description}</p>
                                        <span>forks : {forks_count}</span>
                                        <span>homepage : <a href={homepage}>{homepage}</a></span>
                                        <span>watchers : {watchers_count}</span>
                                        <span>source : <a href={html_url}>{html_url}</a></span>
                                    </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>
            <div className="more_repo_container">
                <button className="more_repo_btn" onClick={handleRepoFetch} disabled={repoBtnDisabled}>
                    <span>{repoBtnText}</span>
                    <ExpandMoreIcon className="expand_btn"/>
                </button>
            </div>
        </>
    )
}