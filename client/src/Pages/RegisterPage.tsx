import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Utils/Others/FormInput";
import { userSliceActions } from "../Model/userSlice";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill, BsPersonFillLock } from "react-icons/bs";
import { PiGenderIntersexBold } from "react-icons/pi";
import { toast } from "react-toastify";
import fetchData from "../Utils/DataFetch/fetchData";
import inputType from "../Utils/TypeAnnotations/formInputAnn";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const Navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { registerDetails } = useSelector((state: any) => state.userSlice);

  const { registerStateUpdate, updateIsLoading, clearRegisterState } =
    userSliceActions;
  function onChange(name: string, value: string): void {
    const payload = { name, value };
    dispatch(registerStateUpdate(payload));
  }

  const inputArr: inputType[] = [
    {
      name: "email",
      type: "email",
      label: "email",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetails" },
      Icon: MdEmail,
      inputClass: "reg-input-holder",
      iconClass: "reg-input-icon",
    },
    {
      name: "fullname",
      type: "text",
      label: "fullname",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetails" },
      Icon: BsFillPersonFill,
      inputClass: "reg-input-holder",
      iconClass: "reg-input-icon",
    },
    {
      name: "gender",
      type: "select",
      label: "gender",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetails" },
      Icon: PiGenderIntersexBold,
      inputClass: "reg-input-holder",
      iconClass: "reg-input-icon",
      selectOptions: ["male", "female"],
    },
    {
      name: "password",
      type: "password",
      label: "password",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetails" },
      Icon: BsPersonFillLock,
      inputClass: "reg-input-holder",
      iconClass: "reg-input-icon",
    },
  ];
  async function submitHandler(e: any) {
    e.preventDefault();
    const { email, fullname, password } = registerDetails;
    if (!email || !fullname || !password) {
      toast.warning("fill all fields");
      return;
    }
    if (password.length < 6) {
      toast.warning("password length must be reater than 5");
      return;
    }
    dispatch(updateIsLoading(true));
    const response = await fetchData("user/register", "POST", registerDetails);
    if (response) {
      dispatch(updateIsLoading(false));
      const { err, data } = response;
      if (data) {
        dispatch(clearRegisterState());
        // @ts-ignore
        toast.success(data);
        Navigate("/user/update");
        return;
      }
      toast.error(err);
      return;
    }
  }

  return (
    <div className="register-page">
      <h3>create your account</h3>
      <form onSubmit={submitHandler} className="register-form">
        {inputArr.map((elem, i) => (
          <FormInput {...elem} key={i} />
        ))}

        <button onClick={submitHandler} className="reg-btn" type="submit">
          register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
