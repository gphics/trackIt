import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Utils/Others/FormInput";
import { userSliceActions } from "../Model/userSlice";
import { MdEmail } from "react-icons/md";
import { BsPersonFillLock } from "react-icons/bs";
import { toast } from "react-toastify";
import fetchData from "../Utils/DataFetch/fetchData";
import formInputAnn from "../Utils/TypeAnnotations/formInputAnn";
const LoginPage = () => {
  const dispatch = useDispatch();
  const { loginStateUpdate, fillUser, updateIsLoading, clearLoginState } =
    userSliceActions;
  const { loginDetails } = useSelector((state: any) => state.userSlice);

  const arr: formInputAnn[] = [
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
      toast.warning("fill all fields");
      return;
    }
    dispatch(updateIsLoading(true));
    const data = await fetchData("user/login", "POST", loginDetails);
    if (data) {
      dispatch(updateIsLoading(false));

      if (typeof data === "string") {
        toast.error(data);
        console.log(data);
        return;
      }
      dispatch(fillUser(data.data));
      dispatch(clearLoginState());
      toast.success("login successful");
    }
  }
  async function passwordReset() {
    const { email } = loginDetails;

    if (!email) {
      toast.warning("fill the email field with your email");
      return;
    }
    dispatch(updateIsLoading(true));
    const data = await fetchData("user/reset-password", "POST", { email });

    if (data) {
      dispatch(updateIsLoading(false));
      if (typeof data === "string") {
        toast.error(data);
        return;
      }
      toast.success(data.data);
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
      <div className="password-reset-note">
        <small>Forgotten password ? </small>
        <button onClick={passwordReset} type="button">
          reset
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
