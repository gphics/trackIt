import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Utils/Others/FormInput";
import { userSliceActions } from "../Model/userSlice";
import { MdEmail } from "react-icons/md";
import { BsPersonFillLock } from "react-icons/bs";
import { toast } from "react-toastify";
import fetchData from "../Utils/Axios/fetchData";
const LoginPage = () => {
  const dispatch = useDispatch();
  const { loginStateUpdate, fillUser, updateIsLoading, clearLoginState } =
    userSliceActions;
  const { loginDetails } = useSelector((state: any) => state.userSlice);
  type inputType = {
    name: string;
    type: string;
    onChange: (name: string, value: string) => void;
    label: string;
    stateNames: { slice: string; name: string };
    inputClass: string;
    Icon?: any;
    iconClass?: string;
  };
  const arr: inputType[] = [
    {
      name: "email",
      type: "email",
      onChange,
      label: "email",
      stateNames: { slice: "userSlice", name: "loginDetails" },
      inputClass: "login-input",
      Icon: MdEmail,
      iconClass: "login-input-icon",
    },
    {
      name: "password",
      type: "password",
      onChange,
      label: "password",
      stateNames: { slice: "userSlice", name: "loginDetails" },
      inputClass: "login-input",
      Icon: BsPersonFillLock,
      iconClass: "login-input-icon",
    },
  ];
  function onChange(name: string, value: string) {
    dispatch(loginStateUpdate({ name, value }));
  }
  async function submitHandler(e: any) {
    e.preventDefault();
    const { email, password } = loginDetails;
    if (!email || !password) {
      toast.error("fill all field");
      return;
    }
    if (password.lenth < 6) {
      toast.error("password length must be greater than 5");
      return;
    }
    // fetching the data
    dispatch(updateIsLoading(true));
    const data: any = await fetchData("user/login", loginDetails, "POST");
    if (data) {
      dispatch(updateIsLoading(false));
      if (data.status) {
        toast.error(data.message);
        return;
      }
      if (data.data) {
        dispatch(fillUser(data.data));
        dispatch(clearLoginState());
        toast.success("login successful");
        return;
      }
    }
  }
  return (
    <div className="login-page">
      <h3>Login</h3>
      <form onSubmit={submitHandler} className="login-form">
        {arr.map((item, index) => {
          return <FormInput {...item} key={index} />;
        })}
        <button className="login-btn" onClick={submitHandler} type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
