import { useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const login = async (email, password) => {
      setError(null);
      setIsLoading(true);

      try {
         const response = await projectAuth.signInWithEmailAndPassword(email, password);
         await projectFirestore.collection('users').doc(response.user.uid).update({ online: true })
         dispatch({ type: "LOGIN", payload: response.user });

         setError(null);
         setIsLoading(false);
      } catch (err) {
         console.log(err.message);
         setError(err.message);
         setIsLoading(false);
      }
   }

   return { login, isLoading, error }
}