import { toast } from "sonner";

export const errorToast = (message) => {
    let errorMessage = "";
    errorMessage = typeof message === "string" ? message : "Something went wrong";
  
    if (
      Array.isArray(message) &&
      message.length > 0 &&
      typeof message[0] === "string"
    ) {
      errorMessage = message[0];
    }
  
    toast.error(errorMessage, {
      position: "top-center",
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };