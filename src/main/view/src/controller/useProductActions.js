import { useState } from 'react';

function useProductActions() {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [resolution, setResolution] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const showErrorSnackbar = (errorData) => {
        const errorMsg = errorData.errorMessage || errorData.errormessage || 'Unknown error';
        const resolutionMsg = errorData.resolution || 'No resolution provided';
        setErrorMessage(errorMsg);
        setResolution(resolutionMsg);
        setSnackbarOpen(true);
    };

    const getProductById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${id}`);
            if (!response.ok) {
                const errorData = await response.json();
                showErrorSnackbar(errorData);
                throw new Error(JSON.stringify(errorData));
            }
            const data = await response.json();
            setProducts([data]);
            return data;
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const getAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            if (!response.ok) {
                const errorData = await response.json();
                showErrorSnackbar(errorData);
                throw new Error(JSON.stringify(errorData));
            }
            const data = await response.json();
            setProducts(data);
            return data;
        } catch (error) {
            let message = 'Failed to fetch products';
            if (error instanceof Error) {
                message = error.message;
            }
            showErrorSnackbar({ errorMessage: message, resolution: 'Please check if the backend service is running and accessible.' });
        }
    };

    const replaceProduct = async (id, productDetails) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productDetails),
            });
            if (!response.ok) {
                const errorData = await response.json();
                showErrorSnackbar(errorData);
                throw new Error(JSON.stringify(errorData));
            }
            const data = await response.json();
            console.log('Product replaced:', data);
            getProductById(id);
            return data;
        } catch (error) {
            console.error('Error replacing product:', error);
        }
    };

    return { products, productDetails, getProductById, getAllProducts, replaceProduct, errorMessage, resolution, snackbarOpen, setSnackbarOpen, setProductDetails };
}

export default useProductActions;