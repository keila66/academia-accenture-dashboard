import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import Container from "../../components/Container";
import { useProduct } from "../../hooks/context/ProductProvider";
import { validationSchema } from "./validation";

import { Styled } from "./styles";

import { useFormik } from "formik";
// import { Container } from './styles';

function CreateProduct() {
  const history = useHistory();
  const { error, postProduct } = useProduct();

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      description: "",
      price: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      await postProduct(values);
      history.push("/home");
    },
  });

  const AppError = useMemo(() => <Styled.Error>{error}</Styled.Error>, [error]);
  const ValidationNameError = useMemo(() => <Styled.Error>{formik.errors.name}</Styled.Error>, [formik.errors.name]);
  const ValidationPriceError = useMemo(() => <Styled.Error>{formik.errors.description}</Styled.Error>, [formik.errors.description]);
  const ValidationDescriptionError = useMemo(() => <Styled.Error>{formik.errors.price}</Styled.Error>, [formik.errors.price]);

  return (
    <Container title="Criar Produto" size="sm">
      <Form onSubmit={formik.handleSubmit}>
        {/* <Form.Group controlId="formFile" className="mb-3" >
          <Form.Control type="file" id="image" 
            onChange={formik.handleChange}
            name="image"/>
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Nome do Produto</Form.Label>
          <Form.Control
            id="name"
            name="name"
            placeholder="Coloque o nome do Produto"
            onChange={formik.handleChange}
            isValid={formik.touched.name && !formik.errors.name}
            isInvalid={formik.errors.name}
          />
          {ValidationNameError}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            id="description"
            name="description"
            placeholder="Coloque uma descrição do Produto"
            onChange={formik.handleChange}
            isValid={formik.touched.description && !formik.errors.description}
            isInvalid={formik.errors.description}
          />
          {ValidationDescriptionError}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            id="price"
            name="price"
            type="number"
            placeholder="Digite o preço do produto"
            onChange={formik.handleChange}
            isValid={formik.touched.price && !formik.errors.price}
            isInvalid={formik.errors.price}
          />
          {ValidationPriceError}
        </Form.Group>
        <Button variant="primary" type="submit">
          Criar Produto
        </Button>
        {AppError}
      </Form>
    </Container>
  );
}

export default CreateProduct;
