import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    FormControl,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    TextField
} from "@material-ui/core";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import ProductService from "../../services/ProductService";

interface ProductsProps {
    barcode: number;
    name: string;
    price: number;
    active: boolean;
}


const Products = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [productsFiltered, setProductsFiltered] = useState<ProductsProps[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        if (filter.length) {
            const productsFilter: ProductsProps[] = products.filter(value => { 
                return (
                    value.barcode === parseInt(filter) ||
                    value.name.toLowerCase().includes(filter)
                );
            } );

            setProductsFiltered(productsFilter);
        } else {
            setProductsFiltered(products);
        }
    },[filter]);

    const loadProducts = async () => {
        const {data} = await ProductService.findAll();
        setProducts(data);
        setProductsFiltered(data);
    }

    const deleteProduct = async (barcode: number) => {
        await ProductService.delete(barcode);
        loadProducts();
    }

    const openDialog = async (product? : ProductsProps) => {
        // open the dialog
    }

    const renderTable = () => {
        if (productsFiltered.length) {
            return (
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Cód. Barras</TableCell>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="left" style={{width: "50px"}}>Ativo</TableCell>
                            <TableCell align="right" style={{width: "200px"}} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsFiltered.map((product) => (
                            <TableRow key={product.barcode}>
                                <TableCell align="right">{product.barcode}</TableCell>
                                <TableCell align="left">{product.name}</TableCell>
                                <TableCell align="right">{`R$ ${product.price}`}</TableCell>
                                <TableCell align="left">{product.active ? "Sim" : "Não"}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => openDialog(product)}>
                                        <AiFillEdit />
                                    </Button>
                                    <Button onClick={() => deleteProduct(product.barcode)}>
                                        <AiFillDelete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        };

        return (<Typography variant="subtitle1">Nenhum produto encontrado.</Typography>);
    };

    return (
        <Container style={{paddingTop: '30px'}}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField 
                            id="pesquisa" 
                            placeholder="Pesquisa por código ou nome"
                            value={filter}
                            onChange={event => setFilter(event.target.value)}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6} style={{display: "flex", alignItems: "flex-end", justifyContent: "flex-end"}}>
                    <Button variant="outlined" color="primary" >Cadastrar</Button>
                </Grid>
                <Grid item xs={12}>
                    {renderTable()}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Products;
