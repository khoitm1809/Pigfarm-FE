import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { LOCAL_STORAGE_NAME } from '../../utils/constant';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';

export const barnHealthApi = createApi({
    reducerPath: 'barnHealthApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        // Get List Barn Health
        getListBarnHealth: builder.query({
            query: (params) => ({
                url: API_URL.BARN_HEALTH,
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

        addBarnHealth: builder.mutation({
            query: (body) => ({
                url: API_URL.BARN_HEALTH + "/create",
                method: 'POST',
                data: body,
            }),
        }),


        editBarnHealth: builder.mutation({
            query: (body) => ({
                url: API_URL.BARN_HEALTH + "/edit/" + body._id,
                method: 'PUT',
                data: body,
            }),
        }),

        deleteBarnHealth: builder.mutation({
            query: (id) => ({
                url: API_URL.BARN_HEALTH + "/delete/" + id,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetListBarnHealthQuery,
    useAddBarnHealthMutation,
    useDeleteBarnHealthMutation,
    useEditBarnHealthMutation
} = barnHealthApi;
