import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    FormControl,
    InputLabel,
    Input,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography
} from "@material-ui/core";
import FuncionarioService from "../../services/ProductService";


const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);
    
    const loadProducts = async () => {
        const {data} = await FuncionarioService.findAll();
        setProducts(data);
    }

    return (
        <div className="products">
            <h1>products</h1>
        </div>
    )
}

export default Products;
