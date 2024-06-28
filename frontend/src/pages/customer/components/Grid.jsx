import React from 'react';

const Grid = ({ products, title }) => {
    return (
        <div>
            <h2>{title}</h2>
            <div className="grid-container">
                {products.map((product, index) => (
                    <div key={index} className="grid-item">
                        <img src={product.image} alt={product.name} />
                        <p>{product.name}</p>
                        <p>MRP: {product.mrp}</p>
                        <p>Cost: {product.cost}</p>
                        <p>Discount: {product.discountPercent}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Grid;
