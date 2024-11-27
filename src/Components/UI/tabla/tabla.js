import styles from './tabla.module.css';
import TableButtonsFunciones from './TableButtonsFunciones';
import TableButtonsFuncionesAsociadas from './TableButtonsFuncionesAsociadas';
import TableButtonsPeliculas from './TableButtonsPeliculas';
import TableButtonsCompras from './TableButtonsCompras';
import TableButtonsCarrito from './TableButtonsCarrito';

export default function Tabla({
    tableColumnTitlesArray,
    rowDataArray,
    tableType
}) {

    const getTableTypeActions = (tipoTabla, obj, index) => {
        switch (tipoTabla) {
            case "funciones":
                return <TableButtonsFunciones funcion={obj} />;
            case "funcionesAsociadas":
                return <TableButtonsFuncionesAsociadas funcionAsociada={obj} />;
            case "peliculas":
                return <TableButtonsPeliculas pelicula={obj} />;
            case "compras":
                return <TableButtonsCompras compra={obj} />;
            case "carrito":
                return <TableButtonsCarrito carrito={obj} index={index} />;
            default:
                return <td key={"Accion"} data-label="Accion:" className={styles.tableBodyCell}>ERROR OBTENER BOTONES</td>
        }
    }

    const getEmptyErrorMessage = (colCount, tipoTabla) => {
        switch (tipoTabla) {
            case "compras":
                return <tr><td colSpan={colCount} className={styles.errorDiv}>NO SE REALIZARON COMPRAS TODAVIA</td></tr>;
            case "comprasAsociadas":
                return <tr><td colSpan={colCount} className={styles.errorDiv}>NO TIENE COMPRAS ASOCIADAS</td></tr>;
            case "carrito":
                return <tr><td colSpan={colCount} className={styles.errorDiv}>EL CARRITO ESTA VACIO</td></tr>;
            case "funciones":
                return <tr><td colSpan={colCount} className={styles.errorDiv}>NO HAY FUNCIONES DISPONIBLES</td></tr>;
            case "funcionesAsociadas":
                return <tr><td colSpan={colCount} className={styles.errorDiv}>LA PELICULA NO TIENE FUNCIONES ASOCIADAS</td></tr>;
            case "peliculas":
                return <tr><td colSpan={colCount} className={styles.errorDiv}>NO HAY PELICULAS DISPONIBLES</td></tr>;
            case "generos":
                return <tr><td colSpan={colCount} className={styles.errorDiv}>NO HAY GENEROS DISPONIBLES</td></tr>;
            default:
                return <tr><td colSpan={colCount} className={styles.errorDiv}>ERROR AL OBTENER MENSAJE DE ERROR</td></tr>
        }
    }

    const getTableRowClass = (tableType, funcion) => {
        if (tableType === 'funciones' || tableType === 'funcionesAsociadas') {
            return funcion.AsientosDisponible > 0 ? styles.tableBodyRow : styles.tableBodyRowSinAsientos;
        }
        return styles.tableBodyRow;
    }

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
                            <tr key={rowObject.id} className={getTableRowClass(tableType, rowObject)}>
                                {tableColumnTitlesArray.map((columnName, index) => (
                                    columnName === "Accion" ? getTableTypeActions(tableType, rowObject, index) :
                                        <td key={columnName} data-label={`${columnName}:`} className={styles.tableBodyCell}>
                                            {rowObject[columnName]}
                                        </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        getEmptyErrorMessage(tableColumnTitlesArray.length, tableType)
                    )}
                </tbody>
            </table>
        </div>
    );
}
