import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { ROUTES } from "../../router/routerConstants";
import { convertToDropdown } from "../../components/convertToDropdown";
import { useAddPigGrowthRecordMutation, useDeletePigGrowthRecordMutation, useEditPigGrowthRecordMutation, useGetListPigGrowthRecordQuery } from "../../store/pig/pigGrowthRecordAction";
import { useSelector } from "react-redux";
import AddDataDialog from "../../components/AddDataDialog";
import EditDataDialog from "../../components/EditDataDialog";
import { t } from "i18next";

export const status = [
    { value: "true", label: t("pigGrowth.good") },
    { value: "false", label: t("pigGrowth.weak") },
];


const PigGrowthRecord = () => {
    const { modalType } = useSelector((state) => state.helper);
    const UID = localStorage.getItem("UID");

    const [addPigGrowthRecord] = useAddPigGrowthRecordMutation();
    const [editPigGrowthRecord] = useEditPigGrowthRecordMutation();
    const [deletePigGrowthRecord] = useDeletePigGrowthRecordMutation();
    // const {
    //     data: listBarn,
    //     // isLoading: loadingListBarn,
    // } = useGetListBarnQuery({}, { refetchOnMountOrArgChange: true })

    const {
        data: listTypePigGrowthRecord,
        isLoading: loadingTypePigGrowthRecord,
        refetch
    } = useGetListPigGrowthRecordQuery({
        UID: UID
    }, { refetchOnMountOrArgChange: true })
    const title = [
        { key: "recordDate", label: t("pigGrowth.date"), isDateTime: true },
        { key: "weight", label: t("pigGrowth.weight") },
        // Hiển thị Mã lợn (lồng nhau)
        { key: "pig.pigCode", label: t("pigGrowth.id") },
        // Hiển thị tên Người ghi nhận (lồng nhau)
        { key: "users_permissions_user.username", label: t("pigGrowth.worker") },
        { key: "note", label: t("pigGrowth.note") },
    ];
    const dialogTitle = [ // Truyền danh sách Lợn và User vào
        { key: "recordDate", label: t("pigGrowth.date"), isDateTime: true }, // Ngày tháng
        { key: "weight", label: t("pigGrowth.weight"), isNumber: true },

        // {
        //     key: "pig",
        //     label: "Lợn",
        //     isDropDown: true,
        //     // list: convertToDropdown(listPigs), // Giả định list Lợn được truyền vào
        //     mappingKey: "pig.id" // 🛑 Lấy ID của Lợn
        // },

        // {
        //     key: "users_permissions_user",
        //     label: "Người ghi nhận",
        //     isDropDown: true,
        //     // list: convertToDropdown(listUsers), // Giả định list User được truyền vào
        //     mappingKey: "users_permissions_user.id" // 🛑 Lấy ID của User
        // },

        { key: "note", label: t("pigGrowth.note") },
    ];


    return (
        <BoxContainer padding={'2rem'}>
            {modalType === 'add' && (
                <AddDataDialog
                    dialogTitle={dialogTitle}
                    mutationAddFunction={addPigGrowthRecord}
                    refetch={refetch}
                />
            )}


            {modalType === 'edit' && (
                <EditDataDialog
                    dialogTitle={dialogTitle}
                    mutationEditFunction={editPigGrowthRecord}
                    refetch={refetch}
                />
            )}

            <CustomTable
                title={title}
                data={listTypePigGrowthRecord?.data}
                isEdit={true}
                mutationDeleteFunction={deletePigGrowthRecord}
                loading={loadingTypePigGrowthRecord}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default PigGrowthRecord;