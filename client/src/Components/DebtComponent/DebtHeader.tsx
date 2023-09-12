import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useState } from "react";
import formInputAnn from "../../Utils/TypeAnnotations/formInputAnn";
import { debtSliceActions } from "../../Model/debtSlice";
import FormInput from "../../Utils/Others/FormInput";
const DebtHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.userSlice);
  const { updateSort } = debtSliceActions;
  const [infoViewState, setInfoViewState] = useState(false);
  const infoViewClass = infoViewState ? "main-content" : "main-content hide";
  function setView() {
    setInfoViewState((prev: boolean) => !prev);
  }
  function onChange(name: string, value: string) {
    // @ts-ignore
    dispatch(updateSort({name, value}));
  }
  const sortFotmInput: formInputAnn = {
    name: "sort",
    selectOptions: ["all","to_be_collected", "to_be_paid", "paid", "not_paid"],
    label: "sort",
    inputClass: "holder",
    type: "select",
    onChange,
    stateNames: { slice: "debtSlice", name: "sort" },
  };
  return (
    <header className="debt-page-header">
      <div className="info">
        <div className="control">
          <h4 className="note">view info </h4>
          {infoViewState ? (
            <BiSolidUpArrow
              onClick={setView}
              className="view-state-toggle-icon"
            />
          ) : (
            <BiSolidDownArrow
              onClick={setView}
              className="view-state-toggle-icon"
            />
          )}{" "}
        </div>

        <div className={infoViewClass}>
          <section className="to-be-paid">
            <h3>to be paid</h3>
            <h4> count : {user.totalDebtCount.to_be_paid} </h4>
            <h4> amount : ${user.totalDebtAmount.to_be_paid}</h4>
          </section>

          <section className="to-be-collected">
            <h3>to be collected</h3>
            <h4> count : {user.totalDebtCount.to_be_collected} </h4>
            <h4> amount : ${user.totalDebtAmount.to_be_collected}</h4>
          </section>
          <section className="already-paid">
            <h3>already paid</h3>
            <h4> amount:${user.totalPaidDebt.amount} </h4>
            <h4> count:{user.totalPaidDebt.count} </h4>
          </section>
        </div>
      </div>
      <form action="" className="sort-form">
        <label htmlFor="sort">Sort</label>
        {<FormInput {...sortFotmInput} />}
        {/* <select title="sort" name="sort" id="">
          <option value="to_be_collected">to be collected</option>
          <option value="to_be_paid">to be paid</option>
        </select> */}
      </form>
      <Link className="create-link" to="/debt/create">
        create
      </Link>
    </header>
  );
};

export default DebtHeader;
