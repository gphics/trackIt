import { useDispatch, useSelector } from "react-redux";
import ReminderForm from "../../Components/ReminderComponent/ReminderForm";
import { useEffect } from "react";
import fetchData from "../../Utils/DataFetch/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { userSliceActions } from "../../Model/userSlice";
import { reminderSliceActions } from "../../Model/reminderSlice";
import { toast } from "react-toastify";
import dateInputFormatter from "../../Utils/DataFetch/dateInputFormatter";
const UpdateReminder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const Navigate = useNavigate();
  const { updateIsLoading } = userSliceActions;
  const { fillReminderCreate, clearReminderCreate } = reminderSliceActions;
  const { reminderCreate } = useSelector((state: any) => state.reminderSlice);
  async function onSubmit(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    const response = await fetchData("reminder/" + id, "PUT", reminderCreate);
    if (response) {
      const { err } = response;
      dispatch(updateIsLoading(false));
      if (err) {
        toast.error(err);
        return;
      }

      dispatch(clearReminderCreate());
      Navigate("/reminder/" + id);
    }
  }
  async function fetchReminder() {
    dispatch(updateIsLoading(true));
    const response = await fetchData("reminder/" + id);
    if (response) {
      dispatch(updateIsLoading(false));
      const { err, data } = response;
      if (err) {
        toast.error(err);
        return;
      }
        // @ts-ignore
        const dueDate = dateInputFormatter(data.dueDate);
        // @ts-ignore
        dispatch(fillReminderCreate({ ...data, dueDate }));
      }
    }
  
  useEffect(() => {
    fetchReminder();
  }, [id]);
  return (
    <div className="update-reminder-page">
      <ReminderForm isUpdate={true} onSubmit={onSubmit} />
    </div>
  );
};

export default UpdateReminder;
