import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useAddMeditionWarehouseMutation, useDeleteMeditionWarehouseMutation, useEditMeditionWarehouseMutation, useGetListMeditionWarehouseQuery } from "../../store/warehouse/warehouseAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTitle } from "../../store/auth/authSlice";

const MeditionWarehousePage = () => {
    const dispatch = useDispatch();
    const [addMeditionWarehouse] = useAddMeditionWarehouseMutation();
    const [editMeditionWarehouse] = useEditMeditionWarehouseMutation();
    const [deleteMeditionWarehouse] = useDeleteMeditionWarehouseMutation();
    useEffect(()=>{
            dispatch(setTitle("Quản lý kho thuốc"));
        },[])

    const title = [
        { key: "name", label: "Tên thuốc" },
        { key: "brand", label: "Hãng" },
        { key: "drug_type", label: "Loại thuốc" },
        { key: "usage_type", label: "Cách sử dụng" },
        { key: "inventory", label: "Số lượng" },
        { key: "unit", label: "Đơn vị" },
        { key: "capacity", label: "Dung tích" },
        { key: "import_price", label: "Giá nhập" },
        { key: "date_of_manufacture", label: "Ngày sản xuất", isDateTime: true },
        { key: "expiry", label: "Ngày hết hạn", isDateTime: true },
        { key: "Note", label: "Note" },
    ];
    const {
        data: listWareHouse,
        isLoading: loadinglistWareHouse,
        refetch
    } = useGetListMeditionWarehouseQuery({}, { refetchOnMountOrArgChange: true })
    return (
        <BoxContainer padding={'2rem'}>
            <Box sx={{ alignContent: 'center', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            </Box>
            <CustomTable
                title={title}
                data={listWareHouse}
                isEdit={true}
                mutationAddFunction={addMeditionWarehouse}
                mutationEditFunction={editMeditionWarehouse}
                mutationDeleteFunction={deleteMeditionWarehouse}
                loading={loadinglistWareHouse}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default MeditionWarehousePage;