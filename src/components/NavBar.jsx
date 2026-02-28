import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { clearRequests } from "../utils/requestSlice";
import { removeConnections } from "../utils/connectionSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearRequests());
      dispatch(removeConnections());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10 px-6 animate-fade-in shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-jetbrains font-bold tracking-tight gap-2 hover:glow-text-cyan transition-all duration-300">
          <span className="text-[#00f5ff]">{`</>`}</span>
          <span className="text-gray-100">DevTinder</span>
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-4">
          <div className="hidden sm:block text-sm font-medium tracking-wide text-gray-300 font-jetbrains">Welcome, <span className="text-[#00f5ff]">{user.firstName}</span></div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#111111]/90 backdrop-blur-xl border border-white/10 text-gray-200 rounded-2xl z-[1] mt-3 w-52 p-2 shadow-2xl"
            >
              <li>
                <Link to="/profile" className="justify-between hover:bg-[#00f5ff]/10 hover:text-[#00f5ff] transition-colors rounded-xl font-medium">
                  Profile
                  <span className="badge bg-[#00f5ff]/20 text-[#00f5ff] border-none font-jetbrains px-2 py-1 text-xs rounded-md">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-[#00f5ff]/10 hover:text-[#00f5ff] transition-colors rounded-xl font-medium">Connections</Link>
              </li>

              <li>
                <Link to="/requests" className="hover:bg-[#00f5ff]/10 hover:text-[#00f5ff] transition-colors rounded-xl font-medium">Requests</Link>
              </li>
              <li>
                <Link to="/premium" className="hover:bg-[#7c3aed]/10 hover:text-[#7c3aed] transition-colors rounded-xl font-medium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="hover:bg-error/10 hover:text-error transition-colors rounded-xl font-medium">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;