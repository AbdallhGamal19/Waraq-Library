import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CornerRibbon from "../Home/CornerRibbon.jsx";
function ItemDetails({ book }) {
  const besUrl = "http://localhost:5001/";
  return (
    <Link
      to={`/bookDetails/${book._id}`}
      className=" d-block  gy-4 col-lg-3 col-md-4 col-sm-6 text-decoration-none   "
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-white bg-opacity-10 rounded shadow p-3 position-relative overflow-hidden   "
      >
        {book.issuedBook && <CornerRibbon />}

        <img
          className="w-75 img-height  shadow rounded  "
          src={`${besUrl}${book.bookPicture}`}
          alt=""
        />
        <div className="m-2 text-black p-0 mb-0">
          <h6 className="mb-0 fs-5">{book.bookName.toUpperCase()}</h6>
          <p className="opacity-50 mb-0">
            {book.bookAuthor.charAt(0).toUpperCase() + book.bookAuthor.slice(1)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default ItemDetails;
