import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    FormControl,
    Button,
    TextField,
    Select,
    MenuItem
} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';

import MovimentService from "../../services/MovimentService";

import MovimentTable from "./MovimentTable";
import MovimentDialog from "./MovimentDialog";

import { StockTypeEnum } from "./Enums/stockTypeEnum";
import { OpenOptions } from './MovimentDialog/openOptionsEnum';

export interface Moviment {
    id: number;
    quantity: number;
    stockType: StockTypeEnum;
    movimentDate: Date;
    amount: number;
    barcode: number;
    name: string;
    active: boolean;
    price: number;
}

const Moviments = () => {
    const theme = useTheme();
    const stockTypes = new Array(StockTypeEnum.ALL, StockTypeEnum.ENTRY, StockTypeEnum.EXIT);
    
    const [moviments, setMoviments] = useState<Moviment[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [stockType, setStockType] = useState(StockTypeEnum.ALL);
    
    useEffect((() => {
        loadMoviments();
    }),[]);

    const loadMoviments = async () => {
        const { data } = await MovimentService.findAll();
        setMoviments(data);
    };

    const handleCloseModal = () => {
        setDialogOpen(false);
        loadMoviments();
    };

    const handleOpenModal = () => {
        setDialogOpen(true);
    };

    const handleSelectStockType = (value: string) => {
        const stockType: StockTypeEnum = stockTypes.find(type => type === value)!;
        
        setStockType(stockType);
    };

    return (
        <>
            {
                dialogOpen && (
                    <MovimentDialog 
                        open={dialogOpen}
                        handleClose={handleCloseModal}
                        openOption={OpenOptions.Create}
                    />
                )
            }
            <Container style={{paddingTop: '30px'}}>
                <Grid container spacing={3} >
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                                id="pesquisa" 
                                placeholder="Pesquisa geral"
                                value={filter}
                                onChange={event => setFilter(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Select 
                            style={{width: "50%"}}
                            value={stockType}
                            onChange={(event) => handleSelectStockType(event.target.value as string)}
                        >
                            {stockTypes.map((type, index) => (
                                <MenuItem
                                    key={index}
                                    value={type}
                                    style={{fontWeight: stockType === type
                                            ? theme.typography.fontWeightBold
                                            : theme.typography.fontWeightRegular}}
                                >
                                    {
                                        type === 'entry' ? 
                                            'Entrada' : 
                                            type === 'exit' ? 
                                                'Saída' :
                                                'Todos'
                                    }
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={3} style={{display: "flex", alignItems: "flex-start", justifyContent: "flex-end"}}>
                        <Button variant="outlined" color="primary" onClick={handleOpenModal} >Cadastrar</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <MovimentTable 
                            moviments={moviments}
                            filter={filter}
                            loadMoviments={loadMoviments}
                            filterStockType={stockType}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Moviments;
