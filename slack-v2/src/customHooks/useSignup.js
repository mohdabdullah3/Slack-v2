import { useState } from 'react';
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export default function useSignup() {
   const [abort, setAbort] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const signup = async (email,password,displayName) => {
      setError(null);
      setIsLoading(true);
      try {
         const response = await projectAuth.createUserWithEmailAndPassword(email,password);
         if (!response) {
            throw new Error("Could not sign up please try again!")
         }

         dispatch({ type:'LOGIN', payload: response.user });

         await response.user.updateProfile({ displayName });
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

  return { isLoading , error , signup }
}
