import React, { useState } from 'react';
import { projectAuth } from '../firebase/config'

export default function useSignup() {

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const signup = async (email,password,displayName) => {
      setError(null);
      setIsLoading(true);
      try {
         const response = await projectAuth.createUserWithEmailAndPassword(email,password);
         console.log(response.user);
         if (!response) {
            throw new Error("Could not sign up please try again!")
         }
         await response.user.updateProfile({ displayName });
         setError(null);
         setIsLoading(false);
      } catch (err) {
         console.log(err.message);
         setError(err.message);
         setIsLoading(false);
      }
   }

  return { isLoading , error , signup }
}
