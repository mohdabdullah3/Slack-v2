import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
   const [abort, setAbort] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const login = async (email, password) => {
      setError(null);
      setIsLoading(true);
      
      try {
         const response = await projectAuth.signInWithEmailAndPassword(email, password);
         dispatch({ type: "LOGIN", payload: response.user });

         if (!abort) {
            setError(null);
            setIsLoading(false);
         }
      } catch (err) {
         if (!abort) {
            console.log(err.message);
            setError(err.message);
            setIsLoading(false);
         }
      }
   }

   useEffect(() => {
      return () => setAbort(true);
   }, [])

   return { login, isLoading, error }
}