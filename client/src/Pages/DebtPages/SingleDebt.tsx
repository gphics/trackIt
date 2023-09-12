import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userSliceActions } from "../../Model/userSlice";
import fetchData from "../../Utils/DataFetch/fetchData";
import { toast } from "react-toastify";
import { debtSliceActions } from "../../Model/debtSlice";
import { useEffect } from "react";
const SingleDebt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleDebt } = useSelector((state: any) => state.debtSlice);
  const { updateIsLoading, logout } = userSliceActions;
  const { fillSingleDebt, clearSingleDebt } = debtSliceActions;
  async function fetchDebt() {
    dispatch(updateIsLoading(true));
    const data = await fetchData("debt/" + id);

    if (data) {
      dispatch(updateIsLoading(false));

      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout);
        }
        toast.error(data);
        return;
      }
      dispatch(fillSingleDebt(data.data));
    }
  }
  useEffect(() => {
    fetchDebt();
  }, [id]);
  type arrType = {
    name: string;
    value: string | number;
  };
  const arr: arrType[] = singleDebt && [
    { name: "title", value: singleDebt.title },
    { name: "amount", value: singleDebt.amount },
    { name: "paid", value: singleDebt.paid },
    { name: "debt info", value: singleDebt.debtInfo },
    { name: "category", value: singleDebt.category },
    { name: "incurred date", value: singleDebt.incurredDate },
    { name: "deadline", value: singleDebt.deadline },
  ];
  function showOtherInfo(obj: any): boolean {
    if (obj?.location || obj.contact || obj.name) {
      return true;
    }
    return false;
  }
  async function deleteDebt(e: any) {
    dispatch(updateIsLoading(true));
    const data = await fetchData("debt/delete/" + singleDebt._id, "DELETE");
    if (data) {
      dispatch(updateIsLoading(true));
      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);
      }

      toast.success(data.data);
      dispatch(clearSingleDebt());
      navigate("/debt");
      return;
    }
  }
  return singleDebt?._id ? (
    <div className="single-debt-page">
      <h4>Debt Information</h4>
      <div className="debt-info">
        {arr.map(({ name, value }: arrType, index) => {
          return (
            value !== "" && (
              <div className="debt-info-list" key={index}>
                <h5> {name} </h5>
                <p>
                  {" "}
                  {name === "amount"
                    ? `$${value}`
                    : name === "paid"
                    ? value.toString()
                    : value}{" "}
                </p>
              </div>
            )
          );
        })}
      </div>
      {showOtherInfo(singleDebt.creditorInfo) && (
        <div className="creditor-info">
          <h4>creditor Information</h4>
          <ul>
            <li>name :{singleDebt.creditorInfo.name} </li>
            <li>location :{singleDebt.creditorInfo.location} </li>
            <li>contact :{singleDebt.creditorInfo.contact} </li>
          </ul>
        </div>
      )}
      {showOtherInfo(singleDebt.debtorInfo) && (
        <div className="creditor-info">
          <h4>debtor Information</h4>
          <ul>
            <li>name :{singleDebt.debtorInfo.name} </li>
            <li>location :{singleDebt.debtorInfo.location} </li>
            <li>contact :{singleDebt.debtorInfo.contact} </li>
          </ul>
        </div>
      )}
      <div className="actions-holder">
        <button className="action-btn" onClick={deleteDebt} type="button">
          delete
        </button>
        <Link className="action-btn" to={`/debt/update/${singleDebt._id}`}>
          update
        </Link>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SingleDebt;
