import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { ROUTES } from "../../router/routerConstants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../store/auth/authSlice";
import { useAddDrugUseMutation, useDeleteDrugUseMutation, useEditDrugUseMutation, useGetListDrugUseQuery } from "../../store/drugUse/drugUseAction";

const DrugUsePage = () => {
    const dispatch = useDispatch();
    const [addDrugUse] = useAddDrugUseMutation();
    const [editDrugUse] = useEditDrugUseMutation();
    const [deleteDrugUse] = useDeleteDrugUseMutation();

    useEffect(()=>{
        dispatch(setTitle("Thiết lập thuốc"));
    },[])

    const title = [
        { key: "barn.name", label: "Tên chuồng"},
        { key: "reason", label: "Chế độ thuốc" },
        { key: "start_date", label: "Ngày bắt đầu", isDateTime: true},
        { key: "end_date", label: "Ngày kết thúc", isDateTime: true},
        { key: "details.time", label: "Liều thuốc"},
        { key: "details.method", label: "Hình thức sử dụng"},
        { key: "details.dosage", label: "Liều lượng"},
        { key: "details.dosage_unit", label: "Đơn vị lượng thuốc"},
        { key: "details.medition_warehouse.name", label: "Chi tiết thuốc"},
        { key: "medition_warehouse.name", label: "Kho thuốc"},
        { key: "details.note", label: "Ghi chú"},
    ];
    const {
        data: listDrugUse,
        isLoading: loadingListDrugUse,
        refetch
    } = useGetListDrugUseQuery({}, { refetchOnMountOrArgChange: true })
    console.log(listDrugUse);
    return (
        <BoxContainer padding={'2rem'}>
            <Box sx={{ alignContent: 'center', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            </Box>
            <CustomTable
                title={title}
                data={listDrugUse?.data || []}
                isEdit={true}
                mutationAddFunction={addDrugUse}
                mutationEditFunction={editDrugUse}
                mutationDeleteFunction={deleteDrugUse}
                loading={loadingListDrugUse}
                refetch={refetch}
            />
        </BoxContainer>
    )
    
}

export default DrugUsePage;