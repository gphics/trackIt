import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchData from "../Utils/DataFetch/fetchData";
import { userSliceActions } from "../Model/userSlice";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.userSlice);
  const { updateIsLoading, fillUser } = userSliceActions;
  const personalInfoArr = user?._id && [
    { name: "email", value: user?.email },
    { name: "gender", value: user?.gender },
    { name: "location", value: user?.location },
    { name: "contact", value: user?.contact },
  ];
  async function fetchProfile() {
    dispatch(updateIsLoading(true));
    const response = await fetchData("user");
    if (response) {
      dispatch(updateIsLoading(false));
      const { err, data } = response;
      if (err) {
        toast.error(err);
        return;
      }
      dispatch(fillUser(data));
    }
  }
  useEffect(() => {
    fetchProfile();
  }, []);
  return user._id ? (
    <div className="profile-page">
      {user?._id && (
        <section className="profile-info">
          <div className="profile-hero-section">
            <img src={user.avatar.url} alt="user image" />
            <h4> {user.fullname} </h4>
            <a href="/user/update" title="update profile">
              {" "}
              <FaEdit className="edit-icon" />{" "}
            </a>
          </div>
          <div className="profile-personal-info">
            {personalInfoArr.map(
              (
                { name, value }: { name: string; value: string | number },
                index: number
              ) => {
                return (
                  <div key={index} className="each-profile-info">
                    <h4> {name} </h4>
                    <h5> {value} </h5>
                  </div>
                );
              }
            )}
          </div>
          <div className="profile-debt-info">
            <h4>Debts</h4>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>To be paid</th>
                  <th>To be collected</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total count</td>
                  <td> {user.totalDebtCount.to_be_paid} </td>
                  <td> {user.totalDebtCount.to_be_collected} </td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td> {user.totalDebtAmount.to_be_paid} </td>
                  <td> {user.totalDebtAmount.to_be_collected} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default ProfilePage;
