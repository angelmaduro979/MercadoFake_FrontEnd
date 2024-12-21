import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PurchaseContext = createContext();

const PurchaseProvider = ({ children }) => {
    const [purchaseError, setPurchaseError] = useState(null);
    const [purchaseLoading, setPurchaseloading] = useState(false);
    const [purchaseAmount, setPurchaseAmount] = useState({
        payment_method:'',
        payment_status: 'pending',
        units_requested: 1,
        
    });
    const [purchasedInformation, setPurchasedInformation] = useState({
        product_name:'',
        units_requested: 1,
        unit_price: 0,
        total_price: 0,
        paymentMethod: '',
        payment_status:'pending'
    });


    return (
        <PurchaseContext.Provider value={
            {
                purchaseError,
                setPurchaseError,
                purchaseLoading,
                setPurchaseloading,
                purchaseAmount,
                setPurchaseAmount,
                purchasedInformation,
                setPurchasedInformation
            }
        }>
            {children}
        </PurchaseContext.Provider>
    )

}

const usePurchase = () => useContext(PurchaseContext);

export { usePurchase, PurchaseProvider }