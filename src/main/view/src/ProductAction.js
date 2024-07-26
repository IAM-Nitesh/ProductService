import React, { useState } from 'react';
import ProductTable from './model/ProductTable';
import Pagination from './model/Pagination';
import ProductModal from './model/ProductModal';
import ErrorSnackbar from './model/ErrorSnackbar';
import useProductActions from './controller/useProductActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ProductActions() {
    const {
        products,
        getProductById,
        getAllProducts,
        replaceProduct,
        errorMessage,
        resolution,
        snackbarOpen,
        setSnackbarOpen
    } = useProductActions();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSubmit = (event, productDetails) => {
        event.preventDefault();
        replaceProduct(productDetails.id, productDetails);
        setIsModalOpen(false);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleGetProductById = async () => {
        const id = prompt('Enter Product ID:');
        const response = await getProductById(id);
        if (response) {
            console.log('Get Product by ID Response:', response);
        }
    };

    const handleGetAllProducts = async () => {
        const response = await getAllProducts();
        if (response) {
            console.log('Get All Products Response:', response);
        }
    };

    const handleReplaceProduct = () => {
        const id = prompt('Enter Product ID to replace:');
        if (id) {
            const product = products.find(p => p.id === parseInt(id));
            if (product) {
                setProductDetails(product);
                setIsModalOpen(true);
            } else {
                alert('Product not found');
            }
        }
    };

    return (
        <div style={{ flexDirection: 'column', padding: '20px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                <h2>Product Actions</h2>
                <button onClick={handleGetProductById}>Get Product by ID</button>
                <button onClick={handleGetAllProducts}>Get All Products</button>
                <button onClick={handleReplaceProduct}>Replace Product</button>
            </div>
            <ProductTable products={currentProducts} />
            <Pagination totalPages={totalPages} paginate={paginate} />
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} productDetails={productDetails} />
            <ErrorSnackbar open={snackbarOpen} onClose={handleSnackbarClose} errorMessage={errorMessage} resolution={resolution} />
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" elevation={6} variant="filled" style={{ whiteSpace: 'pre-line' }}>
                    {`Error: ${errorMessage}\nResolution: ${resolution}`}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ProductActions;