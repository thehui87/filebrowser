import React, { Component, useEffect, useState, useContext } from "react";
import { FolderFilled, DeleteFilled, FileFilled } from "@ant-design/icons";
import Moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { goforward } from "../actions";

const ListView = (props) => {
  const dispatch = useDispatch();
  let activeState = useSelector((state) => state.active);
  let editModeState = useSelector((state) => state.actionMenu);

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
            <div className="ant-col ant-col-xs-22 ant-col-md-16">
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
            <div className="ant-col ant-col-xs-0 ant-col-md-6">
              {Moment().format("MMMM Do YYYY, h:mm:ss a")}
            </div>
            <div className="ant-col ant-col-xs-2 ant-col-xs-2">
              <DeleteFilled
                className={
                  "icon-offset " + (editModeState ? "show-icon" : "hide-icon")
                }
                style={{ fontSize: "25px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: "SHOWMODAL",
                    payload: { name: item.name, counter: item.counter },
                  });
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
