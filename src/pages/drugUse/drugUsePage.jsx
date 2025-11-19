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
        { key: "areaName", label: "Khu"},
        { key: "barns.barnName", label: "Chuồng" },
        { key: "summary", label: "Chi tiết thuốc"},
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
                data={listDrugUse || []}
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