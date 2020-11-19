import React, { useEffect, useState } from 'react';
import { FaSortUp, FaSortDown } from "react-icons/fa";
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

interface Stock {
    barcode: number;
    name: string;
    totalAmount: number;
}

interface StockTableProps {
    stocks: Stock[];
    filter: string;
    loadStock(): void;
}

interface SortedColumn {
    columnName: string;
    ascending: boolean;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, filter, loadStock }) => {
    const columnBarcode = 'barcode';
    const columnName = 'name';
    const columnTotalAmount = 'totalAmount';

    const [stocksShow, setStocksShow] = useState<Stock[]>([]);
    const [sortColumn, setSortColumn] = useState<SortedColumn>({
        columnName: columnBarcode,
        ascending: true
    });

    useEffect(() => {
        setStocksShow(stocks);
    }, [stocks]);

    const sortTable = (columnNameSort: string) => {
        let ascending = columnNameSort === sortColumn.columnName ? !sortColumn.ascending : true
        setSortColumn({
            columnName: columnNameSort,
            ascending
        });

        sortStock(columnNameSort, ascending);
    }

    const sortStock = (columnNameSort: string, ascending: boolean) => {
        const sortedStocks = stocks.sort((a: Record<string, any>, b: Record<string, any>) => {
            if(a[columnNameSort] < b[columnNameSort]) {
                return ascending ? -1 : 1;
            }
            if(a[columnNameSort] > b[columnNameSort]) {
                return ascending ? 1 : -1;
            }

            return 0;            
        });

        setStocksShow(sortedStocks);
    }

    const renderIconSort = (columnNameSort: string) => {
        if (isSortedColumn(columnNameSort)) {
            return sortColumn.ascending ? <FaSortUp /> : <FaSortDown />
        }
        return null;
    };

    const isSortedColumn = (columnNameSort: string) => {
        return sortColumn.columnName === columnNameSort;
    };

    return (
        <>
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
                            onClick={() => sortTable(columnTotalAmount)}
                        >
                            Quantidade
                            <span>
                                {
                                    renderIconSort(columnTotalAmount)
                                }
                            </span>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocksShow.map((stock) => (
                        <TableRow key={stock.barcode}>
                            <TableCell align="right">{stock.barcode}</TableCell>
                            <TableCell align="left">{stock.name}</TableCell>
                            <TableCell align="right" style={stock.totalAmount < 100 ? {color: 'red'} : {}}>{stock.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default StockTable;