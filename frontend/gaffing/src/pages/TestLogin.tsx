import { useAuthContext } from "../components/context/AuthContext";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <>
      <div>{isLoggedIn.toString()}</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default TestLogin;
