import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { reminderSliceActions } from "../../Model/reminderSlice";
import { useEffect } from "react";
import fetchData from "../../Utils/DataFetch/fetchData";
import { userSliceActions } from "../../Model/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const SingleReminder = () => {
  const { id } = useParams();
  const { singleReminder } = useSelector((state: any) => state.reminderSlice);
  const { fillSingleReminder } = reminderSliceActions;
  const dispatch = useDispatch();
  const { updateIsLoading} = userSliceActions;
  const navigate = useNavigate();
  async function fetchReminder() {
    const response = await fetchData("reminder/" + id);
    dispatch(updateIsLoading(true));
    if (response) {
      dispatch(updateIsLoading(false));
      const { data, err } = response;
      if (err) {
        navigate("/reminder");

        toast.error(err);
        return;
      }
      // @ts-ignore
      dispatch(fillSingleReminder(data));
    }
  }

  useEffect(() => {
    fetchReminder();
  }, [id]);
  const arr = singleReminder._id && [
    { name: "title", value: singleReminder.title },
    { name: "note", value: singleReminder.note },
    { name: "repeat", value: singleReminder.repeat.toString() },
    {
      name: "repetition Interval",
      value: singleReminder.repetitionInterval || "",
    },
    {
      name: "due Date",
      value: new Date(singleReminder.dueDate).toDateString(),
    },
  ];
  async function deleteReminder(e: any) {
    dispatch(updateIsLoading(true));
    const response = await fetchData("reminder/" + id, "DELETE");
    if (response) {
      dispatch(updateIsLoading(false));
      const { err, data } = response;
      if (err) {
        toast.error(err);
        return;
      }
      // @ts-ignore
      toast.error(data);
      navigate("/reminder");
    }
  }
  return singleReminder._id ? (
    <div className="single-reminder-page">
      <div className="reminder-info">
        {arr.map(
          ({ name, value }: { name: string; value: string }, index: number) => {
            if (value !== "") {
              return (
                <div className="each-info" key={index}>
                  <h5> {name} </h5>
                  <p> {name === "due Date" ? value : value} </p>
                </div>
              );
            }
          }
        )}
      </div>
      <div className="single-reminder-control">
        <button type="button" onClick={deleteReminder} className="btn">
          {" "}
          delete
        </button>
        <Link className="btn" to={`/reminder/update/${id}`}>
          Update
        </Link>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default SingleReminder;
