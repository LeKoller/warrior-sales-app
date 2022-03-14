import React, { useContext } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

import { IProductsTableCore } from "../../types";
import { ProductsContext } from "../../contexts/ProductsContext";
import styles from "../../styles/Tables.module.css"

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  "&:nth-of-type(even)": {
    cursor: "pointer",
  },
  "&:hover": {
    backgroundColor: theme.palette.action.focus,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ProductsTableCore(props: IProductsTableCore) {
  const {emptyRows, page, rows, rowsPerPage, products} = props;
  const {setItem} = useContext(ProductsContext)

  const selectItem = (id: number) => {
    const item = products.find(p => p.id === id)
    if (item) {
      setItem(item)
    }
  }
  
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <StyledTableRow key={row.id} onClick={() => selectItem(row.id)}>
          <TableCell className={styles.tableCell} component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell className={styles.tableCell} style={{ width: 160 }} align="left">
            {row.description}
          </TableCell>
          <TableCell className={styles.tableCell} style={{ width: 160 }} align="right">
            {row.price.toFixed(2).replace(".", ",")}
          </TableCell>
        </StyledTableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default ProductsTableCore;
