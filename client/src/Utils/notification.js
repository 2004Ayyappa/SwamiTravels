import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = (title) => {
  return toast.success(title, {
    position: "top-center", // Use string position
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const error = (title) => {
  return toast.error(title, {
    position: "top-center", // Use string position
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
