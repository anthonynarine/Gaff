import { useAuthContext } from "../components/context/AuthContext";
import { useState } from "react";
import axios from "axios";
import useAxiosWithInterceptor from "../helper/jwtinterceptor";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthContext();
  const [ username, setUserName ] = useState("");
  const jwtAxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("access_token");

      const response = await jwtAxios.get(
        `http://localhost:8000/api/account/?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userDetails = response.data 
      setUserName(userDetails.username)
    } catch (error) {
      console.log("Error fetching user details", error);
    }
  };

  return (
    <>
      <div>{isLoggedIn.toString()}</div>
      <div>
        <button onClick={logout}>Logout</button>
        <button onClick={getUserDetails}>Get User Detial</button>
      </div>
      <div>Username: {username}</div>
    </>
  );
};

export default TestLogin;
