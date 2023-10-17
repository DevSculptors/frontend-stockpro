import { useContext, useRef, useEffect, useState } from "react";
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
  const ref = useRef<HTMLTextAreaElement>(null);


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${event.target.scrollHeight +6}px`;
        }
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
            onInput={handleChange}
            placeholder={placeholder}
            ref={ref}
            value={formValues[name]}
            required
        />
      {formValues[name] === "" && (
        <p className="text-red-500 text-xs">Este campo es requerido</p>
      )}
    </div>
  );
}
