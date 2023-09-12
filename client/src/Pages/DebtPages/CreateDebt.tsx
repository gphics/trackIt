
import DebtForm from "../../Components/DebtComponent/DebtForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import fetchData from "../../Utils/DataFetch/fetchData";
import { useNavigate } from "react-router-dom";
import { debtSliceActions } from "../../Model/debtSlice";
import { userSliceActions } from "../../Model/userSlice";
const CreateDebt = () => {
  const { debtCreate } = useSelector((state: any) => state.debtSlice);
  const { title, amount, debtInfo } = debtCreate;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateIsLoading } = userSliceActions;
  const {clearDebtCreate} = debtSliceActions
  async function onSubmit(e: any) {
    e.preventDefault();
    if (!title) {
      toast.warn("title must be provided");
      return;
    }
    if (!amount) {
      toast.warn("amount must be provided");
      return;
    }
    if (!debtInfo) {
      toast.warn("debt info must be provided");
      return;
    }

    dispatch(updateIsLoading(true));
    const data = await fetchData("debt/create", "POST", debtCreate);
    if (data) {
      dispatch(updateIsLoading(false));
      if (typeof data === "string") {
        toast.error(data);
        return;
      }
      dispatch(clearDebtCreate())
      navigate("/debt");
    }
  }
  return (
    <div className="create-debt-page">
      <DebtForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateDebt;
