import React, { Component, useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import { HomePage } from "../homepage";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, dataLoad } from "../actions";
import axios from "axios";

function App() {
  const { pathname } = useLocation();

  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const getData = () => {
    // const dispatch = useDispatch();
    axios
      .get(
        `https://gist.githubusercontent.com/alagu/bfee7d87e0e03cd9bc33693af61281d9/raw/b100b548563ffcb1b554432c3ffdf855f1651547/folder-data.json`
      )
      .then((res) => {
        var resData = res.data;
        dispatch(dataLoad(res.data));
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={"app-container "}>
      <div className="app-content">
        {/* <h1>{counter}</h1>
        <button onClick={() => dispatch(increment())}>CLICK +</button>
        <button onClick={() => dispatch(decrement())}>CLICK -</button> */}
        {/* <Alert /> */}
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route exact path="/" component={HomePage} />
          <Redirect from="*" to="/" />
          {/* <Route path='*' exact={true} component={HomePage} /> */}
        </Switch>
      </div>
    </div>
  );
}

export { App };
