import react, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../services/authService';
import { toast } from 'react-hot-toast';

const useRedirectLoggedOutUser = (path:string) => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn))

      if(!isLoggedIn) {
        toast.error('Session expired, please log in to continue')
        navigate.push(path)
        return
      }
    };
    redirectLoggedOutUser()
    
  }, [navigate, path, dispatch])
  
}

export default useRedirectLoggedOutUser;