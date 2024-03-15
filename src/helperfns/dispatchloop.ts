import { Action } from "redux";
import { params } from "../types";
import { hyperText } from "./hypertext";

interface AddtParam {
  key: string|string[];
  selectortxt: string;
  method:(value:(string|string[]|number)[])=>Action;
  len: number;
  subkey: string|string[];
  firstBatch: boolean
}

export function dispatchLoop(param:params, addtParam:AddtParam){
  const {dispatch, timer, timeoutID, inc} = param;
  const {key, selectortxt, method, len, subkey='', firstBatch} = addtParam;
  let text='';
  let j = firstBatch ? -1 : inc.current;
  text = selectortxt?.toString().slice(0,j+1);
  timeoutID.current.push(setTimeout(()=>{
    dispatch(method([key, subkey, hyperText({j,text:(firstBatch ? selectortxt : text), len, firstBatch})]));
  }, (0 + (firstBatch ? 0 : timer.current))));
  inc.current += 1;
  !firstBatch && (timer.current += len > 24 ? (len > 50 ? 10 : 30) : 40);
}