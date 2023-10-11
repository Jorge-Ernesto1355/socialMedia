import React, { useEffect, useState } from "react";

import AuthProvider from "../../zustand/AuthProvider";
import SpinnerLoader from "../../stylesComponents/spinnerLoader/SpinnerLoader";
import { Outlet } from "react-router-dom";

import UseRefreshToken from "../../hooks/auth/UseRefreshToken";

const PersitsLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const Auth = AuthProvider();
  const mutateRefresh = UseRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = () => {
      try {
        const refreshToken = Auth.getRefreshToken();

        mutateRefresh(refreshToken);
      } catch (error) {
        setIsLoading(false);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !Auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`at: ${JSON.stringify(Auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {!Auth.persits ? (
        <Outlet />
      ) : (
        <>{isLoading ? <SpinnerLoader /> : <Outlet />}</>
      )}
    </>
  );
};

export default PersitsLogin;
