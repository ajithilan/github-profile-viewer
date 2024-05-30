import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
    name:'user',
    initialState: {
        userInitialValue : {},
        userRandomValue : {},
        repoInitialValue : {},
        repoRandomValue : {}
    },
    reducers:{
        updateUserInitialValue : (state, action)=>{
            state.userInitialValue = action.payload;
        },
        updateUserRandomValue : (state, action)=>{
            const key = action.payload[0];
            const data = action.payload[2];
            let tempObj = {...state.userRandomValue};
            tempObj[key] = data;
            state.userRandomValue = {...tempObj};
        },
        updateRepoInitialValue:(state, action)=>{
            const incomingPayload = action.payload[0];
            const hyperStrength = action.payload[1];
            let newPayload = {};
            if(hyperStrength){
                newPayload = {...state.repoInitialValue};
                switch(hyperStrength){
                    case 'semiHypered' : {
                        newPayload[incomingPayload].semiHypered = true;
                        break;
                    }
                    case 'hypered' : {
                        newPayload[incomingPayload].hypered = true;
                        break;
                    }
                }
                state.repoInitialValue = {...newPayload}
            }else{
                if((Object.keys(state.repoInitialValue)).length !== 0){
                    incomingPayload.map(obj=>{
                        !(Object.keys(state.repoInitialValue).includes(obj.node_id)) && (newPayload[obj.node_id] = obj);
                    })
                    state.repoInitialValue = {...state.repoInitialValue, ...newPayload}
                }else{
                    incomingPayload.map(obj=>newPayload[obj.node_id] = obj);
                    state.repoInitialValue = {...newPayload};
                }
            }
        },
        updateRepoRandomValue:(state, action)=>{
            const key = action.payload[0];
            const subkey = action.payload[1];
            const data = action.payload[2];
            let tempObj = (Object.keys(state.repoRandomValue)).length === 0 ? {} : {...state.repoRandomValue};
            if(key in tempObj) tempObj[key][subkey] = data;
            else {
                tempObj[key] = {},
                tempObj[key][subkey]=data
            };
            state.repoRandomValue = {...tempObj};
        },
        resetStore:(state)=>{
            state.userInitialValue = {};
            state.userRandomValue = {};
            state.repoInitialValue = {};
            state.repoRandomValue = {};
        }
    }
})

export default Userslice.reducer;
export const {
    updateUserInitialValue,
    updateUserRandomValue,
    updateRepoInitialValue,
    updateRepoRandomValue,
    resetStore
} = Userslice.actions;
