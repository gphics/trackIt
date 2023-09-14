import { Link } from "react-router-dom";
import ErrorPageImage from "../asset/NotFound.svg"
const ErrorPage = () => {

  return (
    <div className="error-page">
      <img src={ErrorPageImage} alt="not found" />
      <Link className="back" to="/">Back</Link>
    </div>
  );
};

export default ErrorPage;
