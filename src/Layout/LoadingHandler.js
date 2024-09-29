// LoadingHandler.js
import React, { useContext } from 'react';
import { LoadingContext } from '../LoadingContext';
import Loader from './loader.js';

const LoadingHandler = () => {
  const { isLoading, loaderMessage } = useContext(LoadingContext);

  return isLoading ? <Loader message={loaderMessage} /> : null;
};

export default LoadingHandler;