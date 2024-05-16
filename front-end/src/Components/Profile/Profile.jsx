import { Link } from "react-router-dom";
import returnedImage from "../../images/issued.png";
import issuedImage from "../../images/issue1.png";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { motion } from "framer-motion";

function Profile() {
  return (
    <>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed ">
              <Sidebar />
            </div>
          </div>
          <div className="col-10 ">
            <div className=" d-lg-flex justify-content-around  align-items-center min-vh-100 text-center  ">
              <Link
                to="NonReturnedBook"
                className=" text-decoration-none text-black d-block p-5 "
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <div className="returned-books bg-danger bg-opacity-25 rounded-2 py-3  ">
                    <img src={returnedImage} className="w-50" alt="" />
                    <p className="fs-3 fw-bold ">Non Returned Books</p>
                  </div>
                </motion.div>
              </Link>
              <Link
                to="issuedBooks"
                className="text-decoration-none text-black d-block  p-5   "
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="issued-books bg-primary  bg-opacity-25  rounded-2 py-3 ">
                    <img src={issuedImage} className="w-50 " alt="" />
                    <p className="fs-3 fw-bold ">Issued Books</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
