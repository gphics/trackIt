import { useDispatch, useSelector } from "react-redux";
import DebtComponent from "../../Components/DebtComponent";
import { useEffect } from "react";
import { userSliceActions } from "../../Model/userSlice";
import fetchData from "../../Utils/DataFetch/fetchData";
import { toast } from "react-toastify";
import { debtSliceActions } from "../../Model/debtSlice";
const DebtsPage = () => {
  const { AllDebt, DebtHeader } = DebtComponent;
  const { user } = useSelector((state: any) => state.userSlice);
  const { setDebtsFromUser, clearDebtCreate, clearSingleDebt } =
    debtSliceActions;

  const dispatch = useDispatch();
  const { updateIsLoading, fillUser } = userSliceActions;
  async function fetchProfile() {
    dispatch(updateIsLoading(true));
    const response = await fetchData("user");
    if (response) {
      dispatch(updateIsLoading(false));
      const { err, data } = response;
      if (err) {
        toast.error(err);
        return;
      }
      dispatch(fillUser(data));
      // @ts-ignore
      dispatch(setDebtsFromUser(data.Debts));
    }
  }
  useEffect(() => {
    fetchProfile();
    dispatch(clearDebtCreate());
    dispatch(clearSingleDebt());
  }, []);
  return user._id ? (
    <div className="debt-page">
      <DebtHeader />
      <AllDebt />
    </div>
  ) : (
    <div></div>
  );
};

export default DebtsPage;
