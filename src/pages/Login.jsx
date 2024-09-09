import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/user/authSlice";
import { useLoginMutation } from "../features/user/userApiSlice";
import ArrowIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
import Visibility from "../assets/svg/visibilityIcon.svg";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Oauth from "../components/Oauth";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "")
      return toast.error("please fill in all fields");
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials(res.user));
      navigate("/profile");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [navigate, user]);
  const { email, password } = formData;
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <div className="emailInputDiv">
            <input
              type="email"
              name="email"
              value={email}
              className="emailInput"
              placeholder="Email Address"
              id="email"
              onChange={onChange}
            />
          </div>
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
            <img
              className="showPassword"
              src={Visibility}
              onClick={() => setShowPassword((state) => !state)}
              alt="show password"
            />
          </div>
          <Link to="/forgotPassword" className="forgotPasswordLink">
            Forgot Password!
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button type="submit" className="signInButton">
              <ArrowIcon fill="white" width="34px" height="34px" />
            </button>
            {isLoading && <Spinner />}
          </div>
        </form>
        <Oauth />
        <Link to="/signup" className="registerLink">
          Sign up Instead!
        </Link>
      </div>
    </>
  );
};

export default Login;
