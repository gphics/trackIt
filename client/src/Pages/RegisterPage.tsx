import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Utils/Others/FormInput";
import { userSliceActions } from "../Model/userSlice";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill, BsPersonFillLock } from "react-icons/bs";
import { PiGenderIntersexBold } from "react-icons/pi";
import { toast } from "react-toastify";
import fetchData from "../Utils/Axios/fetchData";

const RegisterPage = () => {
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
  const dispatch: any = useDispatch();
  const { registerDetail } = useSelector((state: any) => state.userSlice);

  const { registerStateUpdate, updateIsLoading, fillUser } = userSliceActions;
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
      stateNames: { slice: "userSlice", name: "registerDetail" },
      Icon: MdEmail,
      inputClass: "reg-input-holder",
      iconClass: "reg-input-icon",
    },
    {
      name: "fullname",
      type: "text",
      label: "fullname",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetail" },
      Icon: BsFillPersonFill,
      inputClass: "reg-input-holder",
      iconClass: "reg-input-icon",
    },
    {
      name: "gender",
      type: "select",
      label: "gender",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetail" },
      Icon: PiGenderIntersexBold,
      inputClass: "reg-input-holder",
      iconClass: "reg-input-icon",
    },
    {
      name: "password",
      type: "password",
      label: "password",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetail" },
      Icon: BsPersonFillLock,
      inputClass: "reg-input-holder",
      iconClass: "reg-input-icon",
    },
  ];
  async function submitHandler(e: any) {
    e.preventDefault();
    const { fullname, email, password } = registerDetail;
    // checking if the field are filled
    if (!fullname || !email || !password) {
      toast("All field must be filled");
      return;
    }
    // checking the password length
    if (password.length < 6) {
      toast("password length must be equal to or greater than six");
      return;
    }
    // fetching the data
    dispatch(updateIsLoading(true));
    const data = await fetchData("user/register", registerDetail, "post");

    if (data) {
      dispatch(updateIsLoading(false));
      if (data.status) {
        toast.error(data.message);
        return;
      }
      dispatch(fillUser(data.data));
      toast.success("user created successfully");
      return;
    }

    // const
    // const body: string = JSON.stringify(registerDetail);
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
