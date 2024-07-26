import React from 'react';

function Pagination({ totalPages, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', padding: 0 }}>
                {pageNumbers.map(number => (
                    <li key={number} style={{ margin: '0 10px', cursor: 'pointer' }}>
                        <a onClick={() => paginate(number)} style={{ textDecoration: 'none', color: 'blue' }}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;