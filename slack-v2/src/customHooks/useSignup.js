import { useState } from 'react';
import { projectAuth, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export default function useSignup() {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const signup = async (email, password, displayName, profilePhoto) => {
      setError(null);
      setIsLoading(true);
      try {
         const response = await projectAuth.createUserWithEmailAndPassword(email, password);
         if (!response) {
            throw new Error("Could not sign up please try again!")
         }
         const uploadPath = `Profile-Photos/${response.user.uid}/${profilePhoto.name}`;
         const image = await projectStorage.ref(uploadPath).put(profilePhoto);
         const imageURL = await image.ref.getDownloadURL();

         await response.user.updateProfile({ displayName, photoURL: imageURL });
         dispatch({ type: 'LOGIN', payload: response.user });

         setError(null);
         setIsLoading(false);
      } catch (err) {
         setError(err.message);
         setIsLoading(false);
      }
   }

   return { isLoading, error, signup }
}
