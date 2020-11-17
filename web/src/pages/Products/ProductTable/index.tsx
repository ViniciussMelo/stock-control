import React, { useEffect, useState } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Button
} from "@material-ui/core";
import { FaSortUp, FaSortDown } from "react-icons/fa";

import ProductDialog from "../ProductDialog";
import {OpenOptions} from "../ProductDialog/OpenOptionsEnum";

interface Product {
    barcode: number;
    name: string;
    price: number;
    active: boolean;
}

interface ProductsTableProps {
    products: Product[];
    filter: string;
}

interface SortedColum {
    columnName: string;
    ascending: boolean;
}

const ProductTable: React.FC<ProductsTableProps> = ({ products, filter }) => {
    const columnBarcode = 'barcode';
    const columnName = 'name';
    const columnPrice = 'price';
    const columnActive = 'active';
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sortColumn, setSortColumn] = useState<SortedColum>({
        columnName: 'barcode',
        ascending: true
    });
    const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
    const [selectedProdut, setSelectedProduct] = useState<Product>();

    const sortTable = (columnNameSort: string) => {
        let ascending = columnNameSort === sortColumn.columnName ? !sortColumn.ascending : true
        setSortColumn({
            columnName: columnNameSort,
            ascending
        });

        sortProducts(columnNameSort, ascending);
    };

    useEffect(() => {
        setProductsFiltered(products);
    }, [products])

    useEffect(() => {        
        if (filter.length) {
            const productsFilter: Product[] = products.filter(value => { 
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
    
    const sortProducts = (columnNameSort: string, ascending: boolean) => {
        const sortedProducts = products.sort((a: Record<string, any>, b: Record<string, any>) => {
            if(a[columnNameSort] < b[columnNameSort]) {
                return ascending ? -1 : 1;
            }
            if(a[columnNameSort] > b[columnNameSort]) {
                return ascending ? 1 : -1;
            }

            return 0;            
        });

        setProductsFiltered(sortedProducts);
    };

    const renderIconSort = (columnNameSort: string) => {
        if (isSortedColumn(columnNameSort)) {
            return sortColumn.ascending ? <FaSortUp /> : <FaSortDown />
        }
        return null;
    };

    const isSortedColumn = (columnNameSort: string) => {
        return sortColumn.columnName === columnNameSort;
    };

    const handleDeleteProduct = (product: Product) => {

    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const handleCloseModal = () => {
        setDialogOpen(false);
    }

    if (productsFiltered.length) {
        return (
            <>
                {dialogOpen && <ProductDialog 
                                    open={dialogOpen} 
                                    handleClose={handleCloseModal} 
                                    product={selectedProdut} 
                                    openOption={OpenOptions.Edit} 
                                />}
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
                                    <Button onClick={() => {handleEditProduct(product)}}>
                                        <AiFillEdit />
                                    </Button>
                                    <Button onClick={() => {handleDeleteProduct(product)}}>
                                        <AiFillDelete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )
    };

    return (<Typography variant="subtitle1">Nenhum produto encontrado.</Typography>);
};

export default ProductTable;