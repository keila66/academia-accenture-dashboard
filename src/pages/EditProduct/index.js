import React, { useMemo } from "react";
import { useHistory, useParams,useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import Container from "../../components/Container";
import { useProduct } from "../../hooks/context/ProductProvider";
import { validationSchema } from "./validation";

import { Styled } from "./styles";

import { useFormik } from "formik";
// import { Container } from './styles';

function EditProduct() {
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation()
  const { error,  putProduct } = useProduct();


  const formik = useFormik({
    initialValues: {
        name: state? state.product.name : "",
        description: state? state.product.description : "",
        price: state? state.product.price : 0,
    },
    validationSchema,
    onSubmit: async (values) => {
        await putProduct({
          id,
          name: values.name,
          description: values.description,
          price: values.price,
        });

        history.push("/home");
        return;
      }
  });

  const AppError = useMemo(() => <Styled.Error>{error}</Styled.Error>, [error]);
  const ValidationNameError = useMemo(() => <Styled.Error>{formik.errors.name}</Styled.Error>, [formik.errors.name]);
  const ValidationPriceError = useMemo(() => <Styled.Error>{formik.errors.description}</Styled.Error>, [formik.errors.description]);
  const ValidationDescriptionError = useMemo(() => <Styled.Error>{formik.errors.price}</Styled.Error>, [formik.errors.price]);

  return (
    <Container title="Editar Produto" size="sm">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome do Produto</Form.Label>
          <Form.Control
            id="description"
            name="name"
            placeholder="Coloque o nome do Produto"
            onChange={formik.handleChange}
            isValid={formik.touched.name && !formik.errors.name}
            isInvalid={formik.errors.name}
            value={formik.values.name}
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
            value={formik.values.description}
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
            value={formik.values.price}
          />
          {ValidationPriceError}
        </Form.Group>
        <Button variant="primary" type="submit">
          Editar Produto
        </Button>
        {AppError}
      </Form>
    </Container>
  );
}

export default EditProduct;
