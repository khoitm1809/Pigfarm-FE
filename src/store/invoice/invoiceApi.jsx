import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/ApiConstants';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';

export const invoiceApi = createApi({
    reducerPath: 'invoiceApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getListInvoice: builder.query({
            query: (params) => {
                const { barnId, ...rest } = params || {};
                return {
                    url: API_URL.INVOICE + "?populate=*",
                    method: "GET",
                    params: {
                        ...rest,
                    },
                };
            },
        }),

        addInvoice: builder.mutation({
            query: (payload) => ({
                url: API_URL.INVOICE,
                method: 'POST',
                data: { data: payload },
            }),
        }),

        editInvoice: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: API_URL.INVOICE + "/" + id,
                method: 'PUT',
                data: { data: rest },
            }),
        }),

        deleteInvoice: builder.mutation({
            query: (id) => ({
                url: API_URL.INVOICE + "/" + id,
                method: 'DELETE',
            }),
        }),

        getDetailInvoice: builder.query({
            query: (params) => {
                const { InvoiceId, ...rest } = params || {};
                return {
                    url: API_URL.INVOICE + "/" + InvoiceId + "?populate=*",
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
    useGetListInvoiceQuery,
    useAddInvoiceMutation,
    useDeleteInvoiceMutation,
    useEditInvoiceMutation
} = invoiceApi;
