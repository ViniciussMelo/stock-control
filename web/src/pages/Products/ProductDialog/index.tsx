import React, { useState } from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
	Button,
	FormControlLabel,
	Checkbox
} from '@material-ui/core';

import ProductService from "../../../services/ProductService";
import {OpenOptions} from "./OpenOptionsEnum";

interface Product {
    barcode: number;
    name: string;
    price: number;
    active: boolean;
}

interface ProductDialogProp {
	product?: Product;
    open: boolean;
	handleClose(): void;
	openOption: OpenOptions;
}

interface ProductError {
	name: boolean;
    price: boolean;
}

const ProductDialog: React.FC<ProductDialogProp> = ({ openOption, product, open, handleClose }) => {
	const [newProduct, setNewProduct] = useState<Product>({
		barcode: product?.barcode || 0,
		name: product?.name || "",
		price: product?.price || 0.00,
		active: product ? product.active : true
	});
	const [productError, setProductError] = useState<ProductError>({
		name: false,
		price: false
	});

	const handleSubmit = async () => {
		let validPrice: boolean = true;
		let validName: boolean = true;

		if(productError.name || productError.price) {
			alert('Existem erros no formulário!');
			return;
		}

		if(!isValidName(newProduct.name)) {
			validName = false;
		}

		if (!isValidPrice(newProduct.price.toString())) {
			validPrice = false;
		}

		if(!validName || !validPrice) {
			alert('Existem erros no formulário!');
			setProductError({ name: !validName, price: !validPrice});
			return;
		}
		
		try{
			switch (openOption) {
				case OpenOptions.Create:
					await ProductService.create(newProduct);
					break;
				case OpenOptions.Edit:
					await ProductService.update(newProduct.barcode, newProduct);
					break;
				default:
					console.log('Error enum OpenOptions!');								
					break;
			}
			alert('Salvo com sucesso!')
		} catch(err) {
			const { data } = err.response;
			alert('Error: ' + data.error);
		}
		handleClose();
	}

	const isValidPrice = (value: string) => {
		if(!value.length || parseFloat(value) <= 0) {
			return false;
		}
		return true;
	}

	const isValidName = (value: string) => {
		if(!value.trim().length) {
			return false;
		}
		return true;
	}

	const handleEditName = (value: string) => {
		setNewProduct({...newProduct, name: value});
		setProductError({ ...productError, name: !isValidName });
	}

	const handleEditPrice = (value: string) => {
		setNewProduct({...newProduct, price: parseFloat(value)});
		setProductError({ ...productError, price: !isValidPrice(value) });
	}

    return (
        <>
			<Dialog 
				open={open} 
				onClose={handleClose} 
				aria-labelledby="form-dialog-title"
				fullWidth
			>
            	<DialogTitle id="form-dialog-title">Produto</DialogTitle>
					{product && (
						<DialogContent>
							<TextField
								disabled
								autoFocus
								margin="dense"
								id="barcode"
								label="Cód. Barras"
								type="number"
								fullWidth
								value={newProduct.barcode}
								onChange={(event) => {setNewProduct({...newProduct, barcode: parseInt(event.target.value)})}}
							/>
						</DialogContent>
					)}
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Nome"
							type="text"
							value={newProduct.name}
							onChange={(event) => {handleEditName(event.target.value)}}
							error ={productError.name}
							helperText={productError.name && "The value not be empty"}
							fullWidth
							required
						/>
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
							label="Preço"
							id="price"
							type="number"
							value={newProduct.price}
							onChange={(event) => {handleEditPrice(event.target.value)}}
							error ={productError.price}
							helperText={productError.price && "Value must be greater than zero"}
							required
						/>
						<FormControlLabel
							className="form-control-label-initial"
							disabled={product ? false : true}
							control={<Checkbox 
										name="checkedD"
										size="small"
										value={newProduct.active}
										checked={newProduct.active}
										onChange={(_) => {setNewProduct({...newProduct, active: !newProduct.active})}}
									/>} 
							label="Ativo"
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

export default ProductDialog;