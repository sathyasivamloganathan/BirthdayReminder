import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_URL } from "../../apiConfig";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mt-5 border-y-2 border-b-0 border-gray-400">
      <div className="mt-5">
        <GoogleLogin
          shape="pill"
          size="large"
          text="signin_with"
          logo_alignment="center"
          onSuccess={(credentialResponse) => {
            axios.post(`${API_URL}/api/auth/google`, {
              token: credentialResponse.credential,
            })
            .then((res) => {
              setAuth({ user: res.data.user, token: res.data.jwt_token });
              console.log("Result: ", res)
            })
            .then(() => {
              navigate("/home");
              toast.success("Logged in successfully.")
            })
          }}
          onError={() => console.log("Login Failed, Google Auth")}
        />
      </div>
    </div>
  );
};

export default GoogleLoginButton;
