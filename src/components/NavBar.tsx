import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="lg:h-24 md:h-20 h-16 bg-sky-400 flex justify-center items-center">
      <div className=" space-x-4">
        <Link to="/add-contact">
          <button className="bg-white py-2 px-5 rounded-xl">
            Add Contacts
          </button>
        </Link>
        <Link to="/">
          <button className="bg-white py-2 px-5 rounded-xl">
            All Contacts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
