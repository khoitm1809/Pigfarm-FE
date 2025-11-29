import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { LOCAL_STORAGE_NAME } from '../../utils/constant';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';

export const warehouseApi = createApi({
    reducerPath: 'warehouseApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getListWarehouseCategory: builder.query({
            query: (params) => ({
                url: API_URL.WAREHOUSE_CATEGORY + "?populate=*",
                method: 'GET',
                params: {
                    ...params,
                },
            }),
        }),

        addWarehouseCategory: builder.mutation({
            query: (body) => ({
                url: API_URL.WAREHOUSE_CATEGORY,
                method: 'POST',
                data: { data: body },
            }),
        }),

        editWarehouseCategory: builder.mutation({
            query: ({ id, ...data }) => ({
                url: API_URL.WAREHOUSE_CATEGORY + "/" + id,
                method: 'PUT',
                data: { data: data },
            }),
        }),

        deleteWarehouseCategory: builder.mutation({
            query: (id) => ({
                url: API_URL.WAREHOUSE_CATEGORY + "/" + id,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useGetListWarehouseCategoryQuery,
    useAddWarehouseCategoryMutation,
    useDeleteWarehouseCategoryMutation,
    useEditWarehouseCategoryMutation
} = warehouseApi;
