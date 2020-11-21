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
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import ProductService from "../../../services/ProductService";
import MovimentService from "../../../services/MovimentService";

import { OpenOptions } from "./openOptionsEnum";
import { StockTypeEnum } from '../Enums/stockTypeEnum';
import { Moviment } from '../';

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
    price: number;
    active: boolean;
}

const MovimentDialog: React.FC<MovimentDialogProp> = ({ moviment, open, handleClose, openOption }) => {
    const theme = useTheme();

    const [newMoviment, setNewMoviment] = useState<Moviment>(moviment || {
        id: 0,
        quantity: 0,
        stockType: StockTypeEnum.ENTRY,
        movimentDate: new Date(),
        amount: 0,
        barcode: 0,
        name: "",
        active: true,
        price: 0
    });
    const [movimentError, setMovimentError] = useState<MovimentError>({
        barcode: false,
        quantity: false
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [productValue, setProductValue] = useState(moviment?.price || 0);
    const [dateValue, setDateValue] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
    const stockTypes = new Array(StockTypeEnum.ENTRY, StockTypeEnum.EXIT);

    useEffect(() => {        
        loadProducts();
    },[]);

    const loadProducts = async() => {
        const { data } = await ProductService.findAll();
        setProducts(data);
    };

    const handleSubmit = async () => {
		let validBarcode: boolean = true;
        let validQuantity: boolean = true;
        
        if(movimentError.barcode || movimentError.quantity) {
			return;
        }

		if(!isValidBarcode(newMoviment.barcode.toString())) {
			validBarcode = false;
		}

		if (!isValidQuantity(newMoviment.quantity.toString())) {
			validQuantity = false;
		}

		if(!validBarcode || !validQuantity) {
			setMovimentError({ barcode: !validBarcode, quantity: !validQuantity});
			return;
		}
        
        try{
            switch (openOption) {
				case OpenOptions.Create:
					await MovimentService.create(newMoviment);
					break;
				case OpenOptions.Edit:
					await MovimentService.update(newMoviment.id, newMoviment);
					break;
				default:
					console.log('Error enum OpenOptions!');								
					break;
			}
			alert('Salvo com sucesso!');
        } catch (err) {
			const { data } = err.response;
			alert('Error: ' + data.error);
        }
		handleClose();
    };

    const isValidBarcode = (value: string) => {
        if(!value.trim().length || parseInt(value) <= 0) {
			return false;
		}
		return true;
    };

    const isValidQuantity = (value: string) => {
        if(!value.length || parseInt(value) <= 0) {
			return false;
		}
		return true;
    };

    const handleEditQuantity = (value: string) => {
        const intValue = (parseInt(value) < 0 ? 0 : parseInt(value)) || 0;
        const amount: number = productValue * intValue;

        setNewMoviment({ ...newMoviment, quantity: intValue, amount });
        setMovimentError({ ...movimentError, quantity: !isValidQuantity(value) });
    };

    const handleSelectProduct = (value: number) => {
        const selectedProduct: Product = products.find(product => product.barcode === value)!;
        const amount: number = selectedProduct.price * newMoviment.quantity;

        setProductValue(selectedProduct.price);
        setNewMoviment({ ...newMoviment, barcode: value, amount })
        setMovimentError({ ...movimentError, barcode: !isValidBarcode(value.toString()) })
    };

    const handleEditStockType = (value: string) => {
        const stockType: StockTypeEnum = stockTypes.find(type => type === value)!;

        setNewMoviment({ ...newMoviment, stockType, });
    };

    const handleEditDate = (value: string) => {
        const formatedDate = value.substring(5, 7) + '/' + value.substring(8, 10)  + '/' + value.substring(0, 4);
        const valueDate = new Date(formatedDate);

        setNewMoviment({ ...newMoviment, movimentDate: valueDate });
        setDateValue(value);
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
                            <FormControl 
                                error={movimentError.barcode} 
                                fullWidth
                                disabled={moviment ? true : false}
                            >
                                <InputLabel 
                                    id="demo-simple-select-label"
                                    required
                                >
                                    Produto
                                </InputLabel>
                                <Select
                                    value={newMoviment.barcode}
                                    onChange={(event) => handleSelectProduct(parseInt(event.target.value as string))}
                                    fullWidth
                                >
                                    {products.map((product) => (
                                        <MenuItem
                                            key={product.barcode}
                                            value={product.barcode}
                                            style={{fontWeight: newMoviment.barcode === product.barcode
                                                    ? theme.typography.fontWeightBold
                                                    : theme.typography.fontWeightRegular}}
                                            disabled={!product.active}
                                        >
                                            {product.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {movimentError.barcode && <FormHelperText style={{color: "red"}}>Value must not be empty</FormHelperText>}
                            </FormControl>
                        </DialogContent>
                        <DialogContent style={{display: "flex", justifyContent: "space-between"}}>
                            <FormControl fullWidth style={{width: "60%"}}>
                                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                <Select
                                    value={newMoviment.stockType}
                                    onChange={(event) => handleEditStockType(event.target.value as string)}
                                >
                                    {stockTypes.map((type, index) => (
                                        <MenuItem
                                            key={index}
                                            value={type}
                                            style={{fontWeight: newMoviment.stockType === type
                                                    ? theme.typography.fontWeightBold
                                                    : theme.typography.fontWeightRegular}}
                                        >
                                            {type === 'entry' ? 'Entrada' : 'Saída'}
                                        </MenuItem>
                                    ))}    
                                </Select>
                            </FormControl>
                            <form noValidate style={{width: "35%"}}>
                                <TextField
                                    id="date"
                                    label="Data"
                                    type="date"
                                    value={dateValue}
                                    onChange={value => handleEditDate(value.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                />
                            </form>
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
                                error={movimentError.quantity}
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