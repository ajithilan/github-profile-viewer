import "./styling/App.sass"
import { InputComponent } from "./Components/InputComponent"
import { useEffect, useRef, useState } from "react";
import { UsercardComponent } from "./Components/UsercardComponent"
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialDispatch } from "./helperfns/initialDispatch";
import { timeout } from "./helperfns/timeout";

export const userContext = createContext();

function App() {
  const dispatch = useDispatch();
  const userselector = useSelector(state=>state.user.userInitialValue);
  const reposelector = useSelector(state=>state.user.repoInitialValue);
  const [username, setUsername] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const [mountInput, setMountInput] = useState<boolean>(true);
  const [input2, setInput2] = useState<boolean>(false);
  const [mountUserComp, setMountUserComp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorDisplay, setErrorDisplay] = useState<boolean>(false);
  const repoCount = useRef<number>(5);
  const inc = useRef(0);
  const timer = useRef(0);
  const timeoutID = useRef([]);
  const totalRepos = useRef<number>(null);
  type RD = {
    [key : string] : string | Boolean
  }
  const repoDetails : RD = {
    hypered:false,
    description:'',
    forks_count:'',
    homepage:'',
    watchers_count:'',
    html_url:''
  }

  const contextValues = {
    dispatch,
    userselector,
    reposelector,
    username,
    setUsername,
    submit,
    setSubmit,
    repoCount,
    totalRepos,
    repoDetails,
    setMountInput,
    mountUserComp,
    setMountUserComp,
    input2,
    setInput2,
    timer,
    timeoutID,
    inc,
    loading,
    setLoading,
    errorDisplay,
    setErrorDisplay
  }
  const args = {dispatch, userselector, reposelector, timer, timeoutID, inc};

  useEffect(()=>{
    function mountUserCard(){
      initialDispatch(args, true);
      timeout(setMountUserComp, true, 0, '.input_container', 'add', 'unmount');
      timeout(null, null, 0, '.input_container', 'remove', 'mount');
      timeout(null, null, 300, '.usercard_container', 'add', 'mount');
      timeout(setMountInput, false, 700, '.input_container', 'remove', 'unmount');
      setTimeout(() => initialDispatch(args, false), 1500);
    }
    submit && mountUserCard();
  },[submit])

  // useEffect(()=>{
  //   console.log(reposelector)
  // },[reposelector])

  return <div className="App">
    <userContext.Provider value={contextValues}>
      {mountInput && <InputComponent/>}
      {mountUserComp && <UsercardComponent/>}
    </userContext.Provider>
  </div>
}

export default App