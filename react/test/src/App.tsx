/*
 * @Author: songyu
 * @Date: 2021-08-11 20:22:28
 * @LastEditTime: 2021-08-11 20:51:48
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \美洽\test\src\App.tsx
 */
import React from "react";

const popupContainer = (trigger: any) => {
  if (trigger && trigger.classList.contains("ant-select")) {
    return trigger.parentElement || trigger.parentNode;
  }
  const container = document.getElementById("container");
  return container || document.body;
};

function App() {
  return 1212;
}

export default App;
