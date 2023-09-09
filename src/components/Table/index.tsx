'use client'

import { Row} from './components'
import { createContext, useState, useContext } from 'react'
import styles from './styles.module.scss'

type TableValues = Record<string, string>

interface TableContextType {
    tableValues: TableValues
    setTableValues: React.Dispatch<React.SetStateAction<TableValues>>
}

interface TableProps {
    name: String
    columnNames: string[];
    children: React.ReactNode
}

export const TableContext = createContext<TableContextType | undefined>(undefined)



export function Table ({ name, columnNames, children}: TableProps) {
    const [tableValues, setTableValues] = useState<TableValues>({})

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
    }

    return (
        <TableContext.Provider value={{ tableValues, setTableValues }}>
            <table className={styles.table} >
                <thead>
                <tr>
                    {columnNames.map((columnName, index) => (
                        <th key={index}>{columnName}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </TableContext.Provider>
    )
}
Table.Row =Row