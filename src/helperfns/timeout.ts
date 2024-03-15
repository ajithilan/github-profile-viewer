import { SetStateAction } from "react";

type State = React.Dispatch<SetStateAction<boolean>>|null;

export const timeout = (state:State, stateVal:boolean|null, time:number, query:string='', method:string='',classname:string='')=>{
    setTimeout(() => {
      if(state !== null && stateVal !== null) state(stateVal);
      if(method==='add') document.querySelector(query)?.classList.add(classname);
      else if(method==='remove') document.querySelector(query)?.classList.remove(classname);
    }, time);
}