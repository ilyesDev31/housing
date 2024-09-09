import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
import { useForgotPasswordMutation } from "../features/user/userApiSlice";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success("we sent a validation email to your email box");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password!</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link to="/login" className="forgotPasswordLink">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton" type="submit">
              {" "}
              <ArrowRightIcon fill="white" width="34px" height="34px" />{" "}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
