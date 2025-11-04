import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { LOCAL_STORAGE_NAME } from '../../utils/constant';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';

export const foodRationApi = createApi({
    reducerPath: 'foodRationApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({

        getListFoodRation: builder.query({
            query: (params) => ({
                url: API_URL.FOOD_RATION,
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

        addFoodRation: builder.mutation({
            query: (body) => ({
                url: API_URL.FOOD_RATION + "/add",
                method: 'POST',
                data: body,
            }),
        }),


        editFoodRation: builder.mutation({
            query: (body) => ({
                url: API_URL.FOOD_RATION + "/edit/" + body._id,
                method: 'PUT',
                data: body,
            }),
        }),

        deleteFoodRation: builder.mutation({
            query: (id) => ({
                url: API_URL.FOOD_RATION + "/delete/" + id,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetListFoodRationQuery,
    useAddFoodRationMutation,
    useDeleteFoodRationMutation,
    useEditFoodRationMutation
} = foodRationApi;
