import logo from "./Images/Narayana_Health_Logo.jpg";
import { Link } from "react-router-dom";
const Hero = ({ text }) => {
  return (
    <div>
      <header className="sticky-top text-white p-5 hero-container">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" height={70} width={200} />
        </Link>
        <div className="hero-text">{text}</div>
        <div className="links">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link to="/about" className="ablink" aria-current="page">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="ablink login">
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="ablink signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
    //src/Components/Images/Narayana_Health_Logo.jpg
  );
};
export default Hero;
