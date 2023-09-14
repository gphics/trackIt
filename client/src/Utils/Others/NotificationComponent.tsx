import { toast } from "react-toastify";
import fetchData from "../DataFetch/fetchData";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../Model/userSlice";
const NotificationComponent = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch();
  const { updateIsLoading, logout } = userSliceActions;
  function onClick(e: any) {
    if (e.target.classList.contains("deny")) {
      closeModal();
    }
    //
  }
  async function allowOnClick() {
    try {
      const sw = await navigator.serviceWorker.ready;
      const notify = await Notification.requestPermission();
      
      // @ts-ignore
      if (notify !== "granted") {
        closeModal();
        return;
      }

      dispatch(updateIsLoading(true));
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_NOTIFICATION_PUBLIC_KEY,
      });
      const data = await fetchData("user/subscribe", "POST", {
        subscription,
      });

      if (data) {
        dispatch(updateIsLoading(false));
        if (typeof data === "string") {
          if (data === "you are not authenticated") {
            dispatch(logout());
          }
          toast.error(data);
          return;
        }
        toast.success(data.data);

      }
    } catch (error: any) {
      toast.error(error.message);
      dispatch(updateIsLoading(false));
      closeModal();
    }
  }
  return (
    <div onClick={onClick} className="notification-component deny">
      <div className="popup">
        <h3> trackIt want to send you notifications</h3>
        <section>
          <button onClick={allowOnClick} className="btn" type="button">
            allow
          </button>
          <button onClick={onClick} type="button" className="deny btn">
            deny
          </button>
        </section>
      </div>
    </div>
  );
};

export default NotificationComponent;
