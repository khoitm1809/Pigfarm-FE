import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useAddBarnMutation, useDeleteBarnMutation, useEditBarnMutation, useGetListBarnQuery } from "../../store/breeding/breedingAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTitle } from "../../store/auth/authSlice";
import { ROUTES } from "../../router/routerConstants";
import { useNavigate } from "react-router";

const BarnPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addBarn] = useAddBarnMutation();
    const [editBarn] = useEditBarnMutation();
    const [deleteBarn] = useDeleteBarnMutation();
    const headerTitle = useSelector((state) => state.auth.headerTitle);
    useEffect(() => {
        dispatch(setTitle("Danh sách chuồng"));
    }, [])

    const title = [
        { key: "name", label: "Tên chuồng" },
        { key: "acreage", label: "Diện tích" },
        { key: "maximum_capacity", label: "Sức chứa" },
        { key: "status", label: "Trạng thái" },
        { key: "start_date", label: "Ngày bắt đầu", isDateTime: true },
        { key: "breedingarea.name", label: "Thuộc khu" },
        { key: "note", label: "Note" },
    ];
    const {
        data: listBarn,
        isLoading: loadingListBarn,
        refetch
    } = useGetListBarnQuery({}, { refetchOnMountOrArgChange: true })
    return (
        <BoxContainer padding={'2rem'}>
            <Box sx={{ alignContent: 'center', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        
            </Box>
            <CustomTable
                title={title}
                data={listBarn}
                isEdit={true}
                detailNavigate={ROUTES.BARN_HEALTH}
                mutationAddFunction={addBarn}
                mutationEditFunction={editBarn}
                mutationDeleteFunction={deleteBarn}
                loading={loadingListBarn}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default BarnPage;