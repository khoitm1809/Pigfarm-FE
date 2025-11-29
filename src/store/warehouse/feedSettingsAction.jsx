import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { LOCAL_STORAGE_NAME } from '../../utils/constant';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';

export const feedSettingApi = createApi({
    reducerPath: 'feedSettingApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getListFeedSetting: builder.query({
            query: (params) => ({
                url: API_URL.WAREHOUSE_CATEGORY + "?populate=*",
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

        addFeedSetting: builder.mutation({
            query: (body) => ({
                url: API_URL.WAREHOUSE_CATEGORY,
                method: 'POST',
                data: { data: body },
            }),
        }),

        editFeedSetting: builder.mutation({
            query: (body) => ({
                url: API_URL.WAREHOUSE_CATEGORY + "/" + body.id,
                method: 'PUT',
                data: body,
            }),
        }),

        deleteFeedSetting: builder.mutation({
            query: (id) => ({
                url: API_URL.WAREHOUSE_CATEGORY + "/" + id,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetListFeedSettingQuery,
    useAddFeedSettingMutation,
    useDeleteFeedSettingMutation,
    useEditFeedSettingMutation
} = feedSettingApi;
