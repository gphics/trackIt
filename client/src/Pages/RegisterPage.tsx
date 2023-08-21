import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Utils/Others/FormInput";
import { userSliceActions } from "../Model/userSlice";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill, BsPersonFillLock } from "react-icons/bs";
import { PiGenderIntersexBold } from "react-icons/pi";
// import Axios from "../Utils/Axios";
import axios from "axios";
const RegisterPage = () => {
  type inputType = {
    name: string;
    type: string;
    onChange: (name: string, value: string) => void;
    label: string;
    stateNames: { slice: string; name: string };
    Icon?: any;
  };
  const dispatch: any = useDispatch();
  const { registerDetail } = useSelector((state: any) => state.userSlice);

  const { registerStateUpdate } = userSliceActions;
  function onChange(name: string, value: string): void {
    const payload = { name, value };
    dispatch(registerStateUpdate(payload));
  }
  //
  /**
   *
   */
  const inputArr: inputType[] = [
    {
      name: "email",
      type: "email",
      label: "email",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetail" },
      Icon: MdEmail,
    },
    {
      name: "fullname",
      type: "text",
      label: "fullname",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetail" },
      Icon: BsFillPersonFill,
    },
    {
      name: "gender",
      type: "select",
      label: "gender",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetail" },
      Icon: PiGenderIntersexBold,
    },
    {
      name: "password",
      type: "password",
      label: "password",
      onChange,
      stateNames: { slice: "userSlice", name: "registerDetail" },
      Icon: BsPersonFillLock,
    },
  ];
  async function submitHandler(e: any) {
    e.preventDefault();
    try {
      
      const data = await axios.post(
        "https://trackit-api.onrender.com/user/register",
        registerDetail
      );
      
    //   const data = await fetch("api/user/register", {
    //     method: "post",
    //     body: JSON.stringify(registerDetail),
    //     headers: { "content-type": "application/json" },
    //   });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
    // const body: string = JSON.stringify(registerDetail);
  }

  return (
    <div className="register-page">
      <h3>create your account</h3>
      <form onSubmit={submitHandler} className="register-form">
        {inputArr.map((elem) => (
          <FormInput {...elem} />
        ))}
        <button onClick={submitHandler} type="submit">
          register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
