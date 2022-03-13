import React, { useContext, useEffect, useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import theme from "../../styles/theme";
import { TableHead } from "@mui/material";
import { OrdersContext } from "../../contexts/OrdersContext";
import {
  ITablePaginationActionsProps,
  OrderRow,
  IOrdersTableProps,
} from "../../types";
import OrdersTableCore from "./OrdersTableCore";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TablePaginationActions(props: ITablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  id: number,
  address: string,
  delivery: string,
  team: string
) {
  return { id, address, delivery, team };
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
      padding: "0 8px 8px 8px",
    },
    title: {
      font: theme.typography.fontFamily,
      color: theme.palette.grey[800],
      fontWeight: 400,
      fontSize: "24px",
      marginLeft: "12px",
    },
  })
);

export default function OrdersTable(props: IOrdersTableProps) {
  const { loadOrders } = props;
  const noRows: OrderRow[] = [];
  const { orders, pagination } = useContext(OrdersContext);

  const [page, setPage] = useState(pagination.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [rows, setRows] = useState(noRows);

  useEffect(() => {
    const generateRows = () => {
      const list: OrderRow[] = [];

      for (const order of orders) {
        list.push(
          createData(order.id, order.address, order.delivery, order.team.name)
        );
      }

      return list;
    };

    const rs = generateRows();
    setRows(rs);
  }, [orders, setRows]);

  const emptyRows = 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    loadOrders(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedRowsPerPage = parseInt(event.target.value, 10);

    loadOrders(1, parsedRowsPerPage)
    setRowsPerPage(parsedRowsPerPage);
    setPage(0);
  };

  const classes = useStyles();

  return (
    <TableContainer className={classes.container} component={Paper}>
      <h1 className={classes.title}>Encomendas</h1>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell>Endereço</StyledTableCell>
            <StyledTableCell align="right">Equipe</StyledTableCell>
            <StyledTableCell align="right">Entregue</StyledTableCell>
          </TableRow>
        </TableHead>

        <OrdersTableCore
          emptyRows={emptyRows}
          page={page}
          rows={rows}
          rowsPerPage={rowsPerPage}
          orders={orders}
        />

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              colSpan={3}
              count={pagination.total}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
