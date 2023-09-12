import { useSelector } from "react-redux";

import SmallSingleDebts from "./SmallSingleDebts";

const AllDebt = () => {
  const { sortedDebts } = useSelector((state: any) => state.debtSlice);
  return sortedDebts.length > 0 ? (
    <div className="all-debt-component">
      <div className="small-single-debt singles-heading">
        <h3>title</h3>
        <h3>Amount</h3>
        <h3> category </h3>
        <h3> paid </h3>
      </div>
      {sortedDebts.map((elem: any, index: number) => (
        <SmallSingleDebts {...elem} key={index} />
      ))}
    </div>
  ) : (
    <div className="no-debt">
      <h1> No debt !!</h1>
    </div>
  );
};

export default AllDebt;
