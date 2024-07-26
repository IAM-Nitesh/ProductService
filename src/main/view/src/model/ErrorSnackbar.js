import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Custom Alert component for easier Snackbar usage with MUI
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ErrorSnackbar({ open, onClose, errorMessage, resolution }) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="error">
                {`Error: ${errorMessage} Resolution: ${resolution}`}
            </Alert>
        </Snackbar>
    );
}

export default ErrorSnackbar;