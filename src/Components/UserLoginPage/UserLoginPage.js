import React, { useEffect } from "react";

//import Landing from "../Landing/Landing";
import Modal from "../Modal/Modal";
import UserLogin from "../UserLogin/UserLogin";
import axios from "axios";
import { useHistory } from "react-router-dom";
const UserLoginPage = () => {
  let history = useHistory();
  useEffect(() => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_BASE_URL}login`, { dummy: 'Dummy data' })
        .then((res) => {
            if (res.data.success) {
                history.push('/dashboard');
            } else if (!res.data.success) {
                history.push('/login');
            }
        })
        .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="user-login-page">
        {/* <section>
          <Landing />
        </section> */}
        <div>
          <Modal>
            <div>
              <UserLogin />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UserLoginPage;
