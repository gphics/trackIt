import { useDispatch, useSelector } from "react-redux";
import ReminderForm from "../../Components/ReminderComponent/ReminderForm";
import { useEffect } from "react";
import fetchData from "../../Utils/DataFetch/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { userSliceActions } from "../../Model/userSlice";
import { reminderSliceActions } from "../../Model/reminderSlice";
import {toast} from "react-toastify"
import dateInputFormatter from "../../Utils/DataFetch/dateInputFormatter";
const UpdateReminder = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const Navigate = useNavigate()
  const { updateIsLoading, logout } = userSliceActions
  const { fillReminderCreate, clearReminderCreate } = reminderSliceActions
  const {reminderCreate} = useSelector((state:any)=> state.reminderSlice)
  async function onSubmit(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    const data = await fetchData('reminder/update/' + id, "PUT", reminderCreate)
     if (data) {
       dispatch(updateIsLoading(false));
       if (typeof data === "string") {
         if (data === "you are not authenticated") {
           dispatch(logout());
         }
         toast.error(data);
         return;
       }
       

       dispatch(clearReminderCreate());
       Navigate("/reminder/"+id)
     }
  }
  async function fetchReminder() {
  dispatch(updateIsLoading(true))
    const data = await fetchData("reminder/" + id)
       if (data) {
         dispatch(updateIsLoading(false));
         if (typeof data === "string") {
           if (data === "you are not authenticated") {
             dispatch(logout());
           }
           toast.error(data);
           return;
         }
         const dueDate = dateInputFormatter(data.data.dueDate)

         dispatch(fillReminderCreate({...data.data, dueDate}));
       }
}
  useEffect(() => {
    fetchReminder()
  },[id])
  return (
    <div className="update-reminder-page">
      <ReminderForm isUpdate={true} onSubmit={onSubmit} />
    </div>
  );
};

export default UpdateReminder;
