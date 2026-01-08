import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import PHeader from "../utils/pHeader";
import "./style.css";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { docQr } from "../Logics/docQr";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slice";
import Header from "../landingPage2/header";

const LoginMain: React.FC = () => {
  const [isCreatingPassword, setIsCreatingPassword] = useState<boolean>(false);
  const [data, setData] = useState({ username: "", password: "" });
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [error, setError]=useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const fetchData = await docQr("Users", {
        max: 1,
        whereClauses: [
          { field: "username", operator: "==", value: data?.username || "" },
          { field: "password", operator: "==", value: data?.password || "" },
        ],
      });

      if (fetchData.length <= 0) {
        toast.error("User not found");
        setError("User not found")
        return setIsLoading(false);
      }

      const user = fetchData[0];

      if (user.password.trim() === "") {
        setIsCreatingPassword(true);
      } else {
        if (user.isBanned !== "no") {
          localStorage.clear();
          sessionStorage.clear();
          toast.error("This account have been banned by admin");
          setError("This account have been banned by admin")
          return;
        }

        if (user.isBlocked) {
          localStorage.clear();
          sessionStorage.clear();
          toast.error("This account have been blocked from using this site");
          setError("This account have been blocked from using this site");
          return;
        }

        toast.success("Login successful");
        window.localStorage.setItem("User", JSON.stringify(user));
        dispatch(setUser(user));
        navigate("/UserDashboard");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      setError(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-body-container">
      <div className="home-content">
        <Header />
        <Toaster />

        <div className="loginContainer">
          <div className="Wrapper flex items-center justify-center">
            <div className="form">
              <br />

<div className="mx-auto flex items-center justify-center">
    <img src={'/icon.png'}
        className="app-icon"
    style={{width:80,height:80,borderRadius:5,backgroundColor:"#ff0000ff"}}/>
</div>


              <PHeader style={{ textAlign: "center", fontSize: 30 }}>
                {isCreatingPassword ? "Create your password" : "Login"}
              </PHeader>

              <span style={{ padding: 10, textAlign: "center", display: "block" }}>
                Login with your username and password
              </span>

              <br />

              {isCreatingPassword ? (
                <>
                  {/* CREATE PASSWORD */}
                  <TextField
                    fullWidth
                    size="medium"
                    label="Create password"
                    type={showPassword1 ? "text" : "password"}
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword1(!showPassword1)}>
                            {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <br /><br />

                  <TextField
                    fullWidth
                    size="medium"
                    label="Confirm password"
                    type={showPassword2 ? "text" : "password"}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword2(!showPassword2)}>
                            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              ) : (
                <>
                  {/* LOGIN */}
                  <TextField
                    fullWidth
                    size="medium"
                    label="Username"
                    value={data?.username || ""}
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />

                  <br /><br />

                  <TextField
                    fullWidth
                    size="medium"
                    label="Enter password"
                    type={showPassword ? "text" : "password"}
                    value={data?.password || ""}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              <br />
              {error && <span style={{ color: "red", textAlign: "center", display: "block" }}>{error}</span>}
              <br />

              <div className="flex items-center justify-center">
                <Button
                  fullWidth
                  variant="contained"
                  color="inherit"
                  style={{background:"#100b6cff",color:"#ffff"}}
                  size="large"

                  onClick={submit}
                  disabled={isLoading}
                >
                  {isLoading ? <ClipLoader size={18} color="white" /> : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
