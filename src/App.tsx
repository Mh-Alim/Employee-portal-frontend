import React, { Suspense, lazy, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./app/features/counter/counterSlice";

const Login = lazy(() => import("./pages/Login"));
const AddEmployee = lazy(() => import("./pages/AddEmployee"));
import SearchEmployee from "./pages/SearchEmployee";
import OrganizationTreeView from "./pages/OrganizationTreeView";
import About from "./pages/Introduction";
import Navbar from "./components/Navbar";

import { Link, Route, Routes } from "react-router-dom";
import Introduction from "./pages/Introduction.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Logout from "./pages/Logout.tsx";
import TreeTry1 from "./pages/TreeTry1.jsx";
import FeatureRequest from "./pages/FeatureRequest.tsx";

import { Button } from "@/components/ui/button";

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
      {/* <Button variant="destructive">Button</Button> */}

      <Suspense fallback={<h1>Loading....</h1>}>
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
          <Route path="/try1" element={<TreeTry1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tree-view" element={<OrganizationTreeView />} />
          <Route path="/user" element={<Sidebar />}>
            <Route path="search" element={<SearchEmployee />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="tree-view" element={<TreeTry1 />} />
            <Route path="feature-request" element={<FeatureRequest />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
            <Route path="feature-request" element={<FeatureRequest />} />
            <Route path="search/:id" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
