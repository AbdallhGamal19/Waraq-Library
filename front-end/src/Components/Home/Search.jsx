import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchData } from "../../Redux/slice/requestSlice.js";

function Search() {
  const dispatch = useDispatch();
  const [bookName, setBookName] = useState("");
  useEffect(() => {
    if (bookName === "") {
      dispatch(fetchData({ endPoint: "book", method: "get" }));
    }
  }, [bookName, dispatch]);
  function sendData() {
    dispatch(
      fetchData({
        endPoint: "book/search",
        method: "post",
        formData: { bookName },
      })
    );
  }
  return (
    <motion.div
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      // transition={{ delay: 0.5, duration: 1 }}
      className="form d-flex "
    >
      <input
        onChange={(e) => setBookName(e.target.value)}
        className="form-control me-3 p-2"
        type="text"
        placeholder="Enter Book Name..."
      />
      <button onClick={sendData} className=" btn bg-danger text-white  ">
        Search
      </button>
    </motion.div>
  );
}

export default Search;
