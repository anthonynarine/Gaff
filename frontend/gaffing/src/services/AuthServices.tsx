import axios from "axios"
import { AuthServiceProps } from "../@types/auth-service";


export function useAuthService(): AuthServiceProps {
    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/", {
                    username, 
                    password,
                }
            );
            console.log("AUTH DATA", response)
            
        } catch (error) {
            return error;
        }
    }
    return {login}
}