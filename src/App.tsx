import React, { Suspense, lazy, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./app/features/counter/counterSlice";
import { Link, Route, Routes } from "react-router-dom";
import { ToastContainerError, ToastContainerSuccess } from "./ReactToast.tsx";

const Login = lazy(() => import("./pages/Login"));
const AddEmployee = lazy(() => import("./pages/AddEmployee"));
const SearchEmployee = lazy(() => import("./pages/Search/SearchEmployee.tsx"));
const OrganizationTreeView = lazy(
  () => import("./pages/Tree/OrganizationTreeView.tsx")
);
const About = lazy(() => import("./pages/Introduction"));
const Navbar = lazy(() => import("./components/Navbar"));

const Introduction = lazy(() => import("./pages/Introduction.tsx"));
const Sidebar = lazy(() => import("./components/Sidebar.tsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.tsx"));
const Logout = lazy(() => import("./pages/Logout.tsx"));
const FeatureRequest = lazy(() => import("./pages/FeatureRequest.tsx"));

const EmailForm = lazy(() => import("./pages/ForgetPossword/EmailForm.tsx"));
const Otp = lazy(() => import("./pages/ForgetPossword/Otp.tsx"));
const NewPassword = lazy(
  () => import("./pages/ForgetPossword/NewPassword.tsx")
);
const Loader = lazy(() => import("./pages/Loader.tsx"));

const App = () => {
  const dispatch = useAppDispatch();
  const val = useAppSelector((state) => state.count.value);

  return (
    <div className=" ">
      <Suspense fallback={<Loader />}>
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
          <Route path="/forget/email" element={<EmailForm />} />
          <Route path="/forget/otp" element={<Otp />} />
          <Route path="/forget/new-password" element={<NewPassword />} />

          {/* <Route path="/tree-view" element={<OrganizationTreeView />} /> */}
          <Route path="/user" element={<Sidebar />}>
            <Route path="search" element={<SearchEmployee />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="tree-view" element={<OrganizationTreeView />} />
            <Route path="feature-request" element={<FeatureRequest />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
            <Route path="feature-request" element={<FeatureRequest />} />
            <Route path="search/:id" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
      {ToastContainerSuccess}
      {ToastContainerError}
    </div>
  );
};

export default App;
