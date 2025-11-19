import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { WEIGHT } from "../../utils/constant";
import { useAddFoodWarehouseMutation, useDeleteFoodWarehouseMutation, useEditFoodWarehouseMutation, useGetListFoodWarehouseQuery } from "../../store/warehouse/warehouseAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTitle } from "../../store/auth/authSlice";

const FoodWarehousePage = () => {
    const dispatch = useDispatch();
    const [addFoodWarehouse] = useAddFoodWarehouseMutation();
    const [editFoodWarehouse] = useEditFoodWarehouseMutation();
    const [deleteFoodWarehouse] = useDeleteFoodWarehouseMutation();
    useEffect(()=>{
        dispatch(setTitle("Quản lý kho hàng hóa"));
    },[])
    const title = [
        { key: "name", label: "Tên hàng hóa" },
        { key: "inventory", label: "Số lượng" , disabledInDialog: true},
        { key: "weight", label: "Trọng lượng (kg)" },
        { key: "unit", label: "Đơn vị" },
        { key: "protein_content", label: "Lượng protein" },
        { key: "energy_content", label: "Năng lượng" },
        { key: "import_price", label: "Giá nhập" , disabledInDialog: true},
        { key: "import_date", label: "Ngày sản xuất", isDateTime: true },
        { key: "expiry", label: "Ngày hết hạn", isDateTime: true },
        { key: "note", label: "Note" },
    ];
    const {
        data: listFoodWareHouse,
        isLoading: loadingListFoodWareHouse,
        refetch
    } = useGetListFoodWarehouseQuery({}, { refetchOnMountOrArgChange: true })
    return (
        <BoxContainer padding={'2rem'}>
            <CustomTable
                title={title}
                data={listFoodWareHouse}
                isEdit={true}
                mutationAddFunction={addFoodWarehouse}
                mutationEditFunction={editFoodWarehouse}
                mutationDeleteFunction={deleteFoodWarehouse}
                loading={loadingListFoodWareHouse}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default FoodWarehousePage;