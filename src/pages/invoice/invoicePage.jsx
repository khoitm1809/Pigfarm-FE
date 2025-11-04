import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useAddInvoiceMutation, useDeleteInvoiceMutation, useEditInvoiceMutation, useGetListInvoiceQuery } from "../../store/invoice/invoiceAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTitle } from "../../store/auth/authSlice";

const InvoicePage = () => {
    const dispatch = useDispatch();
    const [addInvoice] = useAddInvoiceMutation();
    const [editInvoice] = useEditInvoiceMutation();
    const [deleteInvoice] = useDeleteInvoiceMutation();
    useEffect(()=>{
        dispatch(setTitle("Quản lý hóa đơn nhập hàng"));
    },[])

    const title = [
        { key: "discount", label: "Giảm giá" },
        { key: "payment_status", label: "Trạng thái thanh toán" },
        { key: "creation_date", label: "Ngày tạo", isDateTime: true },
    ];
    const {
        data: listInvoice,
        isLoading: loadingListInvoice,
        refetch
    } = useGetListInvoiceQuery({}, { refetchOnMountOrArgChange: true })


    return (
        <BoxContainer padding={'2rem'}>
            <Box sx={{ alignContent: 'center', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            </Box>
            <CustomTable
                title={title}
                data={listInvoice}
                isEdit={true}
                mutationAddFunction={addInvoice}
                mutationEditFunction={editInvoice}
                mutationDeleteFunction={deleteInvoice}
                loading={loadingListInvoice}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default InvoicePage;