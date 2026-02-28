import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();


  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/received", {
          withCredentials: true,
        });

        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchRequest();
  }, [dispatch]);
  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="text-bold text-2xl flex justify-center my-10">No Request found</h1>;
  return (
    <div className="text-center my-10 animate-fade-in">
      <h1 className="font-jetbrains font-bold text-white text-4xl mb-8 tracking-tight">Connections Request</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-6 border border-white/10 rounded-2xl bg-[#111111]/80 backdrop-blur-xl w-11/12 md:w-2/3 lg:w-1/2 mx-auto shadow-2xl hover:-translate-y-1 transition-transform duration-300"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-xl object-cover border border-white/5"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-5 flex-1 text-gray-200">
              <h2 className="font-jetbrains font-bold text-2xl text-white">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p className="font-jetbrains text-xs text-[#00f5ff] my-1">{age + " yrs, " + gender}</p>}
              <p className="font-inter text-sm text-gray-400 line-clamp-2">{about}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="btn bg-black border border-error/40 text-error hover:border-error hover:bg-error/10 rounded-xl font-jetbrains transition-all" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
              <button className="btn bg-[#00f5ff]/10 border border-[#00f5ff]/50 text-[#00f5ff] hover-glow-cyan rounded-xl font-jetbrains transition-all shadow-md" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
