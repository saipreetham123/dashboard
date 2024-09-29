import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState('');
  
    const onLoaderRaise = (flag, msg) => {
      setIsLoading(flag);
      setLoaderMessage(msg || 'Loading...');
    };
  
    return (
      <LoadingContext.Provider
        value={{ isLoading, loaderMessage, onLoaderRaise }}
      >
        {children}
      </LoadingContext.Provider>
    );
  };