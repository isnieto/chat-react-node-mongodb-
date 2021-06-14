import React from "react";
import { useGoogleLogin } from "react-google-login";
import userAuth from "../../services/userAuth";
import "./LoginHook.css";

// refresh token
//import { refreshTokenSetup } from "./refreshToken";

const clientId =
  "939804069180-elschdt94i4gs0jqf1r2lvm8g95fvim3.apps.googleusercontent.com";

export default function LoginHooks({ setToken }) {
  const onSuccess = (res) => {
    const data = res.getAuthResponse().id_token;
    const tokenData = userAuth.googleAuth({ data });
    if (tokenData === 201) {
      setToken(tokenData);
      console.log("SETTOKEN", tokenData)
    }
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login. 😢 `);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="customBtn">
      <img src="./google.svg" alt="google login" className="icon"></img>
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

