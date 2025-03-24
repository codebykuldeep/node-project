import React, { useState } from 'react'
import { FormStateType } from '../types/formTypes';
import { validation } from '../utils/validationMethods';

function useForm(initialState:FormStateType) {
  console.log('initial',initialState);
    const [formState, setFormState] = useState<FormStateType>(initialState)
    
    
    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;
    
        const [msg, status] = validation(name, value);
        setFormState((prev) => ({
          ...prev,
          [name]: {
            message: msg,
            status: status,
            value: value,
          },
        }));
      }
    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.files);
        const name = event.target.name;
        const value = event.target.value;
        if (event.target.files) {
          if (!event.target.files[0].type.includes("image")) {
            setFormState((prev) => ({
              ...prev,
              [name]: {
                message: "Please select a valid image",
                status: true,
                value: value,
              },
            }));
          } else {
            handleFormChange(event);
          }
        } else {
          handleFormChange(event);
        }
      }

    return {formState,setFormState,handleFormChange,handleImage}
}

export default useForm