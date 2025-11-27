import { useSelector } from "react-redux";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useAddTypePigMutation, useDeleteTypePigMutation, useEditTypePigMutation, useGetListTypePigQuery } from "../../store/typePig/typePigAction";
import AddDataDialog from "../../components/AddDataDialog";
import EditDataDialog from "../../components/EditDataDialog";
import { t } from "i18next";

export function PigTypesPage() {
    const [addPigType] = useAddTypePigMutation();
    const [editPigType] = useEditTypePigMutation();
    const [deletePigType] = useDeleteTypePigMutation();
    const { modalType } = useSelector((state) => state.helper);

    const {
        data: listPigTpe,
        isLoading: loadingPigType,
        refetch
    } = useGetListTypePigQuery({}, { refetchOnMountOrArgChange: true })

    const title = [
        { key: "name", label: t("pigType.name") },
        { key: "description", label: t("pigType.description") },
    ];

    const titleDialog = [
        { key: "name", label: t("pigType.name") },
        { key: "description", label: t("pigType.description") },
    ];

    return (
        <BoxContainer padding={'2rem'}>
            {modalType === 'add' && (
                <AddDataDialog
                    dialogTitle={titleDialog}
                    mutationAddFunction={addPigType}
                    refetch={refetch}
                />
            )}

            {modalType === 'edit' && (
                <EditDataDialog
                    dialogTitle={titleDialog}
                    mutationEditFunction={editPigType}
                    refetch={refetch}
                />
            )}
            <CustomTable
                title={title}
                data={listPigTpe?.data}
                isEdit={true}
                mutationDeleteFunction={deletePigType}
                loading={loadingPigType}
                refetch={refetch}
            />
        </BoxContainer>
    );
}
