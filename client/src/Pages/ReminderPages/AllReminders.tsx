import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../../Utils/DataFetch/fetchData";
import { userSliceActions } from "../../Model/userSlice";
import { toast } from "react-toastify";
import { reminderSliceActions } from "../../Model/reminderSlice";
import ReminderList from "../../Components/ReminderComponent/ReminderList";
const AllReminders = () => {
  const dispatch = useDispatch();
  const { allReminders } = useSelector((state: any) => state.reminderSlice);
  const { updateIsLoading } = userSliceActions;
  const { fillAllReminders } = reminderSliceActions;
  async function fetchReminders() {
    dispatch(updateIsLoading(true));
    const response = await fetchData("reminder/all");

    if (response) {
      dispatch(updateIsLoading(false));
      const { err, data } = response;
      if (err) {
        toast.error(err);
        return;
      }
      // @ts-ignore
      dispatch(fillAllReminders(data));
    }
  }
  useEffect(() => {
    fetchReminders();
  }, []);
  return (
    <div className="all-reminder-page">
      <header>
        <Link to="/reminder/create" className="reminder-create-link">
          {" "}
          create
        </Link>
      </header>
      {allReminders.length > 0 ? (
        <div className="reminder-list-holder">
          {allReminders.map((elem: any, index: number) => (
            <ReminderList key={index} {...elem} />
          ))}
        </div>
      ) : (
        <div className="no-reminder">
          {" "}
          <h1>You have no reminder </h1>{" "}
        </div>
      )}
    </div>
  );
};
export default AllReminders;
