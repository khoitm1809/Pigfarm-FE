import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { ROUTES } from "../../router/routerConstants";
import { convertToDropdown } from "../../components/convertToDropdown";
import { useAddWarehouseItemMutation, useDeleteWarehouseItemMutation, useEditWarehouseItemMutation, useGetListWarehouseItemQuery } from "../../store/warehouse/warehouseItemAction";
import { useSelector } from "react-redux";
import EditDataDialog from "../../components/EditDataDialog";
import AddDataDialog from "../../components/AddDataDialog";
import { useLocation } from "react-router";
import { useGetListWarehouseCategoryQuery } from "../../store/warehouse/warehouseAction";
import { ROLES } from "../../utils/rolesConstant";
import { t } from "i18next";

const WareHouseItem = () => {
    const location = useLocation();
    const warehouseCategoryID = location?.state;
    const UID = localStorage.getItem("UID");
    const role = localStorage.getItem("role");
    const [addWareHouseItem] = useAddWarehouseItemMutation();
    const [editWareHouseItem] = useEditWarehouseItemMutation();
    const [deleteWareHouseItem] = useDeleteWarehouseItemMutation();
    const { modalType } = useSelector((state) => state.helper);

    const {
        data: listWareHouseItem,
        isLoading: loadingWareHouseItem,
        refetch
    } = useGetListWarehouseItemQuery({
        warehouseCategoryID: warehouseCategoryID,
        UID: role == ROLES.OWNER ? null : UID
    }, { refetchOnMountOrArgChange: true })

    const {
        data: listWareHouseCategory,
    } = useGetListWarehouseCategoryQuery({
        warehouseCategoryID: warehouseCategoryID,
    }, { refetchOnMountOrArgChange: true })

    const title = [
        { key: "name", label: t("warehouseItem.name") },
        { key: "quantity", label: t("warehouseItem.quantity") },
        { key: "unit", label: t("warehouseItem.unit") },
        { key: "warehouse_category.name", label: t("warehouseItem.category") },
        { key: "users_permissions_user.username", label: t("warehouseItem.user") },
        { key: "createdAt", label: t("warehouseItem.date") },
    ];

    const dialogTitle = [ 
        { key: "name", label: t("warehouseItem.name") },
        { key: "quantity", label: t("warehouseItem.quantity"), isNumber: true },
        { key: "unit", label: t("warehouseItem.unit") },

        {
            key: "warehouse_category",
            label: t("warehouseItem.category"),
            isDropDown: true,
            list: convertToDropdown(listWareHouseCategory?.data),
            mappingKey: "warehouse_category.id" 
        },

        {
            key: "users_permissions_user",
            label: t("warehouseItem.worker"),
            isDropDown: true,
            mappingKey: "users_permissions_user.id" 
        },
    ];


    return (
        <BoxContainer padding={'2rem'}>
            {modalType === 'add' && (
                <AddDataDialog
                    dialogTitle={dialogTitle}
                    mutationAddFunction={addWareHouseItem}
                    refetch={refetch}
                />
            )}


            {modalType === 'edit' && (
                <EditDataDialog
                    dialogTitle={dialogTitle}
                    mutationEditFunction={editWareHouseItem}
                    refetch={refetch}
                />
            )}

            <CustomTable
                title={title}
                data={listWareHouseItem?.data}
                isEdit={true}
                mutationDeleteFunction={deleteWareHouseItem}
                loading={loadingWareHouseItem}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default WareHouseItem;