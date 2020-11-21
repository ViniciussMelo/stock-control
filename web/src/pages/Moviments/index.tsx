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
    const [moviments, setMoviments] = useState<Moviment[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filter, setFilter] = useState('');
    
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
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                                id="pesquisa" 
                                placeholder="Pesquisa geral"
                                value={filter}
                                onChange={event => setFilter(event.target.value)}
                            />
                            <div>
                                
                            </div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} style={{display: "flex", alignItems: "flex-start", justifyContent: "flex-end"}}>
                        <Button variant="outlined" color="primary" onClick={handleOpenModal} >Cadastrar</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <MovimentTable 
                            moviments={moviments}
                            filter={filter}
                            loadMoviments={loadMoviments}
                            filterStockType={StockTypeEnum.ALL} // default
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Moviments;
