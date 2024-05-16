import lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../../validation/validation.js";
import { logIn } from "../../validation/validationSchema.js";
import { clearUser, fetchData } from "../../Redux/slice/requestSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CreateError from "../CreateError/CreateError.jsx";
import Logo from "../Logo/Logo.jsx";
export default function LogIn() {
  const container = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { loading, response, error } = useSelector((state) => state.requestApi);
  console.log("logIn", error, response);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState([]);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./../../images/logIn.json"),
    });
  }, []);
  useEffect(() => {
    if (response.message === "login success") {
      localStorage.setItem("token", response.token);
      navigate("/");
      dispatch(clearUser());
    }
  }, [response, navigate, dispatch]);
  function getFormData(e) {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }
  function sendDataToApi(e) {
    e.preventDefault();
    seterrors(validation(logIn, formData));
    if (!errors.error) {
      dispatch(fetchData({ formData, endPoint: "auth/logIn", method: "post" }));
    }
  }
  return (
    <>
      <Logo color={"text-black"} />
      <div className="container ">
        {error && (
          <div class="alert alert-danger w-50 m-auto mb-3  " role="alert">
            <div className="text-center fw-bold">Server Error</div>
          </div>
        )}
        <div className="row d-flex justify-content-center  align-items-center vh">
          <div className="image  d-md-none d-lg-block  col-lg-5   ">
            <div className="w-100" ref={container}></div>
          </div>
          <div className="col-lg-7 ">
            <form
              onSubmit={sendDataToApi}
              className="form mx-2 p-5  d-flex flex-column  text-center bg-light bg-opacity-25 shadow-lg  rounded-2 "
            >
              <h1 className="fw-bold mb-3">LogIn Now</h1>
              <input
                onChange={(e) => {
                  getFormData(e);
                }}
                type="email"
                className="form-control mb-2 p-2 "
                placeholder=" Enter your email"
                name="email"
              />
              <p className=" text-start  text-danger p-0 mt-0 mb-1">
                {response[0]?.error}
              </p>
              <CreateError name={"email"} errors={errors} />
              <input
                onChange={(e) => {
                  getFormData(e);
                }}
                type="password"
                className="form-control mb-2 p-2 "
                placeholder=" Enter your password"
                name="password"
              />
              <CreateError name={"password"} errors={errors} />
              <button
                className="bg-danger border-0 text-light  rounded-2 p-2  my-3"
                type="submit"
              >
                {loading ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "logIn"
                )}
              </button>
              <p>
                Already not have account?{" "}
                <Link to={"/sginUp"} className=" text-decoration-none" href="#">
                  SginUp Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
