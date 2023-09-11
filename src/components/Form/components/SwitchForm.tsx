'use client'

import { useContext, useState} from 'react'
import { FormContext } from '..'
import styles from './styles.module.scss'
import {Switch} from "@adobe/react-spectrum";

interface SwitchProps {
    name: string
    label: string
    defaultValue?: string
}

export function SwitchForm({label, name }: SwitchProps) {
    const { formValues, setFormValues } = useContext(FormContext)!
    const [checked, setChecked] = useState(false);

    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
    };

    return (
        <div>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <Switch onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onChange={handleChange}/>
            <p>
                The switch is <span>{checked ? "on" : "off"}</span>.
            </p>
        </div>
    )
}