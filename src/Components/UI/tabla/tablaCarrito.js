import styles from './tabla.module.css';
import TableButtonsCarrito from './TableButtonsCarrito';

export default function TablaCarrito({
    tableColumnTitlesArray,
    rowDataArray,
    onClickCancelarOrden
}) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead className={styles.tableHeader}>
                    <tr>
                        {tableColumnTitlesArray.map((columnName) => (
                            <th key={columnName} scope="col" className={styles.tableHeaderCell}>{columnName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {rowDataArray && rowDataArray.length > 0 ? (
                        rowDataArray.map((rowObject) => (
                            <tr key={rowObject.id} className={styles.tableBodyRow}>
                                {tableColumnTitlesArray.map((columnName, index) => (
                                    columnName === "Accion" ?
                                        <TableButtonsCarrito
                                            key={index}
                                            index={index}
                                            onClickCancelarOrden={onClickCancelarOrden}
                                        />
                                        :
                                        <td key={columnName} data-label={`${columnName}:`} className={styles.tableBodyCell}>
                                            {rowObject[columnName]}
                                        </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <div colSpan={`${colCount}`} style={styles.errorDiv}>EL CARRITO ESTA VACIO</div>
                    )}
                </tbody>
            </table>
        </div>
    );
}
