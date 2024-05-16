import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { useEffect } from "react";
import { fetchData } from "../../Redux/slice/requestSlice.js";
import MapOnIssuedBook from "./mappingBook.jsx";
import Loader from "../Loader/Loader.jsx";
function IssuedBook() {
  const dispatch = useDispatch();
  let { response, loading, error } = useSelector((state) => state.requestApi);
  useEffect(() => {
    dispatch(fetchData({ endPoint: "book/issuedBooks", method: "get" }));
  }, [dispatch]);
  console.log(response);
  return (
    <>
      {loading && <Loader />}
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed ">
              <Sidebar />
            </div>
          </div>
          <div className="mt-5 text-center  col-10 px-5 ">
            {error && (
              <div class="alert alert-danger w-50 m-auto mb-3  " role="alert">
                <div className="text-center fw-bold">Server Error</div>
              </div>
            )}
            <h1 className="mb-3">All Issued Books</h1>
            <table className="table border border-secondary border-opacity-50 table-hover table-secondary  table-striped ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Issue Date</th>
                  <th>Return Book</th>
                </tr>
              </thead>
              <tbody>
                {response?.books?.length > 0 ? (
                  <MapOnIssuedBook books={response?.books} />
                ) : (
                  <tr>
                    <td className="fw-bold" colSpan={6}>
                      No Issued Books Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default IssuedBook;
