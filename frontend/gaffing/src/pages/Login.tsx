import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        // console.log("Username + Password =>", username, password)
        const success = await login(username, password);
        if (success) {
          console.log(success);
          navigate("/testlogin");
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
      }
    },
  });
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
        ></input>
        <label>password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        ></input>
        <button type="submit">Submit</button>
        {/* <button onClick={() => navigate("/")}>Test Navigate</button> */}
      </form>
    </>
  );
};

export default Login;
