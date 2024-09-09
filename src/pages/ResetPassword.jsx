/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
import Spinner from "../components/Spinner";
import {
  useResetPasswordMutation,
  useCheckExpiredTokenQuery,
} from "../features/user/userApiSlice";
import { useState, useEffect } from "react";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { dataa, error, isLoading2 } = useCheckExpiredTokenQuery(token);
  useEffect(() => {
    if (error) {
      navigate("/notFound");
    }
  }, [error, navigate]);
  const [password, setPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const onChange = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ password, token }).unwrap();
      console.log(res);
      toast.success("password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Reset your Password</p>
        <p>dont send this link</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="password"
            className="passwordInput"
            placeholder="New Password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
          />

          <div className="signInBar">
            <div className="signInText">Reset Password</div>
            <button className="signInButton" type="submit">
              <ArrowRightIcon fill="white" width="34px" height="34px" />
            </button>
            {isLoading && <Spinner />}
          </div>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
