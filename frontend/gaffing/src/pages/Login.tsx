import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../components/context/AuthContext";

const Login = () => {
  const { login } = useAuthServiceContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
        const { username, password } = values;
        const response = await login(username, password);
        if (response){
            console.log(response);
            navigate("/")
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
      </form>
    </>
  );
};

export default Login;
