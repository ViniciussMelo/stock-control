import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    FormControl,
    Button,
    TextField,
    Select,
    MenuItem,
    FormHelperText
} from "@material-ui/core";

import ProductService from "../../services/ProductService";

import ProductDialog from "./ProductDialog";
import ProductTable from "./ProductTable";
import {OpenOptions} from "./ProductDialog/openOptionsEnum";

interface ProductsProps {
    barcode: number;
    name: string;
    price: number;
    active: boolean;
}
export enum statusEnum {
    all,
    active,
    inactive
}

const Products = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [status, setStatus] = useState(statusEnum.all);

    useEffect(() => {
        loadProducts();      
    }, []);

    const loadProducts = async () => {
        const { data } = await ProductService.findAll();
        setProducts(data);
    };

    const handleCloseModal = () => {
        setDialogOpen(false);
        loadProducts();
    };

    const handleOpenModal = () => {
        setDialogOpen(true);
    };

    return (
        <>
            { dialogOpen && (
                    <ProductDialog 
                        open={dialogOpen} 
                        handleClose={handleCloseModal} 
                        openOption={OpenOptions.Create}
                    />
                )
            }
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
                            <div>
                                
                            </div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Select
                            style={{width: "50%"}}
                            value={status}
                            onChange={(e) => setStatus(parseInt(e.target.value as string))}
                            defaultValue={statusEnum.all}
                        >
                            <MenuItem value={statusEnum.all}>Todos</MenuItem>
                            <MenuItem value={statusEnum.active}>Ativo</MenuItem>
                            <MenuItem value={statusEnum.inactive}>Inativo</MenuItem>
                        </Select>
                        <FormHelperText>Status</FormHelperText>
                    </Grid>
                    <Grid item xs={3} style={{display: "flex", alignItems: "flex-start", justifyContent: "flex-end"}}>
                        <Button variant="outlined" color="primary" onClick={handleOpenModal} >Cadastrar</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductTable 
                            products={products} 
                            filter={filter} 
                            loadProducts={loadProducts} 
                            status={status}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Products;
