import React from 'react';
import { Div, Loader, SuccessMessage, Error } from '../../components/components_index';
import { usePurchase } from '../../Context/PurchaseContext';
import { Link } from 'react-router-dom';
import './SuccessPurchase.css';

const SuccessPurchase = () => {
    const { purchaseError, purchaseLoading, purchaseAmount, purchasedInformation  } = usePurchase();

    return (
        <Div className='success-container-Mainscreen' >
            {
                purchaseLoading ? (
                    <Loader />
                ) : (
                    purchaseError ? (
                        <Div className='error-container-screen'>
                            <Error message={purchaseError} />
                        </Div>
                    ) : (
                        Object.keys(purchasedInformation).length > 0 && (
                            <Div className='success-container-screen'>
                               
                                <h1>¡Compra exitosa!</h1>
                                <SuccessMessage message='Tu compra se ha realizado con éxito.' />

                                
                                <Div className='purchase-summary'>
                                    <h2>Resumen de tu compra</h2>
                                    <Div className='purchase-item'>
                                        <p><strong>Producto:</strong> {purchasedInformation.product_name}</p>
                                        <p><strong>Cantidad:</strong> {purchasedInformation.units_requested} unidades</p>
                                        <p><strong>Precio unitario:</strong> ${purchasedInformation.unit_price}</p>
                                        <p><strong>Total pagado:</strong> ${purchasedInformation.total_price}</p>
                                        <p><strong>Metodo de pago:</strong> {purchasedInformation.paymentMethod}</p>
                                    </Div>
                                </Div>

                               
                                <Link to="/" className='btn-return'>Volver al inicio</Link>
                            </Div>
                        )
                    )
                )
            }
        </Div>
    );
}

export default SuccessPurchase;
