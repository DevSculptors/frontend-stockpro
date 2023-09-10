import { useState} from 'react';
import styles from './styles.module.scss';


interface RowProps {
    indexRow: string
    rowData: string[]
    functionEdit: () => void;
}

export function Row({ indexRow, rowData, functionEdit}: RowProps) {
    let [tdKeyCounter, setTdKeyCounter] = useState(0);

    return (
        <tr  onClick={() => functionEdit()} className={styles.rowContainer}>
            {rowData.map((rowName) => (
                <td key={`${indexRow}-td-${tdKeyCounter++}`}>{rowName}</td>
            ))}
        </tr>
    );
}
