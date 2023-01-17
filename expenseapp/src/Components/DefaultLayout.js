import React from "react";
import "../Resources/DefaultLayout.css";
import { Button, Dropdown, Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("dema-user"));
  const navigate = useNavigate()
  const menu = (
    <Menu
      items={[
        {
          label: (
            <li onClick={()=>{
                localStorage.removeItem('dema-user')
                navigate("/landing-page");
            }}>Logout</li>
          ),
        },
        
      ]}
    />
  );
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">DEMA</h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className='primary'>{user.name}</button>
          </Dropdown>
        </div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
}
export default DefaultLayout;
