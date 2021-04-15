import React, { Component, useEffect, useState, useContext } from "react";
import { FolderFilled, DeleteFilled, FileFilled } from "@ant-design/icons";
import Moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { goforward } from "../actions";

const ListView = (props) => {
  const dispatch = useDispatch();
  let activeState = useSelector((state) => state.active);

  return (
    <div>
      {activeState.children.map((item, index) => {
        return (
          <div
            key={index}
            className="ant-row content-padding"
            onClick={() => {
              item.type == "folder" ? dispatch(goforward(item.name)) : "";
            }}
          >
            <div className="ant-col ant-col-16">
              {item.type == "folder" ? (
                <FolderFilled
                  className="icon-offset"
                  style={{ fontSize: "25px", color: "#ababab" }}
                />
              ) : (
                <FileFilled
                  className="icon-offset"
                  style={{ fontSize: "25px", color: "#ababab" }}
                />
              )}
              <span>{item.name}</span>
            </div>
            <div className="ant-col ant-col-6">
              {Moment().format("MMMM Do YYYY, h:mm:ss a")}
            </div>
            <div className="ant-col ant-col-2">
              {/* <DeleteFilled
                className="icon-offset"
                style={{ fontSize: "25px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Bin Click");
                  dispatch({ type: "SHOWMODAL" });
                }}
              /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;