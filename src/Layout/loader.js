import React from 'react';
import './loader.css';

export default function Loader(props) {
  return (
    <div className='spinner-container'>
      <div className='mt-2 loader-container'>
        <label className='loader-label'>{props.message}</label>
      </div>
      <div id='loader'></div>
    </div>
  );
}
