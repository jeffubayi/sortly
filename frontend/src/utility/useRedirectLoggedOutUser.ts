import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../services/authService';
import { toast } from 'react-hot-toast';

const useRedirectLoggedOutUser = (path:string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn))

      if(!isLoggedIn) {
        toast.error('Session expired, please log in to continue')
        navigate(path)
        return
      }
    };
    redirectLoggedOutUser()
    
  }, [navigate, path, dispatch])
  
}

export default useRedirectLoggedOutUser;