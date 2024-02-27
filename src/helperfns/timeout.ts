
export const timeout = (state, val, time, query='', method='',classname='')=>{
    setTimeout(() => {
      state && state(val)
      if(method==='add') document.querySelector(query)?.classList.add(classname);
      else if(method==='remove') document.querySelector(query)?.classList.remove(classname);
    }, time);
}