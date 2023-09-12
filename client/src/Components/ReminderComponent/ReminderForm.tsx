import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../Utils/Others/FormInput";
import formInputAnn from "../../Utils/TypeAnnotations/formInputAnn";
import { reminderSliceActions } from "../../Model/reminderSlice";

const ReminderForm = ({
  onSubmit,
  isUpdate = false,
}: {
  onSubmit: (e: any) => void;
  isUpdate?: boolean;
}) => {
  const dispatch = useDispatch();
  const { updateReminderCreate } = reminderSliceActions;
  const { reminderCreate } = useSelector((state: any) => state.reminderSlice);
  function onChange(name: string, value: string) {
    const newValue =
      name === "repeat" ? (value === "true" ? true : false) : value;
    // @ts-ignore
    dispatch(updateReminderCreate({ name, value: newValue }));
  }
  const inputArr: formInputAnn[] = [
    {
      name: "title",
      label: "title",
      showLabel: true,
      type: "text",
      stateNames: { slice: "reminderSlice", name: "reminderCreate" },
      onChange,
      inputClass: "reminder-input-holder",
    },
    {
      name: "note",
      label: "note",
      showLabel: true,
      type: "text",
      stateNames: { slice: "reminderSlice", name: "reminderCreate" },
      onChange,
      inputClass: "reminder-input-holder for-textarea",
      isTextArea: true,
    },
    {
      name: "dueDate",
      label: "due date",
      showLabel: true,
      type: "date",
      stateNames: { slice: "reminderSlice", name: "reminderCreate" },
      onChange,
      inputClass: "reminder-input-holder",
    },
    {
      name: "repeat",
      label: "repeat",
      showLabel: true,
      type: "select",
      stateNames: { slice: "reminderSlice", name: "reminderCreate" },
      selectOptions: ["true", "false"],
      onChange,
      inputClass: "reminder-input-holder",
    },
  ];
  const repetitionObj = {
    name: "repetitionInterval",
    label: "repetition Interval",
    showLabel: true,
    type: "select",
    stateNames: { slice: "reminderSlice", name: "reminderCreate" },
    selectOptions: ["none","daily", "weekly", "monthly"],
    onChange,
    inputClass: "reminder-input-holder",
  };
  return (
    <form onSubmit={onSubmit} className="reminder-form">
      {inputArr.map((elem: formInputAnn, index: number) => (
        <FormInput key={index} {...elem} />
      ))}
      {reminderCreate.repeat && <FormInput {...repetitionObj} />}
      <button type="submit" onClick={onSubmit}>
        {isUpdate ? "update" : "create"}
      </button>
    </form>
  );
};

export default ReminderForm;
