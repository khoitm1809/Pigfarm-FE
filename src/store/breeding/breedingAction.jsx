import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { LOCAL_STORAGE_NAME } from '../../utils/constant';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';

export const breedingApi = createApi({
    reducerPath: 'breedingApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getListBreeding: builder.query({
            query: (params) => ({
                url: API_URL.BREEDING,
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

        getListBarn: builder.query({
            query: (params) => ({
                url: API_URL.BARN,
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

        addBreading: builder.mutation({
            query: (body) => ({
                url: API_URL.BREEDING + "/add",
                method: 'POST',
                data: body,
            }),
        }),

        addBarn: builder.mutation({
            query: (body) => ({
                url: API_URL.BARN + "/add",
                method: 'POST',
                data: body,
            }),
        }),

        editBreading: builder.mutation({
            query: (body) => ({
                url: API_URL.BREEDING + "/edit/" + body._id,
                method: 'PUT',
                data: body,
            }),
        }),

        editBarn: builder.mutation({
            query: (body) => ({
                url: API_URL.BARN + "/edit/" + body._id,
                method: 'PUT',
                data: body,
            }),
        }),

        deleteBreading: builder.mutation({
            query: (_id) => ({
                url: API_URL.BREEDING + "/delete/" + _id,
                method: 'DELETE',
            }),
        }),

        deleteBarn: builder.mutation({
            query: (id) => ({
                url: API_URL.BARN + "/delete/" + id,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetListBreedingQuery,
    useGetListBarnQuery,
    useAddBreadingMutation,
    useAddBarnMutation,
    useEditBreadingMutation,
    useEditBarnMutation,
    useDeleteBarnMutation,
    useDeleteBreadingMutation,
} = breedingApi;
