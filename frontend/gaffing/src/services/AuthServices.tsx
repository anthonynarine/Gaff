import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { getUserIdFromToken } from "./getUserIdFromToken";

export function useAuthService(): AuthServiceProps {
  /**
   * Extracts user_id from the payload of a given JWT token.
   *
   * @param {string} token - A JWT token string.
   * @returns {string} - Returns the user_id extracted from the token payload.
   */

  const getUserDetails = async () => {
    
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("access_token")


      const response = await axios.get(
        `http://localhost:8000/api/account/?user_id=${userId}`, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            }
        }
      );
      const userDetails = response.data
      localStorage.setItem("username", userDetails);
      console.log("username => ", userDetails.username);
    } catch (error) {
      console.log("Error fetching user details", error);
    }
    
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      const { access, refresh } = response.data;

      const userId = getUserIdFromToken(access);

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userId", userId);
      getUserDetails()
      console.log("AUTH DATA =>", response);
    } catch (error) {
      return error;
    }
  };

  return { login, getUserDetails };
}

