import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { LOCAL_STORAGE_NAME } from '../../utils/constant';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';
const UID = localStorage.getItem("UID")
export const pigApi = createApi({
    reducerPath: 'piggApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getListPig: builder.query({
            query: (params) => {
                const { barnId, ...rest } = params || {};
                return {
                    url: API_URL.PIG + "?populate=*",
                    method: "GET",
                    params: {
                        ...rest,
                        ...(barnId ? { "filters[barn][id]": barnId } : {}),
                    },
                };
            },
        }),

        addPig: builder.mutation({
            query: (payload) => ({
                url: API_URL.PIG,
                method: 'POST',
                data: { data: payload },
            }),
        }),

        editPig: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: API_URL.PIG + "/" + id,
                method: 'PUT',
                data: { data: rest },
            }),
        }),

        deletePig: builder.mutation({
            query: (id) => ({
                url: `${API_URL.PIG}/${id}`,
                method: 'DELETE',
            }),
        }),

        getDetaiPig: builder.query({
            query: (params) => {
                const { pigId, ...rest } = params || {};
                return {
                    url: API_URL.PIG + "/" + pigId + "?populate=*",
                    method: "GET",
                    params: {
                        ...rest,
                    },
                };
            },
        }),

    }),
});

export const {
    useGetDetaiPigQuery,
    useGetListPigQuery,
    useAddPigMutation,
    useDeletePigMutation,
    useEditPigMutation
} = pigApi;
