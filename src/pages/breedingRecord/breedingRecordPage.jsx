import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { ROUTES } from "../../router/routerConstants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../store/auth/authSlice";
import { useAddBreedingRecordMutation, useDeleteBreedingRecordMutation, useEditBreedingRecordMutation, useGetListBreedingRecordQuery } from "../../store/breedingRecord/breedingRecordAction";

const BreedingRecordPage = () => {
    const dispatch = useDispatch();
    const [addBreedingRecord] = useAddBreedingRecordMutation();
    const [editBreedingRecord] = useEditBreedingRecordMutation();
    const [deleteBreedingRecord] = useDeleteBreedingRecordMutation();

    useEffect(()=>{
        dispatch(setTitle("Thiết lập thuốc"));
    },[])

    const title = [
        { key: "barn.name", label: "Lợn"},
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
        data: listBreedingRecord,
        isLoading: loadingListBreedingRecord,
        refetch
    } = useGetListBreedingRecordQuery({}, { refetchOnMountOrArgChange: true })
    console.log(listBreedingRecord);
    return (
        <BoxContainer padding={'2rem'}>
            <Box sx={{ alignContent: 'center', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            </Box>
            <CustomTable
                title={title}
                data={listBreedingRecord?.data || []}
                isEdit={true}
                mutationAddFunction={addBreedingRecord}
                mutationEditFunction={editBreedingRecord}
                mutationDeleteFunction={deleteBreedingRecord}
                loading={loadingListBreedingRecord}
                refetch={refetch}
            />
        </BoxContainer>
    )
    
}

export default BreedingRecordPage;