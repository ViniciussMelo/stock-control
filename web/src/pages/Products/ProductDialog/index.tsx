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

const ProductDialog: React.FC<ProductDialogProp> = ({ openOption, product, open, handleClose }) => {
	const [newProduct, setNewProduct] = useState<Product>({
		barcode: product?.barcode || 0,
		name: product?.name || "",
		price: product?.price || 0.00,
		active: product ? product.active : true
	});

	const handleSubmit = async () => {
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
		handleClose();
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
							fullWidth
							value={newProduct.name}
							onChange={(event) => {setNewProduct({...newProduct, name: event.target.value})}}
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
							onChange={(event) => {setNewProduct({...newProduct, price: parseFloat(event.target.value)})}}
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