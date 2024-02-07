import { useEffect } from "react";
import DebtForm from "../../Components/DebtComponent/DebtForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "../../Model/userSlice";
import { debtSliceActions } from "../../Model/debtSlice";
import fetchData from "../../Utils/DataFetch/fetchData";
import { toast } from "react-toastify";
import dateInputFormatter from "../../Utils/DataFetch/dateInputFormatter";
const UpdateDebt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateIsLoading, logout } = userSliceActions;
  const { fillDebtCreate, fillSingleDebt } = debtSliceActions;
  const { debtCreate } = useSelector((state: any) => state.debtSlice);
  async function onSubmit(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    const response = await fetchData("debt/" + id, "PUT", debtCreate);
    if (response) {
      dispatch(updateIsLoading(false));
      const { data, err } = response;
      if (err) {
        toast.error(err);
        return;
      }
      // @ts-ignore
      dispatch(fillSingleDebt(data));
      navigate("/debt/" + id);
    }
  }

  async function fetchDebt() {
    dispatch(updateIsLoading(true));
    const response = await fetchData("debt/" + id);

    if (response) {
      dispatch(updateIsLoading(false));
      const { err, data } = response;
      if (err) {
        toast.error(err);
        return;
      }
      // @ts-ignore
      const { incurredDate: inc, deadline: dead } = data;
      const [incurredDate, deadline] = [
        dateInputFormatter(inc),
        dateInputFormatter(dead),
      ];
      // @ts-ignore
      dispatch(fillDebtCreate({ ...data, incurredDate, deadline }));
    }
  }
  useEffect(() => {
    fetchDebt();
  }, [id]);
  return (
    <div className="debt-update-page">
      <DebtForm isUpdate={true} onSubmit={onSubmit} />
    </div>
  );
};

export default UpdateDebt;
