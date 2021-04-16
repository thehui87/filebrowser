import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FolderFilled } from "@ant-design/icons";
import { goBackCustom, removeCrumb } from "../actions";

const BreadCrumb = () => {
  const dispatch = useDispatch();
  const [crumbArray, setCrumbArray] = useState([]);

  let allData = useSelector((state) => state);
  let crumbArrayTemp = useSelector((state) => state.crumb);
  let tempCounter = useSelector((state) => state.counter);

  const getData = () => {
    setCrumbArray(crumbArrayTemp);
  };

  useEffect(() => {
    getData();
  }, [allData, tempCounter, crumbArrayTemp]);

  const breadCrumbView = () => {
    return (
      <div className="custom-breadcrumb">
        {crumbArray.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => dispatch(goBackCustom({ name: item, idx: index }))}
            >
              {index == 0 ? <FolderFilled /> : <span>/</span>}
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
