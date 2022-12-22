import React, { useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { DefaultLayout } from './layouts/defaultLayout/DefaultLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import OptionLanguages from './components/OptionLanguages/OptionLanguages';
import { RootState } from './redux/store';
import { getDataRoles } from './redux/Slice/Role';
function App() {
      const dataUser = useSelector((state: RootState) => state.user);
      const dispatch = useDispatch<any>();
      useEffect(() => {
            dispatch(getDataRoles());
      }, []);
      return (
            <div className="App">
                  <Router>
                        {dataUser.isLoggedIn ? (
                              <React.Suspense fallback={<h2>Loading...</h2>}>
                                    <div className="wrapper wrapper-private">
                                          <Routes>
                                                {privateRoutes.map((route, index) => {
                                                      return (
                                                            <Route
                                                                  key={index}
                                                                  path={route.path}
                                                                  element={
                                                                        <DefaultLayout
                                                                              component={<route.component />}
                                                                        ></DefaultLayout>
                                                                  }
                                                            />
                                                      );
                                                })}
                                          </Routes>
                                    </div>
                              </React.Suspense>
                        ) : (
                              <div className="wrapper wrapper-public">
                                    <div
                                          style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                padding: '10px 30px 0px 0px',
                                          }}
                                    >
                                          <OptionLanguages />
                                    </div>
                                    <Routes>
                                          {publicRoutes.map((route, index) => {
                                                const Page = route.component;
                                                return <Route key={index} path={route.path} element={<Page />} />;
                                          })}
                                    </Routes>
                                    {/* <Route path="*" element={<Page404 />} /> */}
                              </div>
                        )}
                        <ToastContainer />
                  </Router>
            </div>
      );
}

export default App;
