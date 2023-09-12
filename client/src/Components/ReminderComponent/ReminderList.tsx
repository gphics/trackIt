import { Link } from "react-router-dom";

type reminderType = {
  title: string;
  dueDate: string;
  _id: string;
};
const ReminderList = ({ title, _id, dueDate }: reminderType) => {
  const date = new Date(dueDate)
  console.log(dueDate)
    const currentDate: Date = new Date()
    const listClass = currentDate > date ? "reminder-list due-reminder" : "reminder-list";
  return (
      <Link className={listClass} to={`/reminder/${_id}`}>
      <h4 className="title"> {title} </h4>
      <small> {date.toDateString()} </small>
    </Link>
  );
};

export default ReminderList;
