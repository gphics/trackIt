import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Utils/Others/FormInput";
import { userSliceActions } from "../Model/userSlice";
import { MdEmail } from "react-icons/md";
import { BsPersonFillLock } from "react-icons/bs";
import { toast } from "react-toastify";
import fetchData from "../Utils/DataFetch/fetchData";
import formInputAnn from "../Utils/TypeAnnotations/formInputAnn";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginStateUpdate, updateIsLoading, clearLoginState } =
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
    const response = await fetchData("user/login", "POST", loginDetails);

    if (response) {
      dispatch(updateIsLoading(false));
      const { data, err } = response;
      if (err) {
        toast.error(err);
        return;
      }
      dispatch(clearLoginState());
      // @ts-ignore
      toast.success(data);
      Navigate("/");
    }
  }
  async function passwordReset() {
    const { email } = loginDetails;

    if (!email) {
      toast.warning("fill the email field with your email");
      return;
    }
    dispatch(updateIsLoading(true));
    const response = await fetchData("user/reset-password", "POST", { email });

    if (response) {
      const { err, data } = response;

      dispatch(updateIsLoading(false));
      if (err) {
        toast.error(err);
        return;
      }
      // @ts-ignore
      toast.success(data);
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
