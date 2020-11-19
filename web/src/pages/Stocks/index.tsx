import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    FormControl,
    TextField
} from "@material-ui/core";

import StockService from "../../services/StockService"

import StockTable from "./StockTable";

interface Stock {
    barcode: number;
    name: string;
    active: boolean;
    totalAmount: number;
}

const Stocks = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadStocks();
    }, []);

    const loadStocks = async () => {
        const { data } = await StockService.findAll();
        setStocks(data);
    }

    return (
        <>
            <Container style={{paddingTop: '30px'}}>
            <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField 
                                id="pesquisa" 
                                placeholder="Pesquisa geral"
                                value={filter}
                                onChange={event => setFilter(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <StockTable 
                            stocks={stocks}
                            filter={filter}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Stocks;
