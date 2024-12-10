import React from "react";
import { Link } from "react-router-dom";

const userLogin = () => {
  return (
    <div className="p-7 h-screen justify-between flex flex-col">
     <div className="w-full">
      <img className="w-1/2" src='https://play-lh.googleusercontent.com/WYC9gStyqjfXXVMBiObUpIGH326nY-rRKLAqnmPKZDvrC8AIoKHCwNjkJCRQ44kuVA' alt="logo" />
     </div>
      <form>
        <h3 className="font-semibold text-lg mb-2">What your Email</h3>
        <input className="bg-[#eeee] rounded-md px-4 py-2 border w-full text-lg placeholder:text-md " type="email" required="true" placeholder="email@gmail.com" />
        <h3 className="font-semibold text-lg mt-4 mb-2">Enter Password</h3>
        <input className="bg-[#eeee] rounded-md px-4 py-2 border w-full text-lg placeholder:text-md " type="password" required="true" placeholder="password" />
        <button className="flex items-center justify-center w-full bg-black text-white py-3 rounded-xl mt-5">Login</button>
        <p className="text-start mt-1">Dont have a Account?<Link to="/captain-login" className="text-blue-600">Click here </Link>
        </p>
      </form>
      <div>
      <Link to="/captain-login" className="flex items-center justify-center w-full bg-blue-300 text-white py-3 rounded-xl mt-8">Login as Captain</Link>
     </div>
    </div>
  );
};

export default userLogin;
