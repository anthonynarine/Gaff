export interface  AuthServiceProps {
    login: (username: string, password: string) => unknown;
    getUserDetails: () => Promise<void>;
    isLoggedIn: bollean;
    // logout: ()=> void;
}