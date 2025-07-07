import { toast, type TypeOptions } from "react-toastify";

const toastNotify = (message: string, type: TypeOptions= "success") => {
    toast(message, {
        type: type,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};

export default toastNotify;