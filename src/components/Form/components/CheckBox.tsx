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
    defaultValue?: string
}

export function CheckBox ({label, options, name,defaultValue }: CheckBoxProps) {
    const { formValues, setFormValues } = useContext(FormContext)!

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(event.target.value)
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
                            type="radio"
                            id={option.value}
                            name={name}
                            value={option.value}
                            checked={formValues[name]}
                            onChange={handleChange}
                        />
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}