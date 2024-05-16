import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../../Redux/slice/requestSlice.js";
import { useState } from "react";

function Modal({ issuedBook }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { response } = useSelector((state) => state.requestApi);

  const [duration, setDuration] = useState(1);
  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header border-0 ">
              <h1 className="fs-5 fw-bold " id="exampleModalToggleLabel2">
                Number Days
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <input
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              type="number"
              className="form form-control w-75 m-auto bg-light   "
            />
            <div className="modal-footer border-0 ">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {response?.book?.issuedBook ? (
                <button className="btn btn-danger" disabled>
                  <i className="bi bi-check2-all"></i>
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      fetchData({
                        formData: { duration },
                        endPoint: `book/issued/${id}`,
                        method: "post",
                      })
                    )
                  }
                  className="btn btn-danger"
                >
                  Save Change
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
