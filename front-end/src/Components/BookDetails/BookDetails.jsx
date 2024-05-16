import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux/slice/requestSlice.js";
import Loader from "../Loader/Loader.jsx";
import IssueModal from "./IssueModal.jsx";
function BookDetails() {
  const besUrl = "http://localhost:5001/";
  const dispatch = useDispatch();
  const navidate = useNavigate();
  const { response, loading, error } = useSelector((state) => state.requestApi);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchData({ endPoint: `book/bookDetails/${id}`, method: "get" }));
  }, [id, dispatch]);
  useEffect(() => {
    if (response.message === "Success Book Deleted") navidate("/");
    return;
  }, [response.message, navidate]);

  function deletBook() {
    dispatch(fetchData({ endPoint: `book/delete/${id}`, method: "post" }));
  }
  return (
    <>
      {loading && <Loader />}
      <div className="overflow-hidden  ">
        <div className="row ">
          {<IssueModal issuedBook={response?.book?.issuedBook} />}
          <div className="col-2">
            <div className=" position-fixed  ">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 p-5 ">
            {error && (
              <div class="alert alert-danger w-50 m-auto mb-3  " role="alert">
                <div className="text-center fw-bold">Server Error</div>
              </div>
            )}
            <div className="row ">
              <div className=" col-lg-4 p-0 ">
                <div className=" pe-lg-5  text-center">
                  <img
                    className="w-100 rounded"
                    src={`${besUrl}${response?.book?.bookPicture}`}
                    alt=""
                  />
                  <h6 className="h3 fw-bold mb-1 m-2 ">
                    {response?.book?.bookName.charAt(0).toUpperCase() +
                      response?.book?.bookName.slice(1)}
                  </h6>
                  <p className="fs-5 opacity-50   ">
                    {response?.book?.bookAuthor.charAt(0).toUpperCase() +
                      response?.book?.bookAuthor.slice(1)}
                  </p>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="ps-lg-5">
                  <p className="text-secondary ">
                    <span className="fw-bold text-black ">Category : </span>
                    {response?.book?.bookCategory}
                  </p>
                  <p className="text-secondary ">
                    <span className="fw-bold text-black ">Issued : </span>
                    {response?.book?.issuedBook ? "Yes" : "NO"}
                  </p>
                  <p className="text-secondary ">
                    <span className="fw-bold text-black ">Description : </span>
                    {/* {response?.book?.bookCategory} */}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Modi labore reprehenderit laboriosam molestiae, numquam
                    nesciunt voluptas culpa repudiandae nostrum rerum, explicabo
                    quasi sapiente nihil harum, asperiores nulla! Quam ullam
                    amet tempora veritatis, aperiam eveniet aliquam ratione vero
                    aspernatur dolores voluptatem vel, adipisci molestiae?
                    Laudantium perferendis cumque, cum consectetur error, rem
                    nobis veritatis quisquam, beatae molestias et ullam
                    cupiditate inventore quaerat sint delectus? Amet ratione,
                    non debitis sapiente dolorem ipsa nesciunt obcaecati natus
                    quis rerum corrupti veniam. Voluptas harum facilis
                    voluptatum, asperiores eum accusantium molestias veniam,
                    libero impedit nam blanditiis! Officia amet dolores sint
                    quas corporis consectetur blanditiis hic pariatur tempore.
                  </p>
                  <button
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                    className="btn btn-danger me-3 mb-3 "
                  >
                    Issue this book now
                  </button>
                  <button
                    onClick={deletBook}
                    className="btn btn-secondary me-3 mb-3 "
                  >
                    Delete this book now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
