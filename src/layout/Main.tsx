import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
