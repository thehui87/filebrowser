import React, { Component, useEffect, useState, useRef } from "react";
import { Input, Menu, Dropdown, Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { viewlist, viewgrid, newFolder } from "../actions";

import {
  FolderAddFilled,
  DownOutlined,
  UnorderedListOutlined,
  AppstoreFilled,
  SearchOutlined,
} from "@ant-design/icons";

const Nav = () => {
  const dispatch = useDispatch();
  const activeState = useSelector((state) => state.active);

  const inputRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(newFolder(inputRef.current.state.value));
    setIsModalVisible(false);
    inputRef.current.state.value = "";
  };

  useEffect(() => {
    // dispatch(newFolder(inputRef.current.state.value));
  }, [activeState, isModalVisible]);

  const handleCancel = () => {
    inputRef.current.state.value = "";
    setIsModalVisible(false);
  };

  const actionMenu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">Action menu item</a>
      </Menu.Item>
    </Menu>
  );
  const optionMenu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">2nd menu item</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="#">3rd menu item</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="ant-row row-padding">
      <div className="ant-col ant-col-8">
        <Input placeholder="search" prefix={<SearchOutlined />} />
      </div>
      <div className="ant-col ant-col-16">
        <div className="" style={{ float: "left", marginLeft: "10px" }}>
          {activeState.children.length
            ? `${activeState.children.length} item(s) `
            : ""}
        </div>
        <div className="" style={{ float: "right" }}>
          <Dropdown overlay={actionMenu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Actions <DownOutlined />
            </a>
          </Dropdown>
          <UnorderedListOutlined
            className="icon-offset custom-icons-offset "
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => dispatch(viewlist())}
          />
          <AppstoreFilled
            className="icon-offset custom-icons-offset "
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => dispatch(viewgrid())}
          />
          <Dropdown overlay={optionMenu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Options <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div
          className="create-new-folder custom-icons-offset "
          style={{ float: "right", marginRight: "20px" }}
          onClick={showModal}
        >
          <FolderAddFilled
            className="icon-offset"
            style={{ fontSize: "25px", cursor: "pointer" }}
          />
          <span>Create Folder</span>
        </div>
      </div>
      <Modal
        title="New Folder Name"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input ref={inputRef} />
      </Modal>
    </div>
  );
};

export default Nav;
