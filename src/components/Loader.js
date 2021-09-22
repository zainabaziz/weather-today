import React from "react";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = styled.div`
  background: #101039;
  font-size: 13px;
  color: white;
  text-align: center;
  margin: 0;
  padding: 32px;
  border-radius: 14px;

  .loading-icon {
    margin-top: 40px;

    font-size: 32px;

    margin-bottom: 24px;
  }
`;

const Loader = () => {
  return (
    <Loading>
      <LoadingOutlined className="loading-icon" />
      <p>Please be patient, we are looking for your weather!</p>
    </Loading>
  );
};

export default Loader;
