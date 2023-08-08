import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
   const [abort, setAbort] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const logout = async () => {
      setError(null);
      setIsLoading(true);
   try {
      
      await projectAuth.signOut();
      dispatch({ type:"LOGOUT" });
      
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

   return { logout, isLoading, error }
}