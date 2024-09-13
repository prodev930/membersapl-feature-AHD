import React, {useImperativeHandle, useState, useRef} from 'react';
import {Loading} from './Loading';

export const GlobalUI = React.forwardRef((props, ref) => {
  const [isLoading, setLoading] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      showLoading,
      hideLoading,
    }),
    [],
  );

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };
  return (
    <>
      <Loading isLoading={isLoading} />
    </>
  );
});

export default GlobalUI;
