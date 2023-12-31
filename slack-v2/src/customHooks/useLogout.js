import { useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch, user } = useAuthContext();

   const logout = async () => {
      setError(null);
      setIsLoading(true);
   try {
      await projectFirestore.collection('users').doc(user.uid).update({ online: false })

      await projectAuth.signOut();
      dispatch({ type:"LOGOUT" });
      
         setError(null);
         setIsLoading(false);
   } catch (err) { 
         console.log(err.message);
         setError(err.message);
         setIsLoading(false);
   }
   }

   return { logout, isLoading, error }
}