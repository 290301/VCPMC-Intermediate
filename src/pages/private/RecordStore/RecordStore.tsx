import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomizeButton from '../../../components/CustomizeButton/CustomizeButton';
import { Logout } from '../../../redux/Slice/User';
import { RootState } from '../../../redux/store';
import { routesConfig } from '../../../routes/routeConfig';

const RecordStore = () => {
      const dispatch = useDispatch<any>();
      const dataUser = useSelector((state: RootState) => state.user);
      const navigate = useNavigate();
      const handleLogout = async () => {
            await dispatch(Logout());
            navigate(routesConfig.login);
      };
      return <CustomizeButton title="Đăng xuất" type="button" typeUI="primary" onClick={handleLogout} />;
};

export default RecordStore;
