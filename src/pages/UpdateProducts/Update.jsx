import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Update.css';
import { Footer, Loader, LoginNavbar, LogoutNavbar, Error, DeleteButton } from '../../components/components_index';

const Update = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const [Update, setUpdate] = useState({
        product_name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        image: null,
    });
    const { productId } = useParams();
    console.log('Product ID:',productId);
    const accesToken = sessionStorage.getItem('accesToken');

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

    const fetchUpdate = async () => {
        setLoading(true);
        setError([]);
        try {
            const responseHTTP = await fetch(`https://mercadofake-backend.onrender.com/api/products/mostrarProductosById/${productId}`, {
                method: 'GET',  
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesToken}`,
                },
            });

            const response = await responseHTTP.json();
            console.log(response);

            if (!response.ok) {
                setError([response?.message?.error_message || 'Error al obtener los productos']);
                return;
            }

            setUpdate(response.data); 
            setError([]);
        } catch (error) {
            setError([error.message]);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchUpdate(); 
    }, []);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdate(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setUpdate(prevState => ({
            ...prevState,
            [name]: files[0],  
        }));
    };

    
    const postProducts = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError([]);
        const formData = new FormData();
        
        
        formData.append("product_name", Update.product_name);
        formData.append("price", Update.price);
        formData.append("description", Update.description);
        formData.append("stock", Update.stock);
        formData.append("category", Update.category);
        formData.append("image", Update.image);

        try {
            const responseHTTP = await fetch(`https://mercadofake-backend.onrender.com/api/products/updateProductosByUserId/${productId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accesToken}`,
                },
                body: formData, 
            });

            const response = await responseHTTP.json();
            console.log(response);

            if (!response.ok) {
                setError([response?.message?.error_message || 'Error al actualizar el producto']);
                return;
            }

            
            setError([]);
        } catch (error) {
            setError([error.message]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addProducts-container">
            {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <h1>Loading...</h1>
                </div>
            ) : error.length > 0 ? (
                <div className="error-container-add">
                    <ul className="error-list">
                        {error.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="addProducts-container-inner">
                    
                    <form encType="multipart/form-data" onSubmit={postProducts} className="form-container">
                        <div className="addProducts">
                            <input
                                type="text"
                                name="product_name"
                                placeholder="Name"
                                onChange={handleChange}
                                value={Update.product_name || ''}  
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                onChange={handleChange}
                                value={Update.price || ''}  
                            />
                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                onChange={handleChange}
                                value={Update.stock || ''}  
                            />
                            <select
                                name="category"
                                value={Update.category || ''}  
                                className="category"
                                onChange={handleChange}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                value={Update.description || ''}  
                            />
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                
                            />
                            <button type="submit">Update Product</button>
                        </div>
                    </form>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Update;
