import ReminderForm from "../../Components/ReminderComponent/ReminderForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import fetchData from "../../Utils/DataFetch/fetchData";
import { userSliceActions } from "../../Model/userSlice";
import { reminderSliceActions } from "../../Model/reminderSlice";
import { useNavigate } from "react-router-dom";
const CreateReminder = () => {
  const dispatch = useDispatch();
  const { updateIsLoading } = userSliceActions;
  const { clearReminderCreate } = reminderSliceActions;
  const Navigate = useNavigate();
  const { reminderCreate } = useSelector((state: any) => state.reminderSlice);
  async function onSubmit(e: any) {
    e.preventDefault();
    const { title, dueDate, repeat, note, repetitionInterval } = reminderCreate;
    if (!title || !dueDate || !note) {
      toast.warn("fill all field");
      return;
    }
    if (repeat && repetitionInterval === "none") {
      toast.warn("repetition interval must not be none since you allow repeat");
      return;
    }
    dispatch(updateIsLoading(true));
    const body = repeat
      ? { title, dueDate, note, repeat, repetitionInterval }
      : { title, dueDate, note, repeat };

    const response = await fetchData("reminder/create", "POST", body);
    if (response) {
      const { err } = response;
      dispatch(updateIsLoading(false));
      if (err) {
        toast.error(err);
        return;
      }
      dispatch(clearReminderCreate());
      Navigate("/reminder");
    }
  }
  return (
    <div className="reminder-create-page">
      <ReminderForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateReminder;
