import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {increment,decrement,incrementByAmount} from "./app/features/counter/counterSlice";
const App = () => {
  const dispatch = useAppDispatch();
  const val = useAppSelector((state) => state.count.value);
  return (
    <div className=' bg-slate-600 ' >
      App
      <div>
      <button onClick={() => {dispatch(increment())}} >+</button>
      {val}
      <button onClick={() => dispatch(decrement())} >-</button>
      </div>
      
    </div>
  )
}

export default App