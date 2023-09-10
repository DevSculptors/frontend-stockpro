'use client'

import { useContext } from 'react'
import { FormContext } from '..'
import styles from './styles.module.scss'

interface CheckBoxOption {
    value: string;
    label: string;
}
interface CheckBoxProps {
    options: CheckBoxOption[]
    name: string
    label: string
}

export function CheckBox ({label, options, name }: CheckBoxProps) {
    const { formValues, setFormValues } = useContext(FormContext)!

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: checked,
        }));
    };

    return (
        <div className={styles.checkBox}>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <div className={styles.checks} >
                {options.map((option) => (
                    <div key={option.value}>
                        <input
                            type="checkbox"
                            id={option.value}
                            name={name}
                            value={option.value}
                            checked={formValues[name] || false}
                            onChange={handleChange}
                        />
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}