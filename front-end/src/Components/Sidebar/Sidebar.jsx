import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import logOut from "../../utilities/logOut.js";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <>
      <div className=" sidebar ">
        <div className="min-vh-100 bg-black ">
          <div className=" logo blockElemenSidebar">
            <Logo color={"text-white"} />
          </div>
          <ul className="text-light list-unstyled px-2 py-4 overflow-hidden ">
            <li className="px-3 py-1  ">
              <Link to="/" className="text-decoration-none text-light ">
                <i className="bi bi-house fs-3"></i>
                <span className="ms-3 block blockElemenSidebar">Home</span>
              </Link>
            </li>
            <li className=" px-3 py-1 ">
              <Link to="/addBook" className="text-decoration-none text-light  ">
                <i className="  bi fs-3 bi-cloud-plus"></i>
                <span className="ms-3 blockElemenSidebar">Create</span>
              </Link>
            </li>
            <li className="px-3 py-1 ">
              <Link to="/profile" className="text-decoration-none text-light ">
                <i className=" bi fs-3 bi-person-circle"></i>
                <span className="ms-3 blockElemenSidebar">Profile</span>
              </Link>
            </li>
            <li className=" px-3 py-1 ">
              <Link
                onClick={() => logOut(navigate)}
                className="text-decoration-none text-light "
              >
                <i className="fs-3 bi bi-box-arrow-left"></i>
                <span className="ms-3 blockElemenSidebar">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
