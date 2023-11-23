import { toast } from "sonner";

export const ToasterSucess = (message: string) => {
  toast.success(message);
};

export const ToasterError = (message: string) => {
  toast.error(message);
};

export const ToasterErrors = (errors: string[]) => {
  errors.forEach((error) => {
    toast.error(error);
  });
};

export const ToasterDefault = (message: string) => {
  toast(message);
}

export const ToasterEdit = (message: string) => {
  toast(message, {
    style: {
      background: "#3388ff",
      color: "#fff",
    },
  });
}
// Si se necesitan mas crearlos aca xd
// Sonner toast github