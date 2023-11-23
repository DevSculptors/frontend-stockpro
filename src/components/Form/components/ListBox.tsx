'use client'

import { useContext } from 'react'
import { FormContext } from '..'
import styles from './styles.module.scss'

interface ListBoxOptions {
    value: string;
    label: string;
}
interface ListIdOptions {
    id: string;
    name: string;
}
interface ListBoxProps {
    options?: ListBoxOptions[]
    label: string;
    name: string;
    placeholder: string;
    defaultValue?: string;
    optionsId?: ListIdOptions[];
}

export function ListBox({ label, name, options, placeholder, optionsId}: ListBoxProps) {
    const { formValues, setFormValues } = useContext(FormContext)!;


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className={styles.listBox}>
            <label className={styles.label}>
                {label}
            </label>
            <select
                name={name}
                value={formValues[name] || '' }
                onChange={handleChange}
                required
            >
                <option hidden>{placeholder}</option>
                {options?.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
                {optionsId?.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.name}
                    </option>
                ))}
            </select>
            {formValues[name] === "" && (
                <p className="text-red-500 text-xs">Este campo es requerido</p>
            )}
        </div>
    );
}