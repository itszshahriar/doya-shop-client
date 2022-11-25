import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const { loginUser, loginGoogle } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const { token } = useToken(loginUserEmail);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleLogin = (data) => {
    setLoginError("");
    loginUser(data?.email, data?.password)
      .then((result) => {
        setLoginUserEmail(data?.email);
        reset();
      })
      .catch((err) => setLoginError(err.message));
  };

  const googleLogin = () => {
    setLoginError("");
    loginGoogle()
      .then((result) => {
        const user = result.user;
        setLoginUserEmail(user?.email);
      })
      .catch((err) => setLoginError(err.message));
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <div>{loginError && <p className="text-red-600">{loginError}</p>}</div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full hover:rounded-full"
            value="Login"
            type="submit"
          />
        </form>
        <p>
          New to Doya Shop Buy Sell Bazar{" "}
          <Link className="text-secondary" to="/register">
            Register
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={googleLogin}
          className="btn btn-outline w-full hover:rounded-full"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
