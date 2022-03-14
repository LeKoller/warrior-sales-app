import React from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

import { IOrdersTableCore } from "../../types";
import styles from "../../styles/Tables.module.css";

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

function OrdersTableCore(props: IOrdersTableCore) {
  const { rows } = props;

  return (
    <TableBody>
      {rows.map((row) => (
        <StyledTableRow key={row.id} onClick={() => {}}>
          <TableCell className={styles.tableCell} component="th" scope="row">
            {row.address}
          </TableCell>
          <TableCell className={styles.tableCell} style={{ width: 160 }} align="right">
            {row.team}
          </TableCell>
          <TableCell className={styles.tableCell} style={{ width: 160 }} align="right">
            {row.delivery ? row.delivery : "Não"}
          </TableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}

export default OrdersTableCore;
