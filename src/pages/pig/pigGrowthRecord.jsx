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
import { useGetListPigQuery } from "../../store/pig/pigAction";

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

    const {
        data: listTypePigGrowthRecord,
        isLoading: loadingTypePigGrowthRecord,
        refetch
    } = useGetListPigGrowthRecordQuery({
        UID: UID
    }, { refetchOnMountOrArgChange: true })

        const {
        data: listPigs,
        isLoading: loadingListPig,
    } = useGetListPigQuery({
    }, { refetchOnMountOrArgChange: true })

    console.log(listPigs?.data)

    const title = [
        { key: "recordDate", label: t("pigGrowth.date"), isDateTime: true },
        { key: "weight", label: t("pigGrowth.weight") },
        { key: "pig.pigCode", label: t("pigGrowth.id") },
        { key: "users_permissions_user.username", label: t("pigGrowth.worker") },
        { key: "note", label: t("pigGrowth.note") },
    ];
    const dialogTitle = [ 
        { key: "recordDate", label: t("pigGrowth.date"), isDateTime: true }, 
        { key: "weight", label: t("pigGrowth.weight"), isNumber: true },
                {
            key: "pig",
            label: t("pigGrowth.id"),
            isDropDown: true,
            list: convertToDropdown(listPigs?.data), 
            mappingKey: "pig.pigCode" 
        },
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