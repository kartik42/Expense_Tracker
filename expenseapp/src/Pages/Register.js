import { Button, Form, Input, message } from "antd";
import React,{ useState , useEffect} from "react";

import validator from 'validator'
import { Link, useNavigate } from "react-router-dom";
import '../Resources/Authentication.css';
import axios from 'axios';
import Spinner from "../Components/Spinner"
// import validator from 'validator'
// import DefaultLayout from "../Components/DefaultLayout";
function Register() {
  const [loading,setLoading]=useState(false)
  const [password, setPassword] = useState("");
  const navigate = useNavigate(true);

  const [errorMessage, setErrorMessage] = useState('')
 
  const validate = (value) => {
 
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Is Strong Password')
      return true;
    } else {
      setErrorMessage('Is Not Strong Password')
      return false;
    }
  }
 
    const onFinish=async(values)=>{
        
      if(validate(values["password"])){

      
        try {
          setLoading(true)
          await axios.post('/api/users/register',values)
          message.success("registration sucessful");
          setLoading(false)
        } catch (error) {
           message.error("something went wrong");
           setLoading(false)
        }

      }
      else{

          
        var numUpper = values["password"].length - values["password"].replace(/[A-Z]/g, '').length; 
        console.log("Upper case chars = ",numUpper);

        var numLower = values["password"].length - values["password"].replace(/[a-z]/g, '').length; 
        console.log("Lower case chars = ",numLower);

        if(values["password"].length < 8){
        message.error("Password too short : Min length 8 characters");

        }
        
      

        else if(numUpper <= 0 ){
          message.error("Password must contain one upper case character");
        }

        else if(numLower <= 0 ){
          message.error("Password must contain one lower case character");
        }

        else if(values["password"].replace(/[^0-9]/g, '').length <= 0){
          message.error("Password must contain one digit");
        }

        else{
          message.error("Password must contain one special character");
        }



       

      }
    }

    const handleChange = (e)=>{

      console.log(e.target.value);

    }

    useEffect(() => {
      if (localStorage.getItem("dema-user")) {
        navigate("/");
      }
    }, []);


  return (
    <div className="register">
      {loading && <Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>DEMA / REGISTER</h1>
            <hr/>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered? Click here to login</Link>
              <button className="primary" type="submit">REGISTER</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Register;
