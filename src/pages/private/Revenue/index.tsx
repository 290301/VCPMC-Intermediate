import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Revenue = () => {
      const navigate = useNavigate();
      const location = useLocation();
      useEffect(() => {
            navigate(location.state?.navigateTo);
      }, []);

      return <></>;
};

export default Revenue;
