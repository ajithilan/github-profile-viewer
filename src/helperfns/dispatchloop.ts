import { hyperText } from "./hypertext";

export function dispatchLoop(param, key, selectortxt, method, len, subkey='', firstBatch){
  const {dispatch, timer, timeoutID, inc} = param;
  let text='';
  let j = firstBatch ? -1 : inc.current;
  text = selectortxt?.toString().slice(0,j+1);
  timeoutID.current.push(setTimeout(()=>{
    dispatch(method([key, subkey, hyperText(j, firstBatch ? selectortxt : text, len, firstBatch)]))
  }, (0 + (firstBatch ? 0 : timer.current))));
  inc.current += 1;
  !firstBatch && (timer.current += len > 24 ? (len > 50 ? 10 : 30) : 40);
}