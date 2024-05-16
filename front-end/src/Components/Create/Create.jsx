import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import lottie from "lottie-web";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux/slice/requestSlice.js";

function Create() {
  const { response, loading, error } = useSelector((state) => state.requestApi);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [author, setAuthor] = useState(null);
  const [photo, setPhoto] = useState(null);

  function SendData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("bookPicture", photo);
    dispatch(fetchData({ endPoint: "book/addBook", method: "post", formData }));
  }

  const container = useRef(null);
  useEffect(() => {
    if (response.message === "Success book added") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    }
  }, [response]);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../images/create.json"),
    });
  }, []);
  return (
    <>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed ">
              <Sidebar />
            </div>
          </div>
          <div className="col-10 d-flex flex-column  justify-content-center align-items-center min-vh-100 ">
            {error && (
              <div
                className="alert alert-danger w-50 m-auto mb-3  "
                role="alert"
              >
                <div className="text-center fw-bold">Server Error</div>
              </div>
            )}
            {response[0]?.error && (
              <div
                className="alert alert-danger w-50 m-auto mb-3  "
                role="alert"
              >
                <div className="text-center fw-bold">{response[0]?.error}</div>
              </div>
            )}
            <motion.div
              initial={{ y: -1000 }}
              animate={{ y: 0 }}
              className=" w-75 position-relative m-auto text-center bg-white  bg-opacity-25 shadow rounded-2 p-5 "
            >
              <div className="w-25 m-auto" ref={container}></div>
              <p className=" fw-bold fs-5 ">Enter Book Details Now ....</p>

              <form onSubmit={SendData}>
                <input
                  onChange={(e) => setPhoto(e.target.files[0])}
                  type="file"
                  id="bookPicture"
                  name="bookPicture"
                  className="form-control my-2 p-2"
                />
                {response?.details?.map(
                  (error, index) =>
                    error.context?.label === "bookPicture" && (
                      <div
                        key={index}
                        className=" text-start  text-danger p-0 mt-0 mb-1"
                      >
                        Picture required
                      </div>
                    )
                )}
                <input
                  type="text"
                  placeholder="Enter Book Name"
                  name="BookName"
                  className="form-control my-2 p-2"
                  onChange={(e) => setName(e.target.value.toLowerCase())}
                />
                {response?.details?.map(
                  (error, index) =>
                    error.context?.label === "name" && (
                      <div
                        key={index}
                        className=" text-start  text-danger p-0 mt-0 mb-1"
                      >
                        {error.message}
                      </div>
                    )
                )}
                <input
                  type="text"
                  placeholder="Enter Book Category"
                  className="form-control my-2 p-2"
                  name="category"
                  onChange={(e) => setCategory(e.target.value.toLowerCase())}
                />
                {response?.details?.map(
                  (error, index) =>
                    error.context?.label === "category" && (
                      <div
                        key={index}
                        className=" text-start  text-danger p-0 mt-0 mb-1"
                      >
                        {error.message}
                      </div>
                    )
                )}
                <input
                  type="text"
                  placeholder="Enter Book Auther"
                  name="author"
                  className="form-control my-2 p-2"
                  onChange={(e) => setAuthor(e.target.value.toLowerCase())}
                />
                {response?.details?.map(
                  (error, index) =>
                    error.context?.label === "author" && (
                      <div
                        key={index}
                        className=" text-start  text-danger p-0 mt-0 mb-1"
                      >
                        {error.message}
                      </div>
                    )
                )}
                {loading ? (
                  <button className="form-control my-2 p-2 btn btn-danger ">
                    <div className="spinner-border" role="status"></div>
                  </button>
                ) : (
                  <button className="form-control my-2 p-2 btn btn-danger ">
                    Add Book
                  </button>
                )}
                <div>
                  {showAlert && (
                    <div className="alert alert-success p-1 fw-bold">
                      book added
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
