import React from 'react';

function Pagination({ totalPages, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination" style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item" style={{ margin: '0 5px' }}>
                        <a onClick={() => paginate(number)} href="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;