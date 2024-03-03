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
import About from "./pages/Introduction";
import Navbar from "./components/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import Introduction from "./pages/Introduction.tsx";
import Sidebar from "./components/Sidebar.tsx";

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

      {/* <Login />
      <SearchEmployee />
      <AddEmployee /> */}
      {/* <SearchEmployee /> */}
      {/* <OrganizationTreeView /> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Introduction />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/tree-view" element={<OrganizationTreeView />} />
        <Route path="/user" element={<Sidebar />} >
          <Route path="search" element={<SearchEmployee />} />
          <Route path="tree-view" element={<OrganizationTreeView />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
