import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  // console.log(user);
  const { _id,firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      console.log(`Sending ${status} request for user ${userId}`);
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      console.log('Post response:', response.data);
      dispatch(removeUserFromFeed(userId));
      console.log('Dispatched removeUserFromFeed');
    } catch (err) {
      console.log('Error inside handleSendRequest:', err);
    }
  };
  return (
    <div className="card bg-[#111111]/80 backdrop-blur-xl w-96 rounded-2xl shadow-2xl hover:shadow-[0_8px_30px_rgba(0,245,255,0.1)] hover:-translate-y-1 transition-all duration-300 border border-white/10 overflow-hidden animate-fade-in">
      <figure className="relative group p-4 pb-0">
        <img 
          src={photoUrl} 
          alt={`${firstName}'s Photo`} 
          className="w-full aspect-square object-cover rounded-xl border border-white/5" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90 transition-opacity duration-300"></div>
      </figure>
      <div className="card-body relative bg-transparent z-10 p-6 pt-4 text-gray-100">
        <h2 className="card-title text-2xl font-jetbrains font-bold tracking-tight text-white">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <div className="flex gap-2 my-2 font-jetbrains text-xs">
            <div className="badge bg-black badge-outline rounded-md px-3 py-3 border-[#00f5ff]/40 text-[#00f5ff]">{age} yrs</div>
            <div className="badge bg-black badge-outline rounded-md px-3 py-3 border-[#7c3aed]/40 text-[#7c3aed] capitalize">{gender}</div>
          </div>
        )}
        <p className="text-gray-400 text-sm mt-2 line-clamp-3 leading-relaxed font-inter">
          {about}
        </p>
        <div className="card-actions justify-between mt-6 gap-3">
          <button 
            className="btn flex-1 bg-black border border-error/40 text-error hover:border-error hover:bg-error/10 rounded-xl transition-all font-jetbrains font-medium" 
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button 
            className="btn flex-1 bg-[#00f5ff]/10 border border-[#00f5ff]/50 text-[#00f5ff] rounded-xl hover-glow-cyan transition-all shadow-md font-jetbrains font-medium" 
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
