import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useAddBreadingMutation, useDeleteBarnMutation, useEditBreadingMutation, useGetListBreedingQuery } from "../../store/breeding/breedingAction";
import { ROUTES } from "../../router/routerConstants";
import { STATUS } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setTitle } from "../../store/auth/authSlice";
import { useEffect } from "react";

const HerdBreedPage = () => {
    const dispatch = useDispatch();
    const [addBreeding] = useAddBreadingMutation();
    const [editBreeding] = useEditBreadingMutation();
    const [deleteBreeding] = useDeleteBarnMutation();
    useEffect(()=>{
            dispatch(setTitle("Quản lý khu và chuồng nuôi"));
        },[])

    const title = [
        { key: "name", label: "Tên khu" },
        { key: "acreage", label: "Diện tích" },
        { key: "number_of_barns", label: "Số chuồng" },
        { key: "status", label: "Trạng thái", isStatus: true, list: STATUS },
        { key: "type", label: "Loại" },
        { key: "start_date", label: "Ngày bắt đầu", isDateTime: true },
        { key: "note", label: "Note" },
    ];
    const {
        data: listBreeding,
        isLoading: loadingListBreeding,
        refetch
    } = useGetListBreedingQuery({}, { refetchOnMountOrArgChange: true })
    return (
        <BoxContainer padding={'2rem'}>
            <CustomTable
                title={title}
                data={listBreeding}
                isEdit={true}
                detailNavigate={ROUTES.BARN}
                mutationAddFunction={addBreeding}
                mutationEditFunction={editBreeding}
                mutationDeleteFunction={deleteBreeding}
                loading={loadingListBreeding}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default HerdBreedPage;