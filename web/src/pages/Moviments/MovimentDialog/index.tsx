import React, { useState, useEffect } from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
	Button,
	FormControlLabel,
	Checkbox,
    Select,
    Input,
    Chip,
    MenuItem
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import ProductService from "../../../services/ProductService";
import MovimentService from "../../../services/MovimentService";

import {OpenOptions} from "./openOptionsEnum";
import { StockTypeEnum } from '../Enums/stockTypeEnum';

interface Moviment {
    id: number;
    quantity: number;
    stockType: StockTypeEnum;
    movimentDate: Date;
    amount: number;
    barcode: number;
    name: string;
    active: boolean;
}

interface MovimentDialogProp {
    moviment?: Moviment;
    open: boolean;
    handleClose(): void;
    openOption: OpenOptions;
}

interface MovimentError {
    quantity: boolean;
    barcode: boolean;
}

interface Product {
    barcode: number;
    name: string;
}

const MovimentDialog: React.FC<MovimentDialogProp> = ({ moviment, open, handleClose, openOption }) => {
    const theme = useTheme();

    const [newMoviment, setNewMoviment] = useState<Moviment>({
        id: 0,
        quantity: 0,
        stockType: StockTypeEnum.ENTRY,
        movimentDate: new Date(),
        amount: 0,
        barcode: 0,
        name: "",
        active: true
    });
    const [movimentError, setMovimentError] = useState<MovimentError>({
        barcode: false,
        quantity: false
    });
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        loadProducts();
    },[]);

    const loadProducts = async() => {
        const { data } = await ProductService.findAll();
        setProducts(data);
    };

    const handleSubmit = () => {

    };

    const isValidBarcode = (value: string) => {
        return true;
    };

    const isValidQuantity = (value: string) => {
        return true;
    };

    const handleEditQuantity = (value: string) => {
        setNewMoviment({ ...newMoviment, quantity: parseInt(value) });
        setMovimentError({ ...movimentError, quantity: !isValidQuantity(value) });
    };

    return (
        <>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Movimento</DialogTitle>
                    {moviment && (
                        <DialogContent>
                            <TextField
                                disabled
                                autoFocus
                                margin="dense"
                                id="baidrcode"
                                label="Id"
                                type="number"
                                fullWidth
                                value={newMoviment.id}
                            />
                            </DialogContent>
                    )}
                        <DialogContent>
                            <Select
                                value={newMoviment.barcode}
                                onChange={(event) => setNewMoviment({ ...newMoviment, barcode: parseInt(event.target.value as string) })}
                                input={<Input />}
                                fullWidth
                            >
                                {products.map((product) => (
                                    <MenuItem
                                        key={product.barcode}
                                        value={product.barcode}
                                        style={{fontWeight: newMoviment.barcode === product.barcode
                                                ? theme.typography.fontWeightBold
                                                : theme.typography.fontWeightRegular}}
                                    >
                                        {product.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </DialogContent>
                        <DialogContent
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Quantidade"
                                id="quantity"
                                type="number"
                                value={newMoviment.quantity}
                                onChange={(event) => {handleEditQuantity(event.target.value)}}
                                error ={movimentError.quantity}
                                helperText={movimentError.quantity && "Value must be greater than zero"}
                                required
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Total"
                                id="amount"
                                type="number"
                                value={newMoviment.amount}
                                required
                                disabled
                            />
                        </DialogContent>
                	<DialogActions>
                		<Button onClick={handleClose} color="primary">
							Cancelar
						</Button>
						<Button onClick={handleSubmit} color="primary">
							Salvar
						</Button>
                	</DialogActions>
            </Dialog>
        </>
    );
}

export default MovimentDialog;