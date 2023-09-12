
import { Link } from "react-router-dom";
import { MdDoneOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
type propType = {
  title: string;
  paid: boolean;
  amount: number;
  _id: string;
  category: string;
};
const SmallSingleDebts = ({ title, paid, amount, _id, category }: propType) => {
  return (
    <Link
      to={"/debt/" + _id}
      className={paid ? "small-single-debt debt-paid" : "small-single-debt"}
    >
      <h3> {title && title.length > 25 ? `${title.slice(0,25)}...` : title} </h3>
      <h3> ${amount} </h3>
      <h3> {category} </h3>
      <h3> {paid ? <MdDoneOutline /> : <GiCancel />} </h3>
    </Link>
  );
};

export default SmallSingleDebts;
