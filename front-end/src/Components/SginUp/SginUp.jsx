import lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
import Logo from "../Logo/Logo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateError from "../CreateError/CreateError.jsx";
import validation from "../../validation/validation.js";
import { sginUp } from "../../validation/validationSchema.js";
import { fetchData } from "../../Redux/slice/requestSlice.js";
export default function SginUp() {
  const { response, loading, error } = useSelector((state) => state.requestApi);
  console.log(response, loading, error);
  const dispatch = useDispatch();

  const [errors, seterrors] = useState([]);
  const [formData, setFormData] = useState({
    userName: "abdallh",
    email: "",
    password: "",
    phone: "",
  });
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./../../images/sginUp.json"),
    });
  }, []);
  function getDataFromUser(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function submitData(e) {
    e.preventDefault();
    seterrors(validation(sginUp, formData));
    if (!errors.error) {
      dispatch(
        fetchData({ formData, endPoint: "auth/sginUp", method: "post" })
      );
    }
    return;
  }
  return (
    <>
      <Logo color={"text-black"} />
      <div className="container  ">
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
              onSubmit={(e) => {
                submitData(e);
              }}
              className="form p-5  d-flex flex-column  text-center bg-light bg-opacity-25 shadow-lg  rounded-2 "
            >
              <h1 className="fw-bold mb-3">Sign Up Now</h1>

              <input
                onChange={(e) => {
                  getDataFromUser(e);
                }}
                className="form-control mb-2  "
                placeholder=" Enter your name"
                type="text"
                name="userName"
              />
              <CreateError name={"userName"} errors={errors} />

              <input
                onChange={(e) => {
                  getDataFromUser(e);
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
                  getDataFromUser(e);
                }}
                type="password"
                className="form-control mb-2 p-2 "
                placeholder=" Enter your password"
                name="password"
              />
              <CreateError name={"password"} errors={errors} />

              <input
                onChange={(e) => {
                  getDataFromUser(e);
                }}
                type="number"
                className="form-control mb-2 p-2 "
                placeholder=" Enter your phone"
                name="phone"
              />
              <CreateError name={"phone"} errors={errors} />
              <button
                className="bg-danger border-0 text-light  rounded-2 p-2  my-3"
                type="submit"
              >
                {loading ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "Sgin Up"
                )}
              </button>

              {response[0]?.message === "success" && (
                <div className="alert alert-success p-1 fw-bold">
                  Check your email
                </div>
              )}
              <p>
                Already have account?{" "}
                <Link to={"/logIn"} className=" text-decoration-none  ">
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
