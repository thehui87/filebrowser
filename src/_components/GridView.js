import React, { Component, useEffect, useState, useContext } from "react";
import { FolderFilled, DeleteFilled, FileFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { goforward } from "../actions";

const ListView = (props) => {
  const dispatch = useDispatch();
  let activeState = useSelector((state) => state.active);
  let editModeState = useSelector((state) => state.actionMenu);

  return (
    <div className="ant-row">
      {activeState.children.map((item, index) => {
        return (
          <div
            key={index}
            className="ant-col ant-col-xs-4 ant-col-xs-8 grid-icon"
            style={{ textAlign: "center" }}
            onClick={() => {
              item.type == "folder" ? dispatch(goforward(item.name)) : "";
            }}
          >
            {item.type == "folder" ? (
              <FolderFilled
                className="icon-offset"
                style={{ fontSize: "85px", color: "#ababab" }}
              />
            ) : (
              <FileFilled
                className="icon-offset"
                style={{ fontSize: "75px", color: "#ababab", padding: "10px" }}
              />
            )}
            <div>{item.name}</div>

            <DeleteFilled
              className={
                "icon-offset grid-icon-delete " +
                (editModeState ? "show-icon" : "hide-icon")
              }
              style={{ height: "25px", fontSize: "25px", cursor: "pointer" }}
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: "SHOWMODAL",
                  payload: { name: item.name, counter: item.counter },
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
