import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    FormControl,
    Button,
    TextField
} from "@material-ui/core";

import ProductService from "../../services/ProductService";

import ProductDialog from "./ProductDialog";
import ProductTable from './ProductTable';

interface ProductsProps {
    barcode: number;
    name: string;
    price: number;
    active: boolean;
}

const Products = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadProducts();      
    }, []);

    const loadProducts = async () => {
        const {data} = await ProductService.findAll();
        setProducts(data);
    };

    const deleteProduct = async (barcode: number) => {
        await ProductService.delete(barcode);
        loadProducts();
    };

    const openDialog = async (product? : ProductsProps) => {
        // open the dialog
    };

    const handleCloseModal = () => {
        setDialogOpen(false);
        loadProducts();
    }

    const handleOpenModal = () => {
        setDialogOpen(true);
    }

    return (
        <>
            { dialogOpen && <ProductDialog open={dialogOpen} handleClose={handleCloseModal}/>}
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
                        <Button variant="outlined" color="primary" onClick={handleOpenModal} >Cadastrar</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductTable products={products} filter={filter} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Products;
