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
import { FaSortUp, FaSortDown } from "react-icons/fa";

import ProductService from "../../services/ProductService";

interface ProductsProps {
    barcode: number;
    name: string;
    price: number;
    active: boolean;
}

interface SortedColum {
    columnName: string;
    ascending: boolean;
}

const Products = () => {
    const columnBarcode = 'barcode';
    const columnName = 'name';
    const columnPrice = 'price';
    const columnActive = 'active';
    
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [productsFiltered, setProductsFiltered] = useState<ProductsProps[]>([]);
    const [filter, setFilter] = useState('');
    const [sortColumn, setSortColumn] = useState<SortedColum>({
        columnName: 'barcode',
        ascending: true
    });

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
    };

    const deleteProduct = async (barcode: number) => {
        await ProductService.delete(barcode);
        loadProducts();
    };

    const openDialog = async (product? : ProductsProps) => {
        // open the dialog
    };

    const sortTable = (columnName: string) => {
        let ascending = columnName === sortColumn.columnName ? !sortColumn.ascending : true
        setSortColumn({
            columnName,
            ascending
        });

        sortProducts(columnName, ascending);
    };

    const sortProducts = (columnName: string, ascending: boolean) => {
        const sortedProducts = productsFiltered.sort((a: Record<string, any>, b: Record<string, any>) => {
            if(a[columnName] < b[columnName]) {
                return ascending ? -1 : 1;
            }
            if(a[columnName] > b[columnName]) {
                return ascending ? 1 : -1;
            }

            return 0;            
        });

        setProductsFiltered(sortedProducts);
    };

    const renderIconSort = (columnName: string) => {
        if (isSortedColumn(columnName)) {
            return sortColumn.ascending ? <FaSortUp /> : <FaSortDown />
        }
        return null;
    };

    const isSortedColumn = (columnName: string) => {
        return sortColumn.columnName === columnName;
    };

    const renderTable = () => {
        if (productsFiltered.length) {
            return (
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"
                                onClick={() => sortTable(columnBarcode)}
                            >
                                Cód. Barras
                                <span>
                                    {
                                        renderIconSort(columnBarcode)
                                    }
                                </span>
                            </TableCell>
                            <TableCell align="left" 
                                onClick={() => sortTable(columnName)}
                            >
                                Nome
                                <span>
                                    {
                                        renderIconSort(columnName)
                                    }
                                </span>
                            </TableCell>
                            <TableCell align="right"
                                onClick={() => sortTable(columnPrice)}
                            >
                                Preço
                                <span>
                                    {
                                        renderIconSort(columnPrice)
                                    }
                                </span>
                            </TableCell>
                            <TableCell 
                                align="left" 
                                style={{width: "80px"}}
                                onClick={() => sortTable(columnActive)}
                            >
                                Ativo
                                <span>
                                    {
                                        renderIconSort(columnActive)
                                    }
                                </span>
                            </TableCell>
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
