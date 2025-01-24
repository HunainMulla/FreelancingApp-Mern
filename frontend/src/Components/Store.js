import React from 'react'

import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import loginReducer from './loginSlice'
import userDetailReducer from './userDetailSlice'

export const store = configureStore({
    reducer:{ 
        counter : counterReducer,
        islogged:loginReducer,
        userDetail:userDetailReducer
    }
})
