import { setCredentials } from "../features/user/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/svg/googleIcon.svg";
const Oauth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="socialLogin">
      <p> Sign {location.pathname === "/signup" ? "up" : "in"} </p>
      <button className="socialIconDiv">
        <img className="socialIconImg" src={GoogleIcon} alt="google" />
      </button>
    </div>
  );
};

export default Oauth;
