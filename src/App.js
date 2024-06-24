import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ClipLoader } from "react-spinners";
function App() {
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const userInfo = (createdAt) => {
    try {
      const info = userData.find((user) => user.createdAt === createdAt);
      setUser(info);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-page">
      {userData.length === 0 ? (
        <div className="spinner-container">
          <ClipLoader color="#000000" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="left-part">
            <h2 style={{ textAlign: "center" }}>Users List</h2>
            <div className="user-card">
              {userData.map((user, idx) => (
                <div
                  key={idx}
                  className="user-info"
                  onClick={() => userInfo(user.createdAt)} // using createdAt to find the user because some of the id's are same
                >
                  <div>
                    {/* some of the avatar url are not working so applied below logic */}
                    {user.avatar.includes("fakercloud") ? (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUcTxLM0e260D9L98ModC48AsVnFMGK6CWA&s"
                        alt="img"
                        className="user-avatar"
                      />
                    ) : (
                      <img
                        src={user.avatar}
                        alt="img"
                        className="user-avatar"
                      />
                    )}
                  </div>
                  <div>
                    <h2 style={{ marginBlock: "2px" }}>
                      {user.profile.firstName} {user.profile.lastName}
                    </h2>
                    <p style={{ marginBlock: "2px" }}>{user.jobTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="right-part">
            <h2 style={{ textAlign: "center" }}>User Information</h2>
            {user ? (
              <div className="img-container">
                {/* some of the avatar url are not working so applied below logic */}
                {user.avatar.includes("fakercloud") ? (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUcTxLM0e260D9L98ModC48AsVnFMGK6CWA&s"
                    alt="img"
                    className="user-img"
                  />
                ) : (
                  <img src={user.avatar} alt="img" className="user-img" />
                )}
                <div className="info-container">
                  <div className="info">
                    <h2>
                      Name: {user.profile.firstName} {user.profile.lastName}
                    </h2>
                    <h3>Username: {user.profile.username}</h3>
                    <h4>Job Title: {user.jobTitle}</h4>
                    <p>
                      <span id="span">Bio:</span> {user.Bio}
                    </p>
                    <p>
                      <span id="span">Email:</span> {user.profile.email}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="info-error">
                Select a user from list to get the information.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
