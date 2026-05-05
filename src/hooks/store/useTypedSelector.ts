// src/hooks/store/useTypedSelector.ts
import { useSelector } from 'react-redux';

import type { RootState } from '@/src/store/store';

export const useTypedSelector = useSelector.withTypes<RootState>();
