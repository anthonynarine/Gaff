export interface  AuthServiceProps {
    login: (username: string, password: string) => unknown;
    getUserDetails: () => Promise<void>;
    // logout: ()=> void;
}