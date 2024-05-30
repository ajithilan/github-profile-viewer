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

export async function dispatchLoop(param:params, addtParam:AddtParam){
  const {dispatch, timer, inc} = param;
  const {key, selectortxt, method, len, subkey='', firstBatch} = addtParam;
  let text='';
  let j = firstBatch ? -1 : inc.current;
  text = selectortxt?.toString().slice(0,j+1);

  return new Promise<void>(async res=>{
    async function ST(){
      return new Promise<void>(STresolve=>{
        setTimeout(()=>{
          D();
          STresolve();
        }, timer.current);
      });
    }
    function D(){
      const hyperedText = hyperText({j, text:(firstBatch ? selectortxt : text), len, firstBatch});
      dispatch(method([key, subkey, hyperedText]));
    }
    if(firstBatch) D();
    else await ST();
    inc.current += 1;
    !firstBatch && (timer.current = len > 24 ? (len > 50 ? 10 : 30) : 40);
    res();
  });
}