import { useContext } from "react";
import { FormContext } from "..";
import styles from "./styles.module.scss";

interface TextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export function TextArea({ label, name, placeholder , rows}: TextAreaProps) {
  const { formValues, setFormValues } = useContext(FormContext)!;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={formValues[name] || ""}
        onChange={() => handleChange}
        placeholder={placeholder}
        rows={rows || 3}
        required
      />
      {formValues[name] === "" && (
        <p className="text-red-500 text-xs">Este campo es requerido</p>
      )}
    </div>
  );
}
