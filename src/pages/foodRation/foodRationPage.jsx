import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
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
        { key: "barn.name", label: "Tên chuồng"},
        { key: "name", label: "Chế độ ăn thử" },
        { key: "start_time", label: "Ngày bắt đầu", isDateTime: true},
        { key: "end_time", label: "Ngày kết thúc", isDateTime: true},
        { key: "number_of_feedings_per_day", label: "Số lần ăn mỗi ngày"},
        { key: "food_details.food_warehouse.name", label: "Chi tiết thức ăn"},
        { key: "food_details.meal", label: "Bữa ăn"},
        { key: "food_details.weight", label: "Lượng thức ăn"},
        { key: "medition_details.medition_warehouse.name", label: "Chi tiết thuốc"},
        { key: "medition_details.dosage", label: "Liều thuốc sử dụng"},
        { key: "medition_details.meal", label: "Liều lượng"},
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