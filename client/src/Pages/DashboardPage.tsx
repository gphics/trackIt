import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "../Model/userSlice";
import fetchData from "../Utils/DataFetch/fetchData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SmallSingleDebts from "../Components/DebtComponent/SmallSingleDebts";
import ReminderList from "../Components/ReminderComponent/ReminderList";
import NotificationComponent from "../Utils/Others/NotificationComponent";
const DashboardPage = () => {
  const { updateIsLoading, fillUser } = userSliceActions;
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.userSlice);
  const [control, setControl] = useState(1);
  const { Reminders, Debts } = user._id ? user : [];
  const [show, setShow] = useState(false);
  async function fetchDashboardInfo() {
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
    }
  }
  function closeModal() {
    setShow(false);
  }
  useEffect(() => {
    fetchDashboardInfo();
    const notificationState: string = Notification.permission;

    if (notificationState !== "granted") {
      setTimeout(() => {
        setShow(true);
      }, 5000);
    }
  }, []);
  return user._id ? (
    <div className="dashboard-page">
      {show && <NotificationComponent closeModal={closeModal} />}
      {/* control unit */}
      <header>
        <button
          type="button"
          onClick={() => {
            setControl(1);
          }}
          className="btn"
        >
          debts
        </button>
        <button
          type="button"
          onClick={() => {
            setControl(2);
          }}
          className="btn"
        >
          {" "}
          reminders
        </button>
      </header>

      {/* debt unit */}
      {control === 1 && (
        <div className="dashboard -debt-list">
          <h3>debts</h3>
          {Debts.length > 0 ? (
            Debts.map((elem: any, index: number) => (
              <SmallSingleDebts {...elem} key={index} />
            ))
          ) : (
            <h4 className="no">no debt !!</h4>
          )}
        </div>
      )}
      {/* reminder unit */}
      {control === 2 && (
        <div className="dashboard -reminder-list">
          <h3> reminders </h3>
          {Reminders.length > 0 ? (
            Reminders.map((elem: any, index: number) => (
              <ReminderList {...elem} key={index} />
            ))
          ) : (
            <h4 className="no">no reminder !!</h4>
          )}
        </div>
      )}
    </div>
  ) : (
    <div></div>
  );
};

// type debt = {
//   title: string,
//   amount
// }

// function DashoardDebt({}) {

// }
// function DashoardReminder({}) {}

export default DashboardPage;
