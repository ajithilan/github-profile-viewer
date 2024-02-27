import { useEffect, useState, useRef, MutableRefObject } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useContext } from "react";
import { userContext } from "../App";
import { LoadingComponent } from "./loadingcomp";
import { fetchUserDetails } from "../helperfns/fetchuserdetails";
import { useSelector } from "react-redux";

export const InputComponent = ()=>{
    const {
        dispatch,
        repoDetails,
        username,
        setUsername,
        submit,
        setSubmit,
        repoCount,
        totalRepos,
        setLoading,
        setMountInput,
        setMountUserComp,
        input2,
        loading,
        errorDisplay,
        setErrorDisplay,
        timer,
        timeoutID,
        inc
    } = useContext(userContext);
    const userselector = useSelector(state=>state.user.userInitialValue);
    const reposelector = useSelector(state=>state.user.repoInitialValue);
    const args = {
        dispatch,
        userselector,
        reposelector,
        repoDetails,
        submit,
        username,
        setSubmit,
        repoCount,
        totalRepos,
        setLoading,
        setMountInput,
        setMountUserComp,
        setErrorDisplay,
        timer,
        timeoutID,
        inc
    }
    const [focus, setFocus] = useState<boolean>(false);
    const clearIntervalID : MutableRefObject<number | undefined> = useRef();
    let newusername : string[];

    const handleUsername = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value);
    }

    useEffect(()=>{
        function eventgrp(){
            handleClearInterval();
            setErrorDisplay(false);
            return false
        }
        setFocus(username ? true : eventgrp());
    },[username])

    function clearOneLetter(){
        setUsername(prev=>{
            newusername = Array.from(prev);
            newusername.pop();
            return newusername.join('')
        });
    }

    const handleClearusername = ()=>{
        clearIntervalID.current = setInterval(()=>{
            username && clearOneLetter();
        },120)
    }

    const handleClearInterval = ()=>{
        setTimeout(() => {
                clearInterval(clearIntervalID.current);
        }, 130);
    }

    const handleSubmit = async (e)=>{
        (!submit && e.key === 'Enter') && fetchUserDetails(args);
    }

    return <div className={"input_container " + (input2 ? "mount" : null)}>
        <div className="input_component">
            <input type="text" className={"ghUsername_input " + (focus && "focus")} placeholder="Github username" onChange={handleUsername} value={username} onKeyDown={handleSubmit}/>
            {username && <button className="clear_input" onMouseDown={handleClearusername} onMouseUp={handleClearInterval}><ArrowBackIosNewIcon sx={{'fontSize':'16px'}}/></button>}
        </div>
        <div className={"error "+ (errorDisplay ? "display" : "")}>Username does not exist</div>
        {loading && <LoadingComponent/>}
    </div>
}