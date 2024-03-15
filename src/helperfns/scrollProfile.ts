import { Action } from "redux"
import profile0 from "../assets/profile0.jpg"
import profile1 from "../assets/profile1.jpg"
import profile2 from "../assets/profile2.jpg"
import profile3 from "../assets/profile3.jpg"
import profile4 from "../assets/profile4.jpg"
import profile5 from "../assets/profile5.jpg"
import profile6 from "../assets/profile6.jpg"
import profile7 from "../assets/profile7.jpg"
import { MutableRefObject } from "react"

interface params {
  dispatch: (action:Action)=>void;
  method: (payload:string[])=>Action;
  timer: MutableRefObject<number>;
  finalIteration: string | null;
}

export function scrollProfile(param: params){
    const {dispatch, method, timer, finalIteration} = param;
    const arrofdp = [profile0,profile1,profile2,profile3,profile4,profile5,profile6,profile7];
    let dp = arrofdp[Math.floor(Math.random()*arrofdp.length)];
    setTimeout(() => dispatch(method(['avatar_url', '', finalIteration ?? dp])), 100 + timer.current);
    timer.current += 100;
  }