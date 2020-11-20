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

import MovimentService from "../../../services/MovimentService";
import MovimentDialog from "../MovimentDialog";
import DialogConfirmation from "../../../components/DialogConfirmation/DialogConfirmation";

import { ConfirmationEnum } from "../../../components/DialogConfirmation/ConfirmationEnum";
import { StockTypeEnum } from "../Enums/stockTypeEnum";

interface Moviment {
    id: number;
    quantity: number;
    stockType: StockTypeEnum;
    movimentDate: Date;
    amount: string;
    barcode: number;
    name: string;
    active: boolean;
}

interface MovimentsTableProp {
    moviments: Moviment[];
    filter: string;
    loadMoviments(): void;
    filterStockType: StockTypeEnum;
}

interface SortedColumn {
    columnName: string;
    ascending: boolean;
}

const MovimentTable: React.FC<MovimentsTableProp> = ({ moviments, filter, loadMoviments, filterStockType }) => {
    const columnQuantity = 'quantity';
    const columnStockType = 'stockType';
    const columnAmount = 'amount';
    const columnMovimentDate = 'movimentDate';
    const columnBarcode = 'barcode';
    const columnName = 'name';

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogConfirmationOpen, setDialogConfirmationOpen] = useState(false);
    const [sortColumn, setSortColumn] = useState<SortedColumn>({
        columnName: 'id',
        ascending: true
    });
    const [movimentsFiltered, setMovimentsFiltered] = useState<Moviment[]>([]);
    const [selectedMoviment, setSelectedMoviment] = useState<Moviment>();

    useEffect(() => {
        if (filter.length) {
            const movimentsFilter: Moviment[] = moviments.filter(value => { 
                return (
                    (value.barcode === parseInt(filter) ||
                    value.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
                    value.quantity === parseInt(filter) ||
                    value.amount === filter) && (
                        filterStockType === StockTypeEnum.ALL || value.stockType === filterStockType
                    )
                );
            } );

            setMovimentsFiltered(movimentsFilter);
        } else {
            setMovimentsFiltered(moviments);
        }
    },[filter, filterStockType, moviments]);

    const sortTable = (columnNameSort: string) => {
        let ascending = columnNameSort === sortColumn.columnName ? !sortColumn.ascending : true
        setSortColumn({
            columnName: columnNameSort,
            ascending
        });

        sortMoviments(columnNameSort, ascending);
    };

    const sortMoviments = (columnNameSort: string, ascending: boolean) => {
        const sortedMoviments = moviments.sort((a: Record<string, any>, b: Record<string, any>) => {
            if(a[columnNameSort] < b[columnNameSort]) {
                return ascending ? -1 : 1;
            }
            if(a[columnNameSort] > b[columnNameSort]) {
                return ascending ? 1 : -1;
            }

            return 0;            
        });
        
        setMovimentsFiltered(sortedMoviments);
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

    const handleEditMoviment = (moviment: Moviment) => {
        setSelectedMoviment(moviment);
        setDialogOpen(true);
    };

    const handleCloseModal = () => {
        setDialogOpen(false);
        loadMoviments();
    };

    const handleCloseModalConfirmation = async (action: ConfirmationEnum) => {
        setDialogConfirmationOpen(false);        
        if(action === ConfirmationEnum.Agree) {
            try {
                await MovimentService.delete(selectedMoviment!.id);
                loadMoviments();
            } catch(err) {
                const { data } = err.response;
                alert('Error: ' + data.error);
            }
        }
    }

    const handleDeleteMoviment = (moviment: Moviment) => {
        setSelectedMoviment(moviment);
        setDialogConfirmationOpen(true);
    };

    if (movimentsFiltered.length) {
        return (
            <>
                {/* {dialogOpen && (
                        <ProductDialog 
                            open={dialogOpen} 
                            handleClose={handleCloseModal} 
                            product={selectedProdut} 
                            openOption={OpenOptions.Edit} 
                        />
                    )
                } */}
                {
                    dialogConfirmationOpen && (
                        <DialogConfirmation 
                            open={dialogConfirmationOpen}
                            handleClose={(action: ConfirmationEnum) => {handleCloseModalConfirmation(action)}}
                            message="Confirma a exlcusão do registro selecionado?"
                        />
                    )
                }
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
                                onClick={() => sortTable(columnMovimentDate)}
                            >
                                Data
                                <span>
                                    {
                                        renderIconSort(columnMovimentDate)
                                    }
                                </span>
                            </TableCell>
                            <TableCell 
                                align="right"
                                onClick={() => sortTable(columnQuantity)}
                            >
                                Quantidade
                                <span>
                                    {
                                        renderIconSort(columnQuantity)
                                    }
                                </span>
                            </TableCell>
                            <TableCell 
                                align="right"
                                onClick={() => sortTable(columnAmount)}
                            >
                                Total
                                <span>
                                    {
                                        renderIconSort(columnAmount)
                                    }
                                </span>
                            </TableCell>
                            <TableCell 
                                align="left"
                                onClick={() => sortTable(columnStockType)}
                            >
                                Tipo
                                <span>
                                    {
                                        renderIconSort(columnStockType)
                                    }
                                </span>
                            </TableCell>
                            <TableCell align="right" style={{width: "200px"}} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movimentsFiltered.map((moviment) => (
                            <TableRow key={moviment.id}>
                                <TableCell align="right" id={!moviment.active ? "inactive-row" : ""}>{moviment.barcode}</TableCell>
                                <TableCell align="left" id={!moviment.active ? "inactive-row" : ""}>{moviment.name}</TableCell>
                                <TableCell align="right" id={!moviment.active ? "inactive-row" : ""}>{new Date(moviment.movimentDate).toLocaleDateString()}</TableCell>
                                <TableCell align="right" id={!moviment.active ? "inactive-row" : ""}>{moviment.quantity}</TableCell>
                                <TableCell align="right" id={!moviment.active ? "inactive-row" : ""}>{`R$ ${moviment.amount}`}</TableCell>
                                <TableCell 
                                    align="left" 
                                    id={!moviment.active ? "inactive-row" : moviment.stockType === StockTypeEnum.EXIT ? "stock-type-exit" : "stock-type-entry"}
                                >
                                        {moviment.stockType === StockTypeEnum.ENTRY ? 'Entrada' : 'Saída'}
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {handleEditMoviment(moviment)}}>
                                        <AiFillEdit />
                                    </Button>
                                    <Button onClick={() => {handleDeleteMoviment(moviment)}}>
                                        <AiFillDelete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        );
    }

    return (<Typography variant="subtitle1">Nenhum movimento encontrado.</Typography>);
}

export default MovimentTable;