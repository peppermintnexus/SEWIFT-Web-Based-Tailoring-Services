import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
const App = () => (
  <Flex align='center' gap='middle'>
    <Spin indicator={<LoadingOutlined spin />} />
  </Flex>
);
export default App;
