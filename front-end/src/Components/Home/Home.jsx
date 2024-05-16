import { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux/slice/requestSlice.js";
import ItemDetails from "../ItemDetails/ItemDetails.jsx";
import Loader from "../Loader/Loader.jsx";
import Search from "./Search.jsx";
import "../../index.css";
function Home() {
  const dispatch = useDispatch();
  let { response, loading, error } = useSelector((state) => state.requestApi);
  useEffect(() => {
    dispatch(fetchData({ endPoint: "book", method: "get" }));
  }, [dispatch]);
  return (
    <>
      {loading && <Loader />}
      <div className="overflow-hidden ">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed ">
              <Sidebar />
            </div>
          </div>
          <div className="col-10 p-5  ">
            {error && (
              <div
                className="alert alert-danger w-50 m-auto mb-3  "
                role="alert"
              >
                <div className="text-center fw-bold">Server Error</div>
              </div>
            )}
            <Search />

            {response?.books?.length > 0 ? (
              <div className="row py-5">
                {response.books.map((book, index) => (
                  <ItemDetails book={book} key={index} />
                ))}
              </div>
            ) : (
              <div className="h2 text-center mt-5 fw-bold">No Books Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
