import React, { useState, useEffect } from 'react';
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

import StockService from "../../services/StockService"

import StockTable from "./StockTable";

interface Stock {
    barcode: number;
    name: string;
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
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                                id="pesquisa" 
                                placeholder="Pesquisa por código ou nome"
                                // value={filter}
                                // onChange={event => setFilter(event.target.value)}
                            />
                            <div>
                                
                            </div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} style={{display: "flex", alignItems: "flex-start", justifyContent: "flex-end"}}>
                        <Button variant="outlined" color="primary" onClick={() => {}} >Cadastrar</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <StockTable 
                            stocks={stocks}
                            filter={filter}
                            loadStock={loadStocks}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Stocks;
