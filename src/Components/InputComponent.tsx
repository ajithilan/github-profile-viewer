import { useEffect, useRef } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useContext } from "react";
import { userContext } from "../App";
import { LoadingComponent } from "./loadingcomp";
import { fetchUserDetails } from "../helperfns/fetchuserdetails";
import { useSelector } from "react-redux";
import { RootState, context } from "../types";

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
    } = useContext<context>(userContext);
    const userselector = useSelector((state:RootState)=>state.user.userInitialValue);
    const reposelector = useSelector((state:RootState)=>state.user.repoInitialValue);
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
    const clearIntervalID = useRef<number|null>(null);
    let newusername : string[];
    const inputAccess = useRef<HTMLInputElement>(null);

    const handleUsername = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value);
    }

    function clearOneLetter(){
        setUsername((prev:string)=>{
            newusername = Array.from(prev);
            newusername.pop();
            return newusername.join('')
        });
    }

    const handleClearInterval = (clr:boolean=false)=>{
        if(clearIntervalID.current){
            setTimeout(() =>{
                clearIntervalID.current && clearInterval(clearIntervalID.current);
                clearIntervalID.current = null;
                clr && clearOneLetter();
            }, 151);
        }
    }

    const handleClearusername = ()=>{
        inputAccess.current?.focus();
        if(!clearIntervalID.current){
            clearIntervalID.current = setInterval(()=>{
            clearOneLetter();
            setErrorDisplay(false);
        },150);
        }else handleClearInterval(true);
    }

    useEffect(()=>{
        !username && (
            handleClearInterval(),
            inputAccess.current?.blur()
            );
    },[username])

    const handleSubmit = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(!submit){
            switch (e.key) {
                case 'Enter':
                    fetchUserDetails(args);
                    break;
                case 'Backspace':
                    setErrorDisplay(false);
                    break;
            }
        }
    }

    const handleFocus = ()=>{
        username && inputAccess.current?.focus();
    }

    return <div className={"input_container " + (input2 && "mount")}>
        <div className="input_component">
            <input ref={inputAccess} type="text" className="ghUsername_input" placeholder="Github username" onBlur={handleFocus} onChange={handleUsername} value={username} onKeyDown={handleSubmit}/>
            {username && <button className="clear_input" onMouseDown={handleClearusername} onMouseUp={()=>handleClearInterval(false)}><ArrowBackIosNewIcon sx={{'fontSize':'16px'}}/></button>}
            <span className="sample">For testing purpose use my github username - <b>ajithilan</b></span>
        </div>
        <div className={"error "+ (errorDisplay && "display")}>Username does not exist</div>
        {loading && <LoadingComponent/>}
    </div>
}