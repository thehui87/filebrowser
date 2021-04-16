import React, { useEffect, useState } from "react";
import { Modal, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteFolder } from "../actions";

const DeleteFolderModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const modalVisibility = useSelector((state) => state.modalState);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(
      deleteFolder({
        name: modalVisibility.name,
        counter: modalVisibility.counter,
      })
    );
    setIsModalVisible(false);
    // dispatch({ type: "HIDEMODAL" });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // dispatch({ type: "HIDEMODAL" });
  };

  useEffect(() => {
    modalVisibility.state ? showModal() : handleCancel();
  }, [modalVisibility]);

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Delete Folder"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>Are you sure you want to delete this folder?</div>
      </Modal>
    </>
  );
};

export default DeleteFolderModal;
