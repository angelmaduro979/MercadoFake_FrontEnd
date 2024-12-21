import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ShowProductByUserId.css';
import { Footer, Loader, LoginNavbar, LogoutNavbar, Error, DeleteButton } from '../../components/components_index';

const ShowProductByUserId = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accesToken = sessionStorage.getItem('accesToken');

    const fetchUserProducts = async () => {
        try {
            const responseHTTP = await fetch('https://mercadofake-backend.onrender.com/api/sales/mostrarProductosVendidosByUserId', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesToken}`,
                },
            });

            const response = await responseHTTP.json();
            console.log('Respuesta del servidor:', response);
            if (!response.ok) {
                setError(response?.message?.error_message || 'Error al obtener los productos');
                return;
            }

            setProducts(response.data); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProducts();
    }, []);

    if (loading) return <div>Cargando tus productos...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-product-list-container">
            {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
            <h1>Mis Productos Vendidos</h1>

            {products.length > 0 ? (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th className='product-image-header'>Imagen</th>
                            <th className='product-name-header'>Nombre</th>
                            <th className='product-description-header'>Descripción</th>
                            <th className='product-price-header'   >Precio</th>
                            <th className='product-category-header'>Categoría</th>
                            <th className='product-quantity-header'>Cantidad Vendida</th>
                            <th className="actions-header">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.images}
                                        alt={product.product_name}
                                        className="table-product-image"
                                    />
                                </td>
                                <td className='product-name-cell'>{product.product_name}</td>
                                <td className='product-description-cell'>{product.description}</td>
                                <td className='product-price-cell'>${product.price}</td>
                                <td className='product-category-cell'>{product.category}</td>
                                <td className='product-quantity-cell'>{product.sales_quantity || 0}</td>
                                <td className="actions-cell">
                                    <Link to={`/Update/${product._id}`} className="btn-edit">
                                        Editar
                                    </Link>
                                    <DeleteButton productId={product._id}>Eliminar</DeleteButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No tienes productos vendidos actualmente.</p>
            )}
            <Footer />
        </div>
    );
};


export default ShowProductByUserId;
