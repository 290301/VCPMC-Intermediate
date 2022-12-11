import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Administer = () => {
      const navigate = useNavigate();
      const location = useLocation();
      useEffect(() => {
            navigate(location.state?.navigateTo);
      },[]);

      return <>Administer</>;
};

export default Administer;
