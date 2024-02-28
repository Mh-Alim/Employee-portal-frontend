import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {increment,decrement,incrementByAmount} from "./app/features/counter/counterSlice";
import Login from './pages/Login';
const App = () => {
  const dispatch = useAppDispatch();
  const val = useAppSelector((state) => state.count.value);
  return (
    <div className=' ' >
      {/* App
      <div>
      <button onClick={() => {dispatch(increment())}} >+</button>
      {val}
      <button onClick={() => dispatch(decrement())} >-</button>
      </div> */}

      <Login />
      
    </div>
  )
}

export default App