import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    verifyPremiumUser();
  }, []);

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return isUserPremium ? (
    "You're are already a premium user"
  ) : (
    <div className="m-10 animate-fade-in mt-20">
      <div className="flex w-full max-w-5xl mx-auto gap-8 flex-col md:flex-row justify-center items-center">
        <div className="card bg-[#111111]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl flex-1 w-full h-auto min-h-[400px] p-8 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
          <div className="text-center">
            <h1 className="font-jetbrains font-bold text-3xl text-white mb-6">Silver Membership</h1>
            <ul className="text-gray-400 space-y-3 font-inter text-lg text-left inline-block">
              <li className="flex gap-3 items-center"><span className="text-[#00f5ff] font-bold">✓</span> Chat with other people</li>
              <li className="flex gap-3 items-center"><span className="text-[#00f5ff] font-bold">✓</span> 100 connection requests per day</li>
              <li className="flex gap-3 items-center"><span className="text-[#00f5ff] font-bold">✓</span> Blue Tick</li>
              <li className="flex gap-3 items-center"><span className="text-[#00f5ff] font-bold">✓</span> 3 months validity</li>
            </ul>
          </div>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn w-full bg-[#00f5ff]/10 border border-[#00f5ff]/50 text-[#00f5ff] hover-glow-cyan rounded-xl font-jetbrains text-lg mt-8 transition-all"
          >
            Buy Silver
          </button>
        </div>
        
        <div className="divider md:divider-horizontal text-gray-500 font-jetbrains">OR</div>
        
        <div className="card bg-[#111111]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl flex-1 w-full h-auto min-h-[400px] p-8 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
          <div className="text-center">
            <h1 className="font-jetbrains font-bold text-3xl text-white mb-6">Gold Membership</h1>
            <ul className="text-gray-400 space-y-3 font-inter text-lg text-left inline-block">
              <li className="flex gap-3 items-center"><span className="text-[#7c3aed] font-bold">✓</span> Chat with other people</li>
              <li className="flex gap-3 items-center"><span className="text-[#7c3aed] font-bold">✓</span> Infinite connection requests per day</li>
              <li className="flex gap-3 items-center"><span className="text-[#7c3aed] font-bold">✓</span> Blue Tick</li>
              <li className="flex gap-3 items-center"><span className="text-[#7c3aed] font-bold">✓</span> 6 months validity</li>
            </ul>
          </div>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn w-full bg-[#7c3aed]/10 border border-[#7c3aed]/50 text-[#7c3aed] hover-glow-purple rounded-xl font-jetbrains text-lg mt-8 transition-all"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};
export default Premium;