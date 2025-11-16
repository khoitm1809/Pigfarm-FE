import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { LOCAL_STORAGE_NAME } from '../../utils/constant';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';

export const drugUseApi = createApi({
    reducerPath: 'drugUseApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({

        getListDrugUse: builder.query({
            query: (params) => ({
                url: API_URL.DRUG_USE,
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

        addDrugUse: builder.mutation({
            query: (body) => ({
                url: API_URL.DRUG_USE + "/add",
                method: 'POST',
                data: body,
            }),
        }),


        editDrugUse: builder.mutation({
            query: (body) => ({
                url: API_URL.DRUG_USE + "/edit/" + body._id,
                method: 'PUT',
                data: body,
            }),
        }),

        deleteDrugUse: builder.mutation({
            query: (id) => ({
                url: API_URL.DRUG_USE + "/delete/" + id,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetListDrugUseQuery,
    useAddDrugUseMutation,
    useDeleteDrugUseMutation,
    useEditDrugUseMutation
} = drugUseApi;
