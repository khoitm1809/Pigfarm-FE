import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useAddOffSpringMutation, useDeleteOffSpringMutation, useEditOffSpringMutation, useGetListOffSpringQuery } from "../../store/offSpring/offSpringAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTitle } from "../../store/auth/authSlice";

const OffSpringPage = () => {
    const dispatch = useDispatch();
    const [addOffSpring] = useAddOffSpringMutation();
    const [editOffSpring] = useEditOffSpringMutation();
    const [deleteOffSpring] = useDeleteOffSpringMutation();
    useEffect(()=>{
        dispatch(setTitle("Quản lý giống và đàn lợn"));
    },[])
    const title = [
        { key: "name", label: "Loại heo" },
        { key: "origin", label: "Xuất xứ" },
        { key: "date_of_entry", label: "Ngày nhập vào", isDateTime: true },
        { key: "type", label: "Loại" },
        { key: "sex", label: "Giới tính" },
        { key: "weight_at_import", label: "Cân nặng lúc nhập" },
        { key: "health", label: "Sức khỏe" },
        { key: "vaccination", label: "Tiêm chủng" },
        { key: "inventory", label: "Số lượng" },
        // { key: "invoice.payment_status", label: "Trạng thái thanh toán" },
    ];
    const {
        data: listOffSpring,
        isLoading: loadingListOffSpring,
        refetch
    } = useGetListOffSpringQuery({}, { refetchOnMountOrArgChange: true })


    return (
        <BoxContainer padding={'2rem'}>
            <Box sx={{ alignContent: 'center', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            </Box>
            <CustomTable
                title={title}
                data={listOffSpring}
                isEdit={true}
                mutationAddFunction={addOffSpring}
                mutationEditFunction={editOffSpring}
                mutationDeleteFunction={deleteOffSpring}
                loading={loadingListOffSpring}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default OffSpringPage;