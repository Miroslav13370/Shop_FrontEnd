import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { rootActions } from '@/src/store/card/root-actions';

import { useAppDispatch } from './dispath';

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
