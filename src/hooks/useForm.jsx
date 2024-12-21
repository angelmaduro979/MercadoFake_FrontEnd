import { useState } from 'react';

const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return { formState, handleChangeInput };
};


export default useForm