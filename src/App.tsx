import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./app/features/counter/counterSlice";
import Login from "./pages/Login";
import AddEmployee from "./pages/AddEmployee";
import SearchEmployee from "./pages/SearchEmployee";
import OrganizationTreeView from "./pages/OrganizationTreeView";
const App = () => {
  const dispatch = useAppDispatch();
  const val = useAppSelector((state) => state.count.value);
  return (
    <div className=" ">
      {/* App
      <div>
      <button onClick={() => {dispatch(increment())}} >+</button>
      {val}
      <button onClick={() => dispatch(decrement())} >-</button>
      </div> */}

      <Login />
      <SearchEmployee />
      <AddEmployee />
      {/* <SearchEmployee /> */}
      <OrganizationTreeView />
    </div>
  );
};

export default App;
