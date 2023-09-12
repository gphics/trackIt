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
  const { updateIsLoading, logout } = userSliceActions;
  const { fillAllReminders } = reminderSliceActions;
  async function fetchReminders() {
    dispatch(updateIsLoading(true));
    const data = await fetchData("reminder/fetch-all");
    
    if (data) {
      dispatch(updateIsLoading(false));
      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);
        return;
      }
      
      dispatch(fillAllReminders(data.data));
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
          {allReminders.map((elem:any, index:number)=> <ReminderList key={index}{...elem} />)}
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
