import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../features/user/userApiSlice";
import { setCredentials } from "../features/user/authSlice";
import ArrowIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
import Visibility from "../assets/svg/visibilityIcon.svg";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Oauth from "../components/Oauth";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [register, { isLoading }] = useRegisterMutation();
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [navigate, user]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
    try {
      const res = await register({ ...formData }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const { name, email, password } = formData;
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome!</p>
        </header>
        <form onSubmit={onSubmit}>
          <div className="nameInputDiv">
            <input
              type="text"
              name="name"
              value={name}
              className="nameInput"
              placeholder="Username"
              onChange={onChange}
            />
          </div>
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
          <Link to="/login" className="forgotPasswordLink">
            Already have an account!
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign Up</p>
            <button type="submit" className="signInButton">
              <ArrowIcon fill="white" width="34px" height="34px" />
            </button>
            {isLoading && <Spinner />}
          </div>
        </form>
        <Oauth />
      </div>
    </>
  );
};

export default SignUp;
