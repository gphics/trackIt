import { Link } from "react-router-dom";
import Piggy from "../asset/Piggy.svg";
const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="text-section">
        <h3>Get paid easily without hassle</h3>
        <p>
          You only have the opportunity to say you lose your money due to debts
          yesterday, but today there's <span>trackIt</span> to help you out.{" "}
        </p>
        <section className="link-holder">
          <Link to="/landing-page/register" className="reg-link">
            register
          </Link>
        </section>
      </section>
      <section className="hero-section">
        <img src={Piggy} alt="save money ..." />
      </section>
    </div>
  );
};

export default LandingPage;
