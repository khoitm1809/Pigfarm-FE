import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useAddBarnHealthMutation, useDeleteBarnHealthMutation, useEditBarnHealthMutation, useGetListBarnHealthQuery } from "../../store/health/barnHealthAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTitle } from "../../store/auth/authSlice";
import { STATUS } from "../../utils/constant";

const BarnHealthPage = () => {
    const dispatch = useDispatch();
    const [addBarnHealth] = useAddBarnHealthMutation();
    const [editBarnHealth] = useEditBarnHealthMutation();
    const [deleteBarnHealth] = useDeleteBarnHealthMutation();
    const headerTitle = useSelector((state) => state.auth.headerTitle);
    useEffect(() => {
        dispatch(setTitle("Sức khỏe của chuồng"));
    }, [])

    const title = [
        { key: "barn.name", label: "Tên chuồng" },
        { key: "dateofInspection", label: "Ngày kiểm tra" },
        { key: "averageWeight", label: "Cân nặng trung bình" },
        { key: "loss", label: "Số lợn chết" },
        { key: "faecesStatus", label: "Trạng thái", isStatus: true, list: STATUS },
        { key: "note", label: "Ghi chú" },
    ];
    const {
        data: listBarnHealth,
        isLoading: loadingListBarnHealth,
        refetch
    } = useGetListBarnHealthQuery({}, { refetchOnMountOrArgChange: true })
    return (
        <BoxContainer padding={'2rem'}>
            <Box sx={{ alignContent: 'center', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        
            </Box>
            <CustomTable
                title={title}
                data={listBarnHealth}
                isEdit={true}
                mutationAddFunction={addBarnHealth}
                mutationEditFunction={editBarnHealth}
                mutationDeleteFunction={deleteBarnHealth}
                loading={loadingListBarnHealth}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default BarnHealthPage;