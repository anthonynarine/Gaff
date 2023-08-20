import { useAuthContext } from "../components/context/AuthContext";

const TestLogin = () => {
    const { isLoggedIn } = useAuthContext();


    return(

        <>
        {isLoggedIn.toString()}
        </>
    )
};

export default TestLogin;