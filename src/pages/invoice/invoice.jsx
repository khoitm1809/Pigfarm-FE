import { BoxContainer } from '../../components/commonStyled';
import { useDeleteInvoiceMutation, useGetListInvoiceQuery } from '../../store/invoice/invoiceApi';
import CustomTable from "../../components/CustomTable";
import { ROUTES } from '../../router/routerConstants';
import { formatCurrency } from '../pig/detailPig';
import { t } from 'i18next';

export function Invoice() {
    const [deleteInvoice] = useDeleteInvoiceMutation();

    const {
        data: listInvoice,
        isLoading: isLoadingInvoice,
        refetch
    } = useGetListInvoiceQuery({}, {
        refetchOnMountOrArgChange: true
    });


    const totalPigs = listInvoice?.data?.length || 0;
    const totalValue = listInvoice?.data?.reduce((sum, pig) => sum + parseInt(pig.price, 10), 0) || 0;

    const invoiceSummaryCards = [
        {
            title: t("invoice.exportCard"),
            count: totalPigs.toLocaleString(),
            iconKey: "đã xong",
        },
        {
            title: t("invoice.invoiceCard"),
            count: formatCurrency(totalValue),
            iconKey: "tổng công việc",
        },

    ];

    const statusPig = [
            { value: "true", label: t("detailBarn.good")},
            { value: "false", label: t("detailBarn.sick")},
        ];

    const title = [
        { key: "pigCode", label: t("invoice.id") },
        { key: "healthStatus", label: t("invoice.health"), isDropDown: true, list: statusPig },
        { key: "weight", label: t("invoice.weight"), },
        { key: "age", label: t("invoice.age") },
        { key: "price", label: t("invoice.price") },
        { key: "pig_type.name", label: t("invoice.type") },
        { key: "users_permissions_user.username", label: t("invoice.exporter") }

    ];
    return (
        <BoxContainer padding={'2rem'}>
            <CustomTable
                title={title}
                data={listInvoice?.data}
                isEdit={true}
                mutationDeleteFunction={deleteInvoice}
                loading={isLoadingInvoice}
                refetch={refetch}
                invoice={true}
                invoiceSummary={invoiceSummaryCards}
            />
        </BoxContainer>
    );
}