import React, { Component, useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Button, Input, Menu, Dropdown } from "antd";

import { VerticalAlignTopOutlined, EnterOutlined } from "@ant-design/icons";
import "./style.css";
import BreadCrumb from "../_components/BreadCrumb";
import Nav from "../_components/Nav";
import ListView from "../_components/ListView";
import GridView from "../_components/GridView";
import { useSelector, useDispatch } from "react-redux";
import { goBackward } from "../actions";

import DeleteFolderModal from "../_components/DeleteFolderModal";

function HomePage({ history }) {
  const [folderData, setFolderData] = useState({
    name: "",
    children: [],
    type: "",
  });
  const [view, setView] = useState("");
  const [counter, setCounter] = useState(0);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const dispatch = useDispatch();

  let allData = useSelector((state) => state);
  let activeState = useSelector((state) => state.active);
  let tempCounter = useSelector((state) => state.counter);

  const getData = () => {
    setView(allData.view);
    setCounter(allData.counter);
    setFolderData(activeState);
  };

  const emitShow = (res) => {
    console.log(res);
    setShowDeletePopUp(res);
  };

  useEffect(() => {
    getData();
  }, [allData, tempCounter, activeState]);

  return (
    <div className="ant-layout">
      <div style={{ display: "flex" }}>
        <EnterOutlined
          style={{
            fontSize: "25px",
            marginRight: "10px",
            transform: "rotateZ(90deg) scaleY(-1)",
          }}
          onClick={() => {
            dispatch(goBackward());
            getData();
          }}
        />
        {/* <VerticalAlignTopOutlined
          style={{ fontSize: "25px", marginRight: "10px" }}
          onClick={() => {
            dispatch(goBackward());
            getData();
          }}
        /> */}
        <BreadCrumb />
      </div>

      <Nav />
      {view == "list" ? <ListView /> : <GridView />}
      <DeleteFolderModal />
    </div>
  );
}

export { HomePage };
