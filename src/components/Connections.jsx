import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnections(res.data.data));
      } catch (err) {
        // Handle Error Case
        console.error(err);
      }
    };
    fetchConnections();
  }, [dispatch]);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10 animate-fade-in">
      <h1 className="font-jetbrains font-bold text-white text-4xl mb-8 tracking-tight">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex items-center m-4 p-6 border border-white/10 rounded-2xl bg-[#111111]/80 backdrop-blur-xl w-11/12 md:w-2/3 lg:w-1/2 mx-auto shadow-2xl hover:-translate-y-1 transition-transform duration-300"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-xl object-cover border border-white/5"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-6 flex-1 text-gray-200">
              <h2 className="font-jetbrains font-bold text-2xl text-white">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p className="font-jetbrains text-xs text-[#7c3aed] my-1">{age + " yrs, " + gender}</p>}
              <p className="font-inter text-sm text-gray-400 line-clamp-2">{about}</p>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn bg-[#00f5ff]/10 border border-[#00f5ff]/50 text-[#00f5ff] hover-glow-cyan rounded-xl font-jetbrains px-8 transition-all shadow-md">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;