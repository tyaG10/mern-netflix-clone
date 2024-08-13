import axios from "axios";
import toast from "react-hot-toast"
import {create} from "zustand";


export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,

    signup: async (credentials) => {
        try{
            set({isSigningUp:true})
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({user: response.data.user, isSigningUp: false});
            toast.success("Account created successfully");
        }catch(error){
            toast.error(error.response.data.message || "Signup failed");
            set({isSigningUp: false, user: null});
        }
    },
    login: async (credentials) => {
        set({isLoggingIn: true});
        try{
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({user: response.data.user, isLoggingIn: false});
            toast.success("Logging successfully");
        }catch(error){
            set({isLoggingIn: false, user: null});
            toast.error(error.response.data.message || "Login failed");
        }
    },
    logout: async () => {
        set({isLoggingOut: true});
        try{
            await axios.post("/api/v1/auth/logout");
            set({user: null, isLoggingOut: false});
            toast.success("Logged out successfully")
        }catch(error){
            set({isLoggingOut: false});
            toast.error(error.response.data.message || "Logout failed");
        }
    },
    authCheck: async () => {
        set({isCheckingAuth: true});
        try{
            const response = await axios.get("/api/v1/auth/authCheck");
            set({user: response.data.user, isCheckingAuth: false});

        // eslint-disable-next-line no-unused-vars
        }catch(error){
            set({isCheckingAuth: false, user: null});
            //oast.error(error.response.data.message || "An error occurred");
        }
    },
}))