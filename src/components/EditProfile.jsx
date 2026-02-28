import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //clear errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  const [error, setError] = useState("");
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card w-96 bg-[#111111]/80 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in card-lg">
            <div className="card-body">
              <h2 className="card-title text-3xl font-jetbrains font-bold text-white mb-4">Edit Profile </h2>
              <div className="my-3 space-y-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-inter font-semibold text-gray-400">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-inter font-semibold text-gray-400">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-inter font-semibold text-gray-400">PhotoURL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-inter font-semibold text-gray-400">Age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-inter font-semibold text-gray-400">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-inter font-semibold text-gray-400">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input w-full bg-black border border-white/10 focus:border-[#00f5ff] focus:outline-none transition-all rounded-xl text-gray-200 font-inter"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="justify-center card-actions mt-4">
                <button className="btn w-full bg-[#00f5ff]/10 border border-[#00f5ff]/50 text-[#00f5ff] hover-glow-cyan transition-all duration-300 text-lg rounded-xl font-jetbrains font-medium shadow-md" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-[100] mt-10 animate-fade-in">
          <div className="alert bg-[#111111]/90 backdrop-blur-xl border border-[#00f5ff]/50 text-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.3)] font-jetbrains rounded-xl">
            <span>✓ Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
