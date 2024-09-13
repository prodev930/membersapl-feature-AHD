import * as React from 'react';

const globalUIRef = React.createRef<any>();

function showLoading() {
  globalUIRef.current?.showLoading();
}

function hideLoading() {
  globalUIRef.current?.hideLoading();
}

export const GlobalService = {
  showLoading,
  hideLoading,
  globalUIRef,
};
