import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    LoginNavbar,
    Div,
    LogoutNavbar,
    Loader,
    Error,
    FormatDate,
    Footer
} from '../../components/components_index.js';
import './PurchaseDetail.css';

const PurchaseDetails = () => {
    const [purchaseDetail, setPurchaseDetail] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [errorDetails, setErrorDetails] = useState(null);
    const { id } = useParams();
    const accesToken = sessionStorage.getItem('accesToken');

    
    const getDetailsPurchase = async () => {
        setErrorDetails(null);
        setLoadingDetails(true);

        try {
            const responseHTTP = await fetch(
                `https://mercadofake-backend.onrender.com/api/purchases/mostrarPurchaseDetails/${id}`,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accesToken}`
                    }
                }
            );
            const response = await responseHTTP.json();

            if (!response.ok) {
                setErrorDetails("Error en la respuesta del servidor");
            }


            console.log("Respuesta recibida:", response);

            if (response.data && Array.isArray(response.data.product)) {
                setPurchaseDetail(response.data.product);
            } else {
                setErrorDetails("La estructura de la respuesta no es válida.");
            }
        } catch (error) {
            setErrorDetails(error.message);
        } finally {
            setLoadingDetails(false);
        }
    };

 
    useEffect(() => {
        setPurchaseDetail([]);
        getDetailsPurchase();
    }, [id]);

    return (
        <Div className="purchase-details-container">
           
            {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}

          
            <Div className="purchase-details-content">
            <Div className="purchase-details-card">
                <h1 className="details-title">Detalles de la compra</h1>

             
                {loadingDetails ? (
                    <Loader />
                ) : errorDetails ? (
                    <Error message={errorDetails} />
                ) : purchaseDetail.length > 0 ? (
                    purchaseDetail.map((product) => (

                        <Div key={`${product.id}-${product.date}`} className="product-info">
                            
                            <img
                                src={product.image || "https://via.placeholder.com/150"}
                                alt={product.name || "Nombre del producto"}
                                className="product-image"
                            />

                           
                            <Div className="product-details">
                                <h2 className="product-name">{product.name}</h2>
                                <p className="product-descriptions">
                                    {product.description || "Sin descripción disponible"}
                                </p>
                                <p className="product-status">
                                    Estado: <strong>Entregado</strong>
                                </p>
                                <p className="product-date">
                                    Fecha de compra:{" "}
                                    
                                    <strong>{FormatDate(product.date)} </strong>
                                   
                                </p>
                            </Div>
                            <Div className="purchase-actions">
                                <Link className="btn-primary" to={`/ProductDetails/${product._id}`}>
                                    Volver a comprar
                                </Link>
                                <Link to="/" className="btn-secondary">
                                    Ver más productos
                                </Link>
                            </Div>
                        </Div>

                    ))
                ) : (
                    <p>No hay detalles de la compra disponibles.</p>
                )}

               

            </Div>
            </Div>

            
            <Footer />
        </Div>
    );
};

export default PurchaseDetails;
