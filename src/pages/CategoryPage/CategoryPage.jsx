import React from 'react';
import useCategoryPage from '../../hooks/useCategoryPage';
import './CategoryPage.css';
import { Div, ProductCard, Loader, Error, LogoutNavbar, LoginNavbar, Footer } from '../../components/components_index.js';

const CategoryPage = () => {
    const { decodedCategory, products, loading, error } = useCategoryPage();
    const accesToken = sessionStorage.getItem('accesToken');

    return (
        <Div className='category-page'>
            {!accesToken ? <LogoutNavbar id='logout-navbar'/> : <LoginNavbar id='login-navbar'/>}
            {loading
                ? <Loader />
                : (error
                    ? <Error message={error} />
                    : (products.length > 0
                        ? (
                            <Div className='products-lists'>
                                <h1 className='category-title'>{decodedCategory}</h1>
                                <Div className='product-grid'>
                                    {products.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </Div>
                            </Div>
                        )
                        : (
                            <Div className='no-products'>
                                <h1 className='category-title'>{decodedCategory}</h1>
                                <p className='no-products-message'>No se encontraron productos</p>
                            </Div>
                        )
                    )
                )
            }
            <Footer />
        </Div>
    );
}

export default CategoryPage;
