import React from 'react';
import { usePurchases } from '../../hooks/hooks_index.js';
import { LoginNavbar, LogoutNavbar, Div, Loader, Error, FormatDate, Footer } from '../../components/components_index.js';
import { Link } from 'react-router-dom';
import './Purchases.css';

const Purchases = () => {
    const { purchases, loading, error } = usePurchases();

    const accesToken = sessionStorage.getItem('accesToken');

    return (
        <Div className="purchases-container">
            {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
            <Div className="purchases-wrapper">
                <h1>Compras</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Error message={error} />
                ) : purchases.length > 0 ? (
                    <Div className="purchases-list">
                        {purchases.map((purchase) => (
                            <div key={`${purchase._id}-${purchase.date}`} className="purchase-item">
                                <Div className="purchase-date">
                                    <p className="purchase-arrival"><strong>Llegó el {FormatDate(purchase.date)}</strong></p>
                                </Div>
                                <Div className="purchase-details">
                                    <img
                                        src={purchase.image.url}
                                        alt={purchase.name}
                                        className="product-image"
                                    />
                                    <Div className="purchase-info">
                                        <p className="product-description">
                                            {purchase.description}
                                        </p>
                                    </Div>
                                    <Div className="purchase-actions">
                                        <Link to={`/PurchaseDetails/${purchase._id}`} className="btn-primary">
                                            Ver compra
                                        </Link>
                                        <Link className="btn-secondary" to={`/ProductDetails/${purchase._id}`}>
                                            Volver a comprar
                                        </Link>
                                    </Div>
                                </Div>
                            </div>
                        ))}
                    </Div>
                ) : (
                    <Div className="no-purchases">
                        <h2>No se encontraron compras</h2>
                    </Div>
                )}
            </Div>
            <Footer />
        </Div>
    );
};

export default Purchases;