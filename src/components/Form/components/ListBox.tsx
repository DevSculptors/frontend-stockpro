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
}

export function ListBox({ label, name, options, placeholder}: ListBoxProps) {
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
                value={formValues[name] || ''}
                onChange={handleChange}
            >
                <option value="">{placeholder}</option>
                {options.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </select>
        </div>
    );
}