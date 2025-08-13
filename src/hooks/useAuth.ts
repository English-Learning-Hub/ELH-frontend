import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "../api/api.config";
import { RegisterFormData } from "@/types";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLogin, setisLogin] = useState(false)
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");    
    if (accessToken) {      
      setisLogin(true);
    } 
    else {
      setisLogin(false);
    }
  }, [queryClient.getQueryData(["user"])]);


  const loginUser = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => await authAPI.login(credentials),
    onSuccess: (data) => {
      
      Cookies.set("accessToken", data?.data?.accessToken, {
        expires: 60,
        secure: true,
        sameSite: "strict",
      });
      enqueueSnackbar("Login successfully", {
        variant: "success",
      });
      setisLogin(true)
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar("Invalid email or password", {
        variant: "error",
      });
      console.log(error);
    },
  });

  const registerUser = useMutation({
    mutationFn: async (credentials: RegisterFormData) => {
      const response = await authAPI.register(credentials);
      return response.data;
    },
    onSuccess: (data) => {
      enqueueSnackbar("Register successfully", {
        variant: "success",
      });
      navigate("/login");
    },
    onError: (error) => {
      enqueueSnackbar("Register failed", {
        variant: "error",
      });
      console.log(error);
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      const cookies = Cookies.get("accessToken");
      if (cookies) {
        Cookies.remove("accessToken");
      }
    },
    onSuccess: () => {
    enqueueSnackbar("Logout successfully", {
      variant: "success",
    });
    setisLogin(false)
      navigate("/login");
    },
    onError: (error) => {
      enqueueSnackbar("Logout failed", {
        variant: "error",
      });
      console.log(error);
    },
  });

  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => await authAPI.getProfile(),
  });

  

  return { loginUser, registerUser, user: user?.data?.data || null, logoutUser, isLogin };
};
