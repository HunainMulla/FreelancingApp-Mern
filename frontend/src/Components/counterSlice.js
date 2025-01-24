import React from 'react'

import {createSlice} from '@reduxjs/toolkit'


const counterSlice = createSlice({ 
    name:"counter",
    initialState:{ 
        value:0
    },
    reducers:{ 
        Increment:(state)=>{ 
            state.value+=1
        }
    }
})

export const {Increment} = counterSlice.actions;

export default counterSlice.reducer
