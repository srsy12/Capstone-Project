import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { logout } from "../../store/session";
import { useModal } from "../../context/Modal";
import OpenModalButton2 from "../OpenModalButton/loginsignupbuttons";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const ulRef = useRef();

  function setActiveClass(e) {
    const ulDiv = document.getElementsByClassName("profile-dropdown")[0];
    const ulClasses = ulDiv.classList;
    e.preventDefault();
    ulClasses.toggle("hidden");
  }

  const handleLogout = (e) => {
    const ulDiv = document.getElementsByClassName("profile-dropdown")[0];
    const ulClasses = ulDiv.classList;
    e.preventDefault();
    ulClasses.toggle("hidden");
    dispatch(logout())
    history.push("/")
  };

  const handleMyPage = (e) => {
    const ulDiv = document.getElementsByClassName("profile-dropdown")[0];
    const ulClasses = ulDiv.classList;
    e.preventDefault();
    ulClasses.toggle("hidden");
    history.push(`/user`)
  }


  return (
    <>
      <button className="nav-profile-butt" onClick={setActiveClass}>
        <ion-icon name="person-circle-sharp"></ion-icon>
      </button>
      <ul className="profile-dropdown hidden" ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button className="login-form-button" onClick={handleMyPage}>My Page</button>
            </li>
            <li>
              <button className="login-form-button" onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton2
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton2
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
