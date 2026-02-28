import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
    };

    const handleSignUp = async () => {
      try {
        const res =await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, emailId, password },
          { withCredentials: true },
        );
         dispatch(addUser(res.data.data));
      return navigate("/profile");
      } catch (err) {
        setError(err?.response?.data || "Something went wrong");
      }
    };
  return (
    <div className="flex justify-center my-16 px-4">
      <div className="card w-full max-w-md bg-[#111111]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 animate-fade-in">
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-jetbrains font-bold text-white justify-center mb-6">
            <span className="text-[#00f5ff]">_</span>{isLoginForm ? "Welcome Back" : "Create Account"}
          </h2>
          <div className="space-y-4">
            {!isLoginForm && (
              <div className="flex gap-4">
                <fieldset className="fieldset flex-1">
                  <legend className="fieldset-legend font-semibold text-gray-400 font-inter">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                    placeholder="Jane"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset flex-1">
                  <legend className="fieldset-legend font-semibold text-gray-400 font-inter">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-400 font-inter">Email Address</legend>
              <input
                type="text"
                value={emailId}
                className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                placeholder="dev@example.com"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-gray-400 font-inter">Password</legend>
              <input
                type="password"
                value={password}
                className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          {error && <p className="text-error text-sm font-medium mt-4 text-center">{error}</p>}
          
          <div className="card-actions mt-8">
            <button
              className="btn w-full bg-[#00f5ff]/10 border border-[#00f5ff]/50 text-[#00f5ff] hover-glow-cyan transition-all duration-300 text-lg rounded-xl font-jetbrains font-medium"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login to Dashboard" : "Start Coding"}
            </button>
          </div>
          
          <div className="divider my-6 text-gray-500 text-sm font-jetbrains">OR</div>
          
          <p
            className="text-center cursor-pointer text-sm font-medium text-gray-400 hover:text-[#00f5ff] transition-colors font-inter"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New developer? Create an account"
              : "Already a member? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
