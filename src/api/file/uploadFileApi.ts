import { IFile } from '@/src/types/file.interface';

import { api } from '../api';

export const fileApi = api.injectEndpoints({
  endpoints: (build) => ({
    addFile: build.mutation<IFile[], FormData>({
      query: (body) => ({
        url: `/files`,
        method: 'POST',
        body,
      }),
    }),
    delFile: build.mutation<boolean, string>({
      query: (fileName) => ({
        url: `/files/${fileName}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useAddFileMutation, useDelFileMutation } = fileApi;
