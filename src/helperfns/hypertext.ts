

export function hyperText(j=-1, text='', len, firstBatch=false){
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let k;
    let processedText = firstBatch ? '' : text;
    
    if(typeof text === 'string'){
      for(k=j+1;k<len;k++) processedText = processedText + letters[Math.floor(Math.random()*26)];
    }
    else{
      if(firstBatch){
        processedText = '-';
      }
      else{
        for(k=j+1;k<len;k++) processedText = parseInt(processedText + (Math.floor(Math.random()*10)).toString());
      }
    }
    return processedText;
  }