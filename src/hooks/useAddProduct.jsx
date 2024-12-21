import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

const useAddProduct = () => {
    const [data, setData] = useState({
        product_name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [dataError, setDataError] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file=e.target.files[0];
        console.log("Archivo seleccionado:",file)
        console.log("Tipo MIME de la imagen:", file.type)


        setData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const navigate=useNavigate();

    const postProducts = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Datos antes de enviar:", data)
    
        for (let field in data) {
            if (!data[field]) {
                setDataError(["Todos los campos son obligatorios. el campo " + field + " es requerido."]);
                setLoading(false);
                return;
            }
        }


        const formData = new FormData();
        formData.append("product_name", data.product_name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append('stock', data.stock);
        formData.append('category', data.category);
        

        if (data.image) {
            console.log("Archivo seleccionado:", data.image); 
            formData.append("image", data.image);
        } else {
            console.error("No se seleccionó ningún archivo.");
            return; 
        }

        try {
            const token = sessionStorage.getItem('accesToken');
            console.log("FormData contenido:", formData.entries())
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            const response = await fetch('https://mercadofake-backend.onrender.com/api/products/addProduct', {
                method: "POST", 
                body: formData, 
                credentials: "include", 
                headers: {
                    "Authorization": `Bearer ${token}`,

                }
            });

            
            if (!response) {
                const errorMessage = "Error de conexión con el servidor.";
                setDataError((prev) => [...prev, errorMessage]);
                setLoading(false);
                return;
            }

            const responseData = await response.json();
            console.log("Respuesta del servidor:", responseData);
            
            if (!responseData.ok) {
                setDataError((prev) => [...prev, responseData.message.error_message || "Error desconocido del servidor."]);
            } else {
                console.log("Producto agregado con éxito:", responseData);
                navigate('/home')
                setDataError([]); 
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setDataError((prev) => [...prev, "Error de conexión con el servidor."]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setDataError([]); 

    }, [data]);



    return {
        handleChange,
        loading,
        dataError,
        postProducts,
        data,
        handleFileChange
    };
};

export default useAddProduct;
