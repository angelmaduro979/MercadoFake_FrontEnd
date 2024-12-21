import React, { useState } from 'react';
import './ProductDetails.css';
import { useProductDetail } from '../../hooks/hooks_index.js';
import { Div, Loader, Error, LogoutNavbar, LoginNavbar, Footer, SuccessMessage } from '../../components/components_index.js';
import { usePurchase } from '../../Context/PurchaseContext'
import { useNavigate, useParams } from 'react-router-dom';


const ProductDetails = () => {
  const { id } = useParams();
  const { productDetailState, productDetailLoadingState, productDetailErrorState } = useProductDetail(id);
  const { setPurchaseError, purchaseLoading, setPurchaseloading, purchasedInformation, setPurchasedInformation, purchaseAmount, setPurchaseAmount, purchaseError } = usePurchase()

  const navigate = useNavigate();
  console.log("Product ID:", id)

  const accesToken = sessionStorage.getItem('accesToken');
  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;

    // Actualiza únicamente el método de pago
    setPurchaseAmount(prevPurchase => ({
      ...prevPurchase,
      payment_method: value,
    }));
  };
  const handleQuantityChange = (e) => {
    const { value } = e.target;

    setPurchaseAmount(prevPurchase => ({
      ...prevPurchase,
      units_requested: value
    }));


  };
  const purchaseFlow = async () => {
    setPurchaseloading(true);
    setPurchaseAmount(prevPurchase => ({ ...prevPurchase, payment_status: 'pending' }));
    setPurchaseError(null);

    try {

      if (accesToken) {
        const fetchPurchaseResponse = await fetch(`https://mercadofake-backend.onrender.com/api/purchases/createPurchase/${id}`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesToken}`
          },
          body: JSON.stringify({ purchaseAmount: purchaseAmount }) // Enviamos el estado actualizado
        });

        const fetchJsonResponse = await fetchPurchaseResponse.json();
        console.log(fetchJsonResponse);

        if (!fetchJsonResponse.ok) {
          setPurchaseError(fetchJsonResponse?.message?.error_message || 'Error inesperado en el fetchJson');
          setPurchaseloading(false);
          setPurchaseAmount(prevPurchase => ({ ...prevPurchase, payment_status: 'cancelled' }));
        } else {

          setPurchaseAmount(prevPurchaseAmount => ({ ...prevPurchaseAmount, units_requested: purchasedInformation.units_requested, payment_status: 'completed', payment_method: purchasedInformation.paymentMethod })); // Asegura que el estado se mantenga
          setPurchasedInformation(prevData => ({
            ...prevData,
            product_name: fetchJsonResponse.data.productoComprado.product_name,
            units_requested: fetchJsonResponse.data.nuevaCompra.productsPurchased[0].quantity,
            unit_price: fetchJsonResponse.data.productoComprado.price,
            total_price: fetchJsonResponse.data.nuevaCompra.totalAmount,
            paymentMethod: fetchJsonResponse.data.nuevaCompra.paymentMethod,
            payment_status: fetchJsonResponse.data.nuevaCompra.paymentStatus
          }));
          setPurchaseloading(false);
          setPurchaseError(null);

          navigate(`/SuccessPurchase/${id}`)
        }

      } else {
        alert('Debes iniciar sesion para poder comprar');
        navigate('/login')

      }
    } catch (error) {
      setPurchaseError(error.message || 'Error inesperado en la función purchaseFlow');
      setPurchaseloading(false);
      setPurchaseAmount(prevPurchase => ({ ...prevPurchase, payment_status: 'cancelled' }));

    }
  };



  return (
    <Div className="product-details-page">
      {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
      <Div className="product-details-container-outer">
        <Div className="product-details-container">
          {productDetailLoadingState ? (
            <Loader />
          ) : productDetailErrorState ? (
            <Error message={productDetailErrorState} />
          ) : (
            productDetailState.map((product) => (
              <Div key={product._id} className="product-details">
                <Div className="product-upper-container">
                  <Div className="product-images">
                    <img src={product.images[0].url} alt={product.product_name} className="main-image" />
                    <Div className="thumbnail-gallery">
                      {product.images.map((image, index) => (
                        <img key={index} src={image.url} alt={`Thumbnail ${index}`} className="thumbnail" />
                      ))}
                    </Div>
                  </Div>

                 
                  <Div className="product-info">
                    <h1 className="product-title">{product.product_name}</h1>
                    <p className="product-price">$ {product.price}</p>
                    <p className="product-category">Categoría: {product.category}</p>
                  </Div>
                 
                  <Div className="buy-container">
                    <span className="delivery-info">Entrega a acordar con el vendedor</span>
                    <span className="delivery-location">Ituzaingó, Buenos Aires</span>
                    <select onChange={handleQuantityChange} value={purchaseAmount.units_requested} className="quantity-selector">
                      <option value="1">1 unidad</option>
                      <option value="2">2 unidades</option>
                      <option value="3">3 unidades</option>
                      <option value="4">4 unidades</option>
                      <option value="5">5 unidades</option>
                      <option value="6">6 unidades</option>
                      <option value="7">Más de 6 unidades</option>
                    </select>
                    <p className="product-stock">Stock disponible: {product.stock}</p>
                    <Div className="radio-container">
                      
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment-method"
                        value="credit-card"
                        checked={purchaseAmount.payment_method === 'credit-card'}
                        onChange={handlePaymentMethodChange}
                        className="custom-radio"
                      />
                      <label htmlFor="credit-card" className="custom-radio-label">
                        <span className="radio-circle"></span>
                        Tarjeta de Crédito
                      </label>

                     
                      <input
                        type="radio"
                        id="debit-card"
                        name="payment-method"
                        value="debit-card"
                        checked={purchaseAmount.payment_method === 'debit-card'}
                        onChange={handlePaymentMethodChange}
                        className="custom-radio"
                      />
                      <label htmlFor="debit-card" className="custom-radio-label">
                        <span className="radio-circle"></span>
                        Tarjeta de Débito
                      </label>
                    </Div>


                    <button className="buy-button" onClick={() => purchaseFlow(product._id)}>
                      {purchaseLoading ? 'Procesando...' : 'Comprar ahora'}
                    </button>
                    {purchaseError && <Error message={purchaseError} />}
                  </Div>

                </Div>


                <Div className="product-description-container">
                
                  <Div className="product-description">
                    <h2>Descripción del producto</h2>
                    <p>{product.description}</p>
                  </Div>
                </Div>
              </Div>
            ))
          )}
        </Div>
      </Div>
      <Footer />
    </Div>
  );
};

export default ProductDetails;
