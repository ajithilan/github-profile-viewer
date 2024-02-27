import { useContext } from "react"
import { userContext } from "../App"
import { useDispatch } from "react-redux";
import { resetStore } from "../ReduxStore/Userslice"
import { timeout } from "../helperfns/timeout";


export const Closebtn = ()=>{
    const {
        setSubmit,
        setUsername,
        setMountUserComp,
        setMountInput,
        setInput2,
        timeoutID,
        timer
    } = useContext(userContext);
    const dispatch = useDispatch();
    const closeBtn = document.querySelector('.close_btn');
    const closeText = document.querySelector('.closebtn_txt');

    closeBtn?.addEventListener('mouseover', () => {
        closeText.style.opacity = 1;
        closeText.style.transform = 'translateX(0)';
    });

    closeBtn?.addEventListener('mouseout', () => {
        closeText.style.opacity = 0;
        closeText.style.transform = 'translateX(60px)';
    });

    function clearallIntervals(){
        timeoutID.current.map(id=>{
            clearTimeout(id);
        }) 
    }

    const closeUserCard = ()=>{
        clearallIntervals();
        timer.current = 0;
        setUsername('');
        timeout(setMountInput, true, 0);
        setInput2(true);
        timeout(null, null, 500, '.input_container', 'remove', 'mount');
        timeout(null, null, 0, '.usercard_container', 'add', 'unmount');
        timeout(null, null, 0, '.usercard_container', 'remove', 'mount');
        timeout(setMountUserComp, false, 1500);
        setTimeout(() => dispatch(resetStore('')), 1500);
        setSubmit(false);
    }

    return <>
        <span className="closebtn_txt">close</span>
        <button className="close_btn" onClick={closeUserCard}></button>
    </>
}