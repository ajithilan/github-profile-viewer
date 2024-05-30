import { useContext } from "react"
import { userContext } from "../App"
import { useDispatch } from "react-redux";
//@ts-ignore
import { resetStore } from "../ReduxStore/Userslice"
import { timeout } from "../helperfns/timeout";
import { context } from "../types";


export const Closebtn = ()=>{
    const {
        setSubmit,
        setUsername,
        setMountUserComp,
        setMountInput,
        setInput2,
        timer,
        repoCount,
        setRepoBtnDisabled,
        setRepoBtnText,
        apiEmpty
    } = useContext<context>(userContext);
    const dispatch = useDispatch();

    const closeUserCard = ()=>{
        timer.current = 0;
        setUsername('');
        timeout(setMountInput, true, 0);
        setInput2(true);
        timeout(null, null, 500, '.input_container', 'remove', 'mount');
        timeout(null, null, 0, '.usercard_container', 'add', 'unmount');
        timeout(null, null, 0, '.usercard_container', 'remove', 'mount');
        timeout(setMountUserComp, false, 1500);
        setTimeout(() => dispatch(resetStore('')), 1500);
        repoCount.current = 5;
        setRepoBtnText('Hypering... please wait');
        setRepoBtnDisabled(true);
        apiEmpty.current = false;
        setSubmit(false);
    }

    return (
        <div className="closebtn_container">
            <span className="closebtn_txt">close</span>
            <button className="close_btn" onClick={closeUserCard}></button>
        </div>
    )
}