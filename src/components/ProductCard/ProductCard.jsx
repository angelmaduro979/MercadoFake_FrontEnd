import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {

  const truncatedTitle =
    product?.product_name?.length > 15
      ? `${product.product_name.slice(0, 15)}...`
      : product?.product_name || 'Sin título';

  const truncatedDescription =
    product?.description?.length > 40
      ? `${product.description.slice(0, 30)}...`
      : product?.description || 'Sin descripción';

  return (
    <div className="product-card" id='product-card'>
      <h1 className="product-name" id='product-name'>{truncatedTitle || 'Producto sin nombre'}</h1>
      <img
        src={product?.images?.[0]?.url || '/placeholder-image.jpg'}
        alt={product?.product_name || 'Producto'}
        className="product-image"
        id='product-image'
      />
      <h2 className="product-price" id='product-price'>${product?.price || 'Precio no disponible'}</h2>
      <span className='product-description-container' ><p className="product-description" id='product-description'>{truncatedDescription}</p></span>
      <Link to={`/ProductDetails/${product._id}`} className="product-details-link" id='product-details-link'>
        Ver detalles
      </Link>
    </div>
  );
};

export default ProductCard;
