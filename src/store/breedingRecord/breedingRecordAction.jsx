import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { LOCAL_STORAGE_NAME } from '../../utils/constant';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';

export const breedingRecordApi = createApi({
    reducerPath: 'breedingRecordApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({

        getListBreedingRecord: builder.query({
            query: (params) => ({
                url: API_URL.BREEDING_RECORD,
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

        addBreedingRecord: builder.mutation({
            query: (body) => ({
                url: API_URL.BREEDING_RECORD + "/add",
                method: 'POST',
                data: body,
            }),
        }),


        editBreedingRecord: builder.mutation({
            query: (body) => ({
                url: API_URL.DRUG_USE + "/edit/" + body._id,
                method: 'PUT',
                data: body,
            }),
        }),

        deleteBreedingRecord: builder.mutation({
            query: (id) => ({
                url: API_URL.DRUG_USE + "/delete/" + id,
                method: 'DELETE',
            }),
        }),

        getListSuggestion: builder.query({
            query: (params) => ({
                url: API_URL.BREEDING_RECORD + `/${params.pigId}/suggestions?${params.barnId}`,
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

    }),
});

export const {
    useGetListBreedingRecordQuery,
    useAddBreedingRecordMutation,
    useDeleteBreedingRecordMutation,
    useEditBreedingRecordMutation
} = breedingRecordApi;
