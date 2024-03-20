type Hyper = {
  j: number;
  text: string;
  len: number;
  firstBatch: boolean;
}

export function hyperText({j=-1, text='', len, firstBatch=false} : Hyper){
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let k;
    let processedData : string | number = firstBatch ? '' : text;
    
    if(typeof text === 'string'){
      for(k=j+1;k<len;k++) processedData += letters[Math.floor(Math.random()*26)];
    }
    else{
      if(firstBatch){
        processedData = '-';
      }
      else{
        for(k=j+1;k<len;k++) processedData = parseInt(processedData + (Math.floor(Math.random()*10)).toString());
      }
    }
    return processedData;
  }