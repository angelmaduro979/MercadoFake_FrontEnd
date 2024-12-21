const fetchFunctionGet = async (linkBackEnd) => {
    try {
        const responseHTTP = await fetch(linkBackEnd, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!responseHTTP.ok) {
            throw new Error(`Error en la solicitud GET: ${responseHTTP.statusText} (${responseHTTP.status})`);
        }
        return await responseHTTP.json();
    } catch (error) {
        console.error('Error en fetchFunctionGet:', error.message);
        throw error;
    }
};


const fetchFunctionPost = async (linkBackEnd, bodyValue) => {
    try {

        const responseHTTP = await fetch(linkBackEnd, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyValue),
        });


        if (!responseHTTP.ok) {
            throw new Error(`Error en la solicitud POST: ${responseHTTP.statusText} (${responseHTTP.status})`);
        }
        const dataHTTP = await responseHTTP.json();
        return dataHTTP;
    } catch (error) {

        console.error('Error en fetchFunctionPost:', error.message);
        throw error;
    }
};

export { fetchFunctionGet, fetchFunctionPost };
