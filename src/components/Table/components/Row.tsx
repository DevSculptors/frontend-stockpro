import { useContext } from 'react';
import { TableContext } from '..';
import styles from './styles.module.scss';


interface RowProps {
    indexRow: string
    rowData: string[]
    functionEdit: () => void;
}

export function Row({ indexRow, rowData, functionEdit}: RowProps) {
    const { tableValues, setTableValues } = useContext(TableContext)!;
    return (
        <tr key={indexRow} onClick={() => functionEdit()} className={styles.rowContainer}>
            {rowData.map((rowName) => (
                <td key={indexRow}>{rowName}</td>
            ))}
        </tr>
    );
}
