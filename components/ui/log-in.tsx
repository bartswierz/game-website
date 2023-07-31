"use client";
import { useState, useEffect } from "react";
//IMPORTING IN LOGIN/LOGOUT FUNCTIONS FROM AUTH-SLICE
import { logIn, logOut, toggleModerator } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";

const LogIn = () => {
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  //ALLOWS US TO DISPATCH ACTIONS
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  //Whenever you login to the application, we will take the username inputted and dispatch it to the store and equal the user to the text passed from user
  const onClickLogIn = () => {
    dispatch(logIn(username));
  };

  const onClickToggle = () => {
    dispatch(toggleModerator());
  };

  const onClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <input type="text" onChange={(e) => setUsername(e.target.value)} className="bg-slate-700 text-slate-800" />
      <br />
      <button onClick={onClickLogIn}>Log In</button>
      <br />
      <button onClick={onClickLogOut}>Log Out</button>
      <br />
      {isAuth && <button onClick={onClickToggle}>Toggle Moderator Status</button>}
    </div>
  );
};

export default LogIn;
