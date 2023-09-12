import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../Model/userSlice";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill, BsPersonFillLock } from "react-icons/bs";
import { PiGenderIntersexBold } from "react-icons/pi";
import { toast } from "react-toastify";
import fetchData from "../Utils/DataFetch/fetchData";
import FormInput from "../Utils/Others/FormInput";
import { AiFillPhone } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { useEffect, useState } from "react";
import inputType from "../Utils/TypeAnnotations/formInputAnn";
import { useNavigate } from "react-router-dom";
const UserUpdatePage = () => {
  const navigate = useNavigate()
  const {
    passwordUserUpdate,
    emailUserUpdate,
    basicUserUpdate,
    updateIsLoading,
    logout,
    fillUser,
    preparingForUserUpdate,
  } = userSliceActions;
  const user = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();
  const [fileState, setFileState] = useState({ state: false, file:{} });
  function basicOnChange(name: string, value: string): void {
    dispatch(basicUserUpdate({ name, value }));
  }
  function passwordOnChange(name: string, value: string): void {
    dispatch(passwordUserUpdate({ name, value }));
  }
  function emailOnChange(name: string, value: string): void {
    dispatch(emailUserUpdate({ name, value }));
  }
  const basicForm: inputType[] = [
    {
      name: "fullname",
      type: "text",
      onChange: basicOnChange,
      label: "fullname",
      stateNames: { slice: "userSlice", name: "basicUserUpdate" },
      inputClass: "user-update-input",
      iconClass: "user-update-icon",
      Icon: BsFillPersonFill,
     
    },
    {
      name: "gender",
      type: "select",
      onChange: basicOnChange,
      label: "gender",
       selectOptions:["male", "female"],
      stateNames: { slice: "userSlice", name: "basicUserUpdate" },
      inputClass: "user-update-input",
      iconClass: "user-update-icon",
      Icon: PiGenderIntersexBold,
    },
    {
      name: "contact",
      type: "number",
      onChange: basicOnChange,
      label: "contact",
      stateNames: { slice: "userSlice", name: "basicUserUpdate" },
      inputClass: "user-update-input",
      iconClass: "user-update-icon",
      Icon: AiFillPhone,
    },
    {
      name: "location",
      type: "text",
      onChange: basicOnChange,
      label: "location",
      stateNames: { slice: "userSlice", name: "basicUserUpdate" },
      inputClass: "user-update-input",
      iconClass: "user-update-icon",
      Icon: HiLocationMarker,
    },
  ];
  const emailForm = {
    name: "email",
    type: "email",
    onChange: emailOnChange,
    label: "email",
    stateNames: { slice: "userSlice", name: "emailUpdate" },
    inputClass: "user-update-input",
    iconClass: "user-update-icon",
    Icon: MdEmail,
  };
  const passwordForm: inputType[] = [
    {
      name: "oldPassword",
      type: "password",
      label: "old password",
      stateNames: { slice: "userSlice", name: "passwordUpdate" },
      inputClass: "user-update-input",
      iconClass: "user-update-icon",
      Icon: BsPersonFillLock,
      onChange: passwordOnChange,
    },
    {
      name: "newPassword",
      type: "password",
      onChange: passwordOnChange,
      label: "new password",
      stateNames: { slice: "userSlice", name: "passwordUpdate" },
      inputClass: "user-update-input",
      iconClass: "user-update-icon",
      Icon: BsPersonFillLock,
    },
  ];

  async function basicSubmitHander(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    console.log(user.basicUserUpdate);
    const data = await fetchData("user/update", "PUT", user.basicUserUpdate);
    if (data) {
      dispatch(updateIsLoading(false));
      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);
        return;
      }
      dispatch(fillUser(data.data));
      toast.success("basic info updated successfuly");
      navigate("/user")
    }
  }
  async function passwordSubmitHander(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    const data = await fetchData(
      "user/update-password",
      "PUT",
      user.passwordUpdate
    );
    if (data) {
      dispatch(updateIsLoading(false));
      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);
        return;
      }
      toast.success("password updated successfuly");
      dispatch(fillUser(data.data));
    }
  }
  async function emailSubmitHander(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    const data = await fetchData("user/update-email", "PUT", user.emailUpdate);
    if (data) {
      dispatch(updateIsLoading(false));
      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);
        return;
      }
      toast.success("email updated successfuly");
      dispatch(fillUser(data.data));
       navigate("/user");
    }
  }
  async function fetchUser() {
    dispatch(updateIsLoading(true));
    const data = await fetchData("user");
    if (data) {
      dispatch(updateIsLoading(false));
      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);
        return;
      }
      dispatch(preparingForUserUpdate(data.data));
    }
  }
  function fileOnChangeHandler(e: any) {
    const file = e.target.files[0];
    setFileState({ state: true, file:{file} });
  }

  async function avatarUpload(e: any) {
    e.preventDefault();
    if (!fileState.state) {
      toast.error("choose an image");
      return;
    }
    // @ts-ignore
    const file = fileState.file?.file;
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(updateIsLoading(true));
    // console.log(user)
    const url: string = user.user.avatar.public_id
      ? "user/update-avatar"
      : "user/upload-avatar";
    const method = user.user.avatar.public_id
      ? "PUT"
      : "POST";
    const data = await fetchData(url, method, formData, true);
    if (data) {
      dispatch(updateIsLoading(false));

      if (typeof data === "string") {
        if (data === "you are not authenticated") {
          dispatch(logout());
        }
        toast.error(data);
        return;
      }
      setFileState({state:false, file:{}})
      toast.success("profile image updated successfuly");
      dispatch(fillUser(data.data));
       navigate("/user");
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="user-update-page">
      <form
        action=""
        onSubmit={basicSubmitHander}
        className="basic user-update-form"
      >
        <h4>Basic Information</h4>
        {basicForm.map((item: inputType, index: number) => (
          <FormInput key={index} {...item} />
        ))}
        <button
          onClick={basicSubmitHander}
          type="button"
          className="user-update-btn"
        >
          update
        </button>
      </form>
      <form
        action=""
        onSubmit={emailSubmitHander}
        className="email user-update-form"
      >
        <h4>Update Email </h4>
        <FormInput {...emailForm} />
        <button
          onClick={emailSubmitHander}
          type="button"
          className="user-update-btn"
        >
          update
        </button>
      </form>
      <form
        action=""
        onSubmit={passwordSubmitHander}
        className="password user-update-form"
      >
        <h4>Change Password</h4>
        {passwordForm.map((item: inputType, index: number) => (
          <FormInput key={index} {...item} />
        ))}
        <button
          type="button"
          onClick={passwordSubmitHander}
          className="user-update-btn"
        >
          update
        </button>
      </form>
      <form
        action=""
        onSubmit={avatarUpload}
        className="avatar user-update-form"
      >
        <h4>Change Image</h4>
        <div className="user-update-input" id="avatar-input-holder">
          <input
            title="avatar"
            onChange={fileOnChangeHandler}
            type="file"
            name="avatar"
          />
        </div>

        <button
          onClick={avatarUpload}
          type="button"
          className="user-update-btn"
        >
          update
        </button>
      </form>
    </div>
  );
};

export default UserUpdatePage;
