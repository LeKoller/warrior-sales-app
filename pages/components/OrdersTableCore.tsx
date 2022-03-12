import React, { useContext } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

import { IOrdersTableCore } from "../../types";
import { ProductsContext } from "../../contexts/ProductsContext";

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
  const {emptyRows, page, rows, rowsPerPage, orders} = props;
//   const {setItem} = useContext(ProductsContext)

//   const selectItem = (id: number) => {
//     const item = orders.find(o => o.id === id)
//     if (item) {
//       setItem(item)
//     }
//   }
  
  return (
    <TableBody>
      {rows.map((row) => (
        <StyledTableRow key={row.id} onClick={() => {}}>
          <TableCell component="th" scope="row">
            {row.address}
          </TableCell>
          <TableCell style={{ width: 160 }} align="right">
            {row.team}
          </TableCell>
          <TableCell style={{ width: 160 }} align="right">
            {row.delivery ? row.delivery : "Não"}
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

export default OrdersTableCore;
