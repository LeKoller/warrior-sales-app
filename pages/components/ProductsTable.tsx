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

import styles from "../../styles/Tables.module.css";
import { TableHead } from "@mui/material";
import { ProductsContext } from "../../contexts/ProductsContext";
import {
  ITablePaginationActionsProps,
  ITableProps,
  ProductRow,
} from "../../types";
import ProductsTableCore from "./ProductsTableCore";

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
  name: string,
  description: string,
  price: number
) {
  return { id, name, description, price };
}

export default function ProductsTable(props: ITableProps) {
  const { loadData } = props;
  const noRows: ProductRow[] = [];
  const { products, pagination } = useContext(ProductsContext);

  const [page, setPage] = useState(pagination.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [rows, setRows] = useState(noRows);

  useEffect(() => {
    const generateRows = () => {
      const list: ProductRow[] = [];

      for (const product of products) {
        list.push(
          createData(
            product.id,
            product.name,
            product.description,
            product.price
          )
        );
      }

      return list;
    };

    const rs = generateRows();
    setRows(rs);
  }, [products, setRows]);

  const emptyRows = 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    loadData(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedRowsPerPage = parseInt(event.target.value, 10);

    loadData(1, parsedRowsPerPage)
    setRowsPerPage(parsedRowsPerPage);
    setPage(0);
  };

  return (
    <TableContainer className={styles.container} component={Paper}>
      <h1 className={styles.title}>Produtos</h1>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="left">Descrição</StyledTableCell>
            <StyledTableCell align="right">Preço (BRL)</StyledTableCell>
          </TableRow>
        </TableHead>

        <ProductsTableCore
          emptyRows={emptyRows}
          page={page}
          rows={rows}
          rowsPerPage={rowsPerPage}
          products={products}
        />

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              labelRowsPerPage={"Linhas por página:"}
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
