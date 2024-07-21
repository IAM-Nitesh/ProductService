import React, {useEffect, useState} from 'react';

function ProductActions() {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null); // Step 1: State to hold single product details
    const [showTable, setShowTable] = useState(false); // Step 1    : State to show/hide table
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: '', details: '' });

    // Calculate total pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // Get current products
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Render page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
        <li key={number} style={{ display: 'inline', margin: '5px', cursor: 'pointer' }} onClick={() => paginate(number)}>
            {number}
        </li>
    ));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = JSON.parse(formData.details);
        try {
            const response = await fetch(`/products/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            const data = await response.json();
            console.log(data);
            getProductById(formData.id);
            alert('Product replaced');
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            alert(`Failed to replace product: ${error.message}. Please check the console for more information.`);
        }
        setIsModalOpen(false); // Close modal after submission
    };

    // JSX for modal
    const renderModal = () => (
        <div style={{ display: isModalOpen ? 'block' : 'none', position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
            <form onSubmit={handleSubmit}>
                <label>
                    Product ID:
                    <input type="text" name="id" value={formData.id} onChange={handleInputChange} style={{ width: '100%', margin: '10px 0' }} />
                </label>
                <label>
                    Product Details (JSON format):
                    <textarea name="details" value={formData.details} onChange={handleInputChange} style={{ width: '100%', height: '200px', margin: '10px 0' }} />
                </label>
                <button type="submit">Replace Product</button>
            </form>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>

    );

    const getProductById = () => {
        const id = prompt('Enter Product ID:');
        if (!id) return; // Exit if no ID is provided

        console.log(`Fetching product with ID: ${id}`); // Log the ID being fetched

        fetch(`http://localhost:8080/products/${id}`) // Corrected URL with http://
            .then(response => {
                console.log(response); // Log the response object
                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Product data received:', data); // Log the data received
                setProducts([data]); // Update state with the fetched product details
                setShowTable(true); // Show table (if applicable)
                setProductDetails(null); // Clear single product details
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                alert(`Failed to fetch product details: ${error.message}. Please check the console for more information.`);
            });
    };


    const getAllProducts = () => {
        fetch('http://localhost:8080/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setProducts(data);
                setShowTable(true); // Show table after fetching data
                setProductDetails(null); // Clear single product details
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                alert(`Failed to fetch product details: ${error.message}. Please check the console for more information.`);
            });
    };


    // Replace the replaceProduct function with a function that opens the modal

    const replaceProduct = () => {
        setIsModalOpen(true); // This will open the modal for input
        // const id = prompt('Enter Product ID to Replace:');
        // const details = prompt('Enter Product Details (JSON format):');
        // const product = JSON.parse(details);
        // fetch(`/products/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(product),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         getProductById(id)
        //         alert('Product replaced');
        //     });
    };


    const renderProductDetailsTable = () => {
        return (
            <table className="tableWide">
                <thead>
                <tr>
                    <th style={{ width: '10px' }}>ID</th> {/* Adjusted width */}
                    <th>Title</th>
                    <th style={{ width: '100px' }}>Price</th> {/* Adjusted width */}
                    <th style={{ width: '700px' }}>Description</th> {/* Adjusted width */}
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.category ? product.category.description : 'N/A'}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>No products available</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    };

    const buttonStyle = {
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        padding: '10px 20px',
        border: '2px solid black',
        width: '200px', // Ensure consistent width
        height: '50px', // Ensure consistent height
        textAlign: 'center', // Center-align text
        flexDirection: 'column', // Align text and icon vertically
        display: 'flex', // Use flex to center content
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        color: '#000000', // Change font color to black
        backgroundColor: 'transparent', // Match the "Ice Cold" background color
        marginRight: '20px', // Add margin to separate buttons
        gap: '20px', // Add gap between text and icon

    };

    const titleAndButtonsContainerStyle = {
        display: 'flex',
        flexDirection: 'row', // Change to row to align items horizontally
        alignItems: 'center', // Align items to the center vertically
        gap: '20px', // Space between title and buttons
    };

    const containerStyle = {
        backgroundColor: 'transparent',
        padding: '20px',
        display: 'flex',
        flexDirection: 'row', // Changed to row to align items horizontally
        alignItems: 'center',
        width: '100%',
        marginTop: '0px',
        gap: '20px'
    };

    return (
        <div style={{...containerStyle, flexDirection: 'column'}}> {/* Ensure the container uses column layout */}
            <div style={titleAndButtonsContainerStyle}>
                <h2>Product Actions</h2>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row', // Align buttons horizontally
                    alignItems: 'center', // Center-align buttons vertically
                    gap: '20px', // Space between buttons
                }}>
                    <button style={buttonStyle} onClick={getProductById}>Get Product by ID</button>
                    <button style={buttonStyle} onClick={getAllProducts}>Get All Products</button>
                    <button style={buttonStyle} onClick={replaceProduct}>Replace Product</button>
                </div>
            </div>
            <div className="tableContainer" style={{width: '100%'}}>
                {renderProductDetailsTable()}
            </div>
            <ul style={{
                listStyleType: 'none',
                padding: 0,
                marginTop: '20px',
                textAlign: 'center',
                width: '100%',
                display: 'block'
            }}>
                {renderPageNumbers}
            </ul>
            <div style={{...containerStyle, flexDirection: 'column'}}>
                ...
                {renderModal()}
            </div>
        </div>
    );
}

export default ProductActions;