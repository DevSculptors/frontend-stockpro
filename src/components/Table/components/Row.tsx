import { useState} from 'react';
import styles from './styles.module.scss';

interface RowProps {
    indexRow: string
    rowData: string[] 
    handleRow: (id: string) => void;
}

export function Row({ indexRow, rowData, handleRow}: RowProps) {
    let [tdKeyCounter, setTdKeyCounter] = useState(0);
    
    return (
        <tr  onClick={() => handleRow(indexRow)} className={styles.rowContainer}>

            {rowData.map((rowName) => (
                <td key={`${indexRow}-td-${tdKeyCounter++}`}>{rowName}</td>
            ))}
        </tr>
    );
}
