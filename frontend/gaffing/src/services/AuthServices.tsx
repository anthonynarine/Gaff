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
    
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      const { access, refresh } = response.data;

      const userId = getUserIdFromToken(access);

      localStorage.setItem("access token", access);
      localStorage.setItem("refresh token", refresh);
      localStorage.setItem("userId", userId);
      console.log("AUTH DATA", response, localStorage);
    } catch (error) {
      return error;
    }
  };
  return { login };
}
