import axios, { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";


/**
 * Custom hook to create an Axios instance with an interceptor for handling authentication errors.
 *
 * @returns {AxiosInstance} The Axios instance with the interceptor.
 */
const useAxiosWithInterceptor = (): AxiosInstance => {
  // Get the API base URL from the config.
  const API_BASE_URL = BASE_URL;

  // Create a new Axios instance with the API base URL.
  const jwtAxios = axios.create({ baseURL: API_BASE_URL });

  // Get the `navigate` function from react-router-dom.
  const navigate = useNavigate();

  // Add an Axios interceptor to handle authentication errors.
  jwtAxios.interceptors.response.use(
    (response) => {
      // If the response is successful, simply return it.
      return response;
    },
    async (error) => {
      // If the response status is 401 (Unauthorized), redirect the user to the home page.
      if (error.response?.status === 401) {
        const goHome = () => navigate("/");
        goHome();
      }
    }
  );

  // Return the Axios instance with the interceptor.
  return jwtAxios;
};

export default useAxiosWithInterceptor;

