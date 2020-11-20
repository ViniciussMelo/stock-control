import React, { useEffect, useState } from 'react';
import { FaSortUp, FaSortDown } from "react-icons/fa";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography
} from "@material-ui/core";

interface Stock {
    barcode: number;
    name: string;
    active: boolean;
    totalAmount: number;
}

interface StockTableProps {
    stocks: Stock[];
    filter: string;
}

interface SortedColumn {
    columnName: string;
    ascending: boolean;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, filter }) => {
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

    useEffect(() => {
        if(filter.length) {
            const stocksFilter: Stock[] = stocks.filter(value => {
                return (
                    (value.barcode === parseInt(filter) ||
                     value.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) ||
                     value.totalAmount === parseInt(filter)
                );
            });

            setStocksShow(stocksFilter);
        } else {
            setStocksShow(stocks);
        }
    }, [filter, stocks])

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

    if (stocksShow.length) {
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
                            <TableRow key={stock.barcode} className="teste">
                                <TableCell align="right" id={!stock.active ? "inactive-row" : ""}>{stock.barcode}</TableCell>
                                <TableCell align="left" id={!stock.active ? "inactive-row" : ""}>{stock.name}</TableCell>
                                <TableCell align="right" id={!stock.active ? "inactive-row" : stock.totalAmount < 100 ? "low-quantity" : "" }>{stock.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        );
    }

    return (<Typography variant="subtitle1">Nenhum estoque encontrado.</Typography>);
}

export default StockTable;