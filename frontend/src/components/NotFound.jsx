/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import notFound from "../assets/notFound.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-64 h-64 mb-8">
        <img src={notFound} alt="notfound" />
      </div>
      <h1 className="text-4xl font-bold text-[#FFD763] mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="px-4 py-2 bg-[#FFD763] text-white rounded hover:bg-[#FFE082] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
