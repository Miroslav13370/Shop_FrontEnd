import { SERVER_URL } from '@/src/config/api.config';

export const returnImagesUrl = (value: string): string => {
  try {
    new URL(value);
    return value;
  } catch {
    return `${SERVER_URL}${value}`;
  }
};
