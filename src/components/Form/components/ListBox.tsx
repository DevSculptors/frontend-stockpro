'use client'

import { useContext } from 'react'
import { FormContext } from '..'
import styles from './styles.module.scss'

interface ListBoxOptions {
    value: string;
    label: string;
}
interface ListBoxProps {
    options: ListBoxOptions[]
    label: string;
    name: string;
    placeholder: string;
    defaultValue?: string;
}

export function ListBox({ label, name, options, defaultValue}: ListBoxProps) {
    const { formValues, setFormValues } = useContext(FormContext)!;

    const setDefault = (defaultValue) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: defaultValue
        }))
        return defaultValue;
    }

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
                value={formValues[name] || '' || defaultValue}
                onChange={handleChange}>
                {options.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </select>
        </div>
    );
}