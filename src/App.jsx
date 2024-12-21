import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {  Home, ProductDetails,  Login, Register, Search, PasswordRecovery, AddProducts, Newpassword, CategoryPage, SuccessPurchase, Purchases, PurchaseDetails, ShowProductByUserId, Update } from './pages/pages_index.js'
import { ProtectedRoute } from './components/components_index.js';
import { SearchProvider } from "./Context/SearchContext.jsx"
import { PurchaseProvider } from './Context/PurchaseContext.jsx';

const App = () => {

  return (
    <div>
      <SearchProvider>
        <PurchaseProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />

            <Route path='/ProductDetails/:id' element={<ProductDetails />} />


            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/SuccessPurchase/:id' element={<SuccessPurchase />} />
              <Route path='/AddProducts' element={<AddProducts />} />          
              <Route path='/purchases' element={<Purchases />} />
              <Route path='/purchaseDetails/:id' element={<PurchaseDetails />} />
              <Route path='/ShowProductByUserId' element={<ShowProductByUserId />} />
              <Route path='/Update/:productId' element={<Update />} />
            </Route>
            <Route path='/Newpassword/:reset_token' element={<Newpassword />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/PasswordRecovery' element={<PasswordRecovery />} />

            <Route path='/Search' element={<Search />} />

          </Routes>
        </PurchaseProvider>
      </SearchProvider>
    </div>
  )
}

export default App
