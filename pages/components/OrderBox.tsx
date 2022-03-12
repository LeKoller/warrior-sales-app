import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

import { IProduct, ICartItem } from "../types";
import { Button, Paper } from "@mui/material";
import styles from "../../styles/OrderBox.module.css";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

export default function TextFieldSizes(props: { item: IProduct }) {
  const { item } = props;

  const { address, setAddress, items, setItems } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(items.filter((i) => i.id !== 0));
  const [hasOrderFailed, setHasOrderFailed] = useState(false);
  const [couldNotSendOrder, setCouldNotSendOrder] = useState(false);
  const [hasCreatedOrder, setHasCreatedOrder] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addToCart = () => {
    const cartItem: ICartItem = {
      id: item.id,
      name: item.name,
      quantity,
    };

    setCart([...cart, cartItem]);
    setItems([...cart, cartItem]);
  };

  const ordersURL = "https://localhost:7098/api/orders";

  const makeOrder = async () => {
    errorAlertCloseHandler();

    if (address && token) {
      try {
        const response = await axios.post(
          ordersURL,
          { address, cart },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          const emptyItems = [{ id: 0, name: "", quantity: 0 }];
          setHasCreatedOrder(true);
          setItems(emptyItems);
          setCart(emptyItems.filter((i) => i.id !== 0));
          setQuantity(1);
          setAddress("");
        }
      } catch {
        setErrorTitle("Não foi possível criar a encomenda");
        setErrorMessage(
          "Pode ser que ele não esteja ligado em sua máquina ou algo tenha dado errado."
        );
        setHasOrderFailed(true);
      }
    } else if (!address) {
      setErrorTitle("Campo do Endereço não preenchido");
      setErrorMessage(
        "É necessário informar um endereço para fazer a encomenda."
      );
      setCouldNotSendOrder(true);
    } else if (!token) {
      setErrorTitle("Não autenticado");
      setErrorMessage(
        "É necessário do token de autenticação para completar algumas requisições. Clique botão no canto superior direito da tela para simular o login e obter o token."
      );
      setCouldNotSendOrder(true);
    }
  };

  const errorAlertCloseHandler = () => {
    setHasOrderFailed(false);
    setCouldNotSendOrder(false);
  };

  const successCloseHandler = () => {
    setHasCreatedOrder(false);
  };

  return (
    <Paper className={styles.container}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "94%" },
        }}
        noValidate
        autoComplete="off"
        className={styles.box}
      >
        <TextField
          label="Produto"
          id="filled-size-normal"
          defaultValue={item.name}
          value={item.name}
          variant="filled"
          disabled
        />
        <TextField
          label="Valor (BRL)"
          id="filled-size-normal"
          defaultValue={item.price.toFixed(2)}
          value={(quantity * item.price).toFixed(2)}
          variant="filled"
          disabled
        />
        <TextField
          label="Quantidade"
          id="filled-size-normal"
          defaultValue={1}
          value={quantity > 0 ? quantity : 1}
          variant="filled"
          type={"number"}
          onChange={(event) => {
            setQuantity(parseInt(event.target.value));
          }}
        />
        <TextField
          label="Endereço"
          id="filled-size-normal"
          defaultValue={address}
          value={address}
          variant="filled"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <Button
          className={styles.button}
          onClick={makeOrder}
          disabled={!cart.length}
        >
          Encomendar
        </Button>
        <Button className={styles.button} onClick={addToCart}>
          Adicionar ao Carrinho({cart.length})
        </Button>
      </Box>

      <Snackbar
        open={hasCreatedOrder}
        onClose={successCloseHandler}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={successCloseHandler}
        >
          <AlertTitle>Encomenda criada!</AlertTitle>
          Suas informações estarão disponíveis na tabela das encomendas.
        </Alert>
      </Snackbar>

      <Snackbar
        open={hasOrderFailed || couldNotSendOrder}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={errorAlertCloseHandler}
        >
          <AlertTitle>{errorTitle}</AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
