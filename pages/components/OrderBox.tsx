import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

import { IProduct, ICartItem } from "../../types";
import { Button, Paper } from "@mui/material";
import styles from "../../styles/OrderBox.module.css";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

export default function TextFieldSizes(props: {
  item: IProduct;
  loadProducts: () => void;
}) {
  const { item, loadProducts } = props;

  const { address, setAddress, items, setItems } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(items.filter((i) => i.id !== 0));
  const [hasOrderFailed, setHasOrderFailed] = useState(false);
  const [couldNotSendOrder, setCouldNotSendOrder] = useState(false);
  const [hasCreatedOrder, setHasCreatedOrder] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [createProductMode, setCreateProductMode] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [hasCreatedProduct, setHasCreatedProduct] = useState(false);

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
  const productsURL = "https://localhost:7098/api/products";

  const setNoTokenAlert = () => {
    setErrorTitle("Não autenticado");
    setErrorMessage(
      "É necessário do token de autenticação para completar algumas requisições. Clique botão no canto superior direito da tela para simular o login e obter o token."
    );
    setCouldNotSendOrder(true);
  };

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

          setSuccessTitle("Encomenda criada!");
          setSuccessMessage(
            "Suas informações estarão disponíveis na tabela das encomendas."
          );
          setHasCreatedOrder(true);
          setItems(emptyItems);
          setCart(emptyItems.filter((i) => i.id !== 0));
          setQuantity(1);
          setAddress("");
        }
      } catch {
        setErrorTitle("Não foi possível criar a encomenda");
        setErrorMessage(
          "Pode ser que o servidor não esteja ligado em sua máquina ou algo tenha dado errado."
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
      setNoTokenAlert();
    }
  };

  const errorAlertCloseHandler = () => {
    setHasOrderFailed(false);
    setCouldNotSendOrder(false);
  };

  const successCloseHandler = () => {
    setHasCreatedOrder(false);
    setHasCreatedProduct(false);
  };

  const createProduct = async () => {
    const parsedPrice = parseFloat(newProductPrice.replace(",", ".").replace(".", "")).toFixed(
      2
    );
    const newProduct = {
      name: newProductName,
      price: parsedPrice,
      category: newProductCategory,
      description: newProductDescription,
      stock: quantity,
    };

    console.log(parsedPrice);

    if (token) {
      try {
        const response = await axios.post(productsURL, newProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          setSuccessTitle("Produto cadastrado");
          setSuccessMessage(
            "Logo mais será encontrado na lista de produtos e poderá ser vendido."
          );
          setHasCreatedProduct(true);
        }
      } catch {
        setErrorTitle("Não foi possível cadastrar o produto");
        setErrorMessage(
          "Pode ser que o servidor não esteja ligado em sua máquina ou algo tenha dado errado na construção do produto."
        );
        setHasOrderFailed(true);
        loadProducts();
      }
    } else {
      setNoTokenAlert();
    }
  };

  const toggleMode = () => {
    createProductMode
      ? setCreateProductMode(false)
      : setCreateProductMode(true);
  };

  return (
    <Paper className={item.id ? styles.container : styles.containerInvisible}>
      <div className={styles.top}>
        <h1 className={styles.title}>{createProductMode ? "Cadastrar" : "Encomendar"}</h1>
        <Button className={styles.switchButton} onClick={toggleMode}>
          {createProductMode ? "fazer encomenda" : "Cadastrar produto"}
        </Button>
      </div>
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
          value={createProductMode ? newProductName : item.name}
          variant="filled"
          disabled={!createProductMode}
          onChange={(event) => {
            createProductMode ? setNewProductName(event.target.value) : {};
          }}
        />
        <TextField
          label="Valor (BRL)"
          id="filled-size-normal"
          defaultValue={item.price.toFixed(2)}
          value={
            createProductMode
              ? newProductPrice
              : (quantity * item.price).toFixed(2)
          }
          variant="filled"
          disabled={!createProductMode}
          onChange={(event) => {
            createProductMode ? setNewProductPrice(event.target.value) : {};
          }}
        />
        <TextField
          label={createProductMode ? "Estoque" : "Quantidade"}
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
          label={createProductMode ? "Categoria" : "Endereço"}
          id="filled-size-normal"
          defaultValue={address}
          value={createProductMode ? newProductCategory : address}
          variant="filled"
          onChange={(event) => {
            createProductMode
              ? setNewProductCategory(event.target.value)
              : setAddress(event.target.value);
          }}
        />
        {createProductMode ? (
          <TextField
            label="Descrição"
            id="filled-size-normal"
            defaultValue={address}
            value={createProductMode ? newProductDescription : address}
            variant="filled"
            onChange={(event) => {
              setNewProductDescription(event.target.value);
            }}
          />
        ) : (
          <Button
            className={styles.button}
            onClick={makeOrder}
            disabled={!cart.length}
          >
            Encomendar
          </Button>
        )}
        <Button
          className={styles.button}
          onClick={createProductMode ? createProduct : addToCart}
        >
          {createProductMode
            ? "Efetuar cadastro"
            : `Adicionar ao Carrinho(${cart.length})`}
        </Button>
      </Box>

      <Snackbar
        open={hasCreatedOrder || hasCreatedProduct}
        onClose={successCloseHandler}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={successCloseHandler}
        >
          <AlertTitle>{successTitle}</AlertTitle>
          {successMessage}
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
