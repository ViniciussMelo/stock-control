import React from 'react';
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

import StockTable from "./StockTable";

const Stocks = () => {
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
                        {/* Stocks table */}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Stocks;
