import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import DetailLayout from "../../components/DetailLayout";
import { useAddFoodRationMutation, useDeleteFoodRationMutation, useEditFoodRationMutation, useGetListFoodRationQuery } from "../../store/foodRation/foodRationAction";
import { ROUTES } from "../../router/routerConstants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../store/auth/authSlice";

const FoodRationPage = () => {
    const dispatch = useDispatch();
    const [addFoodRation] = useAddFoodRationMutation();
    const [editFoodRation] = useEditFoodRationMutation();
    const [deleteFoodRation] = useDeleteFoodRationMutation();

    useEffect(()=>{
        dispatch(setTitle("Thiết lập chuỗi thức ăn"));
    },[])

    const title = [
        { key: "barns.barn_name", label: "Tên chuồng"},
        { key: "food_summary.food_name", label: "Cho ăn"},
        { key: "med_summary.med_name", label: "Thuốc sử dụng"},
    ];
    const {
        data: listFoodRation,
        isLoading: loadingListFoodRation,
        refetch
    } = useGetListFoodRationQuery({}, { refetchOnMountOrArgChange: true })
    console.log(listFoodRation);
    return (
        <BoxContainer padding={'2rem'}>
            <Box sx={{ alignContent: 'center', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            </Box>
            <CustomTable
                title={title}
                data={listFoodRation?.data || []}
                isEdit={true}
                detailNavigate={ROUTES.DRUG_USE}
                mutationAddFunction={addFoodRation}
                mutationEditFunction={editFoodRation}
                mutationDeleteFunction={deleteFoodRation}
                loading={loadingListFoodRation}
                refetch={refetch}
            />
        </BoxContainer>
    )
    
}

export default FoodRationPage;