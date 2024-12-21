import React, { useContext } from 'react';
import { Div, Button, Footer, Input, Form, Textarea, LogoutButton, LogoutNavbar, LoginNavbar } from '../../components/components_index.js';
import useAddProduct from '../../hooks/useAddProduct.jsx';
import './addProducts.css';


const AddProducts = () => {
    const { handleChange, loading, dataError, postProducts, data, handleFileChange } = useAddProduct();
    const categories = [
        "",
        "Electrónica, Audio y Video",
        "Hogar, Muebles y Jardín",
        "Ropa, Zapatos y Accesorios",
        "Deportes y Fitness",
        "Bebés",
        "Salud y Belleza",
        "Juguetes y Hobbies",
        "Automóviles, Motos y Otros Vehículos",
        "Libros, Revistas y Comics",
        "Alimentos y Bebidas",
        "Servicios",
        "Inmuebles",
        "Mascotas",
        "Industria y Oficinas",
        "Arte y Antigüedades"
    ];
    const accesToken = sessionStorage.getItem('accesToken');

    return (
        <div className="addProducts-container">
            {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
            {loading ? (
                <Div className="loader-container">
                    <Div className="loader"></Div>
                    <h1>Loading...</h1>
                </Div>
            ) : dataError.length > 0 ? (
                <Div className="error-container-add">
                    <ul className="error-list">
                        {dataError.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </Div>
            ) : (
                <Div className="addProducts-container-inner">
                    <LogoutButton />
                    <Form encType="multipart/form-data" onSubmit={postProducts} className="form-container">
                        <Div className="addProducts">
                            <Input
                                type="text"
                                name="product_name"
                                placeholder="Name"
                                onChange={handleChange}
                                value={data.product_name}
                            />
                            <Input
                                type="currency"
                                name="price"
                                placeholder="Price"
                                onChange={handleChange}
                                value={data.price}
                            />
                            <Input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                onChange={handleChange}
                                value={data.stock}
                            />
                            <select
                                name="category"
                                id="category"
                                value={data.category}
                                className="category"
                                onChange={handleChange}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <Textarea
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                value={data.description}
                            />
                            <Input
                                type="file"
                                name="image"
                                accept="image/*"
                                required
                                onChange={handleFileChange}
                            />
                            <Button text="Add Product" type="submit" />
                        </Div>
                    </Form>
                </Div>
            )}
            <Footer />
        </div>
    );
};

export default AddProducts;
