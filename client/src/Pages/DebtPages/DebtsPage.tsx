import { useDispatch, useSelector } from "react-redux";
import DebtComponent from "../../Components/DebtComponent";
import { useEffect } from "react";
import { userSliceActions } from "../../Model/userSlice";
import fetchData from "../../Utils/DataFetch/fetchData";
import { toast } from "react-toastify";
import { debtSliceActions } from "../../Model/debtSlice";
const DebtsPage = () => {
  const { AllDebt,  DebtHeader } = DebtComponent;
  const { user } = useSelector((state: any) => state.userSlice);
  const {setDebtsFromUser, clearDebtCreate, clearSingleDebt} = debtSliceActions
  
  const dispatch = useDispatch();
  const { updateIsLoading, logout, fillUser } = userSliceActions;
  async function fetchProfile() {
    dispatch(updateIsLoading(true));
    const data = await fetchData("user");
    if (data) {
      dispatch(updateIsLoading(false));
      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);
        return;
      }
      dispatch(fillUser(data.data));
      dispatch(setDebtsFromUser(data.data.Debts))
    }
  }
  useEffect(() => {
    fetchProfile();
    dispatch(clearDebtCreate())
    dispatch(clearSingleDebt())
  }, []);
  return user._id ? (
    <div className="debt-page">
      <DebtHeader />
      <AllDebt/>
    </div>
  ) : (
      <div>
        
    </div>
  );
};

export default DebtsPage;
