import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BoxContainer, Column, Row } from '../../components/commonStyled';
import { useDeletePigMutation, useGetDetaiPigQuery } from '../../store/pig/pigAction';
import { Box, Button, Divider, Typography, CircularProgress } from '@mui/material';
import {
    Scale, Calendar, Home, DollarSign, Heart, Clock, TrendingUp, BarChart4,
    Edit, Trash2, FileText, User, CircleDollarSign
} from 'lucide-react';
import { useAddInvoiceMutation } from '../../store/invoice/invoiceApi';
import { ROUTES } from '../../router/routerConstants';
import { t } from 'i18next';


const BoxData = ({ title, number, unit, Icon, color = 'primary' }) => {
    return (
        <Box
            sx={{
                padding: '1.5rem',
                bgcolor: '#ffffff',
                borderLeft: `5px solid`,
                borderColor: (theme) => theme.palette[color].main,
                borderRadius: '8px',
                boxShadow: 3,
                minHeight: '8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Row sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: '600', color: '#555' }}>
                    {title}
                </Typography>
                {Icon && <Icon size={24} color="#aaa" />}
            </Row>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, color: (theme) => theme.palette[color].dark }}>
                {number || 'N/A'}
                <span style={{ fontSize: '1rem', fontWeight: 'normal', marginLeft: '0.5rem' }}>{unit}</span>
            </Typography>
        </Box>
    );
};

const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN').substring(0, 5);
};

export const formatCurrency = (number) => {
    if (!number || isNaN(number)) return '0';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

const calculateDaysLived = (createdAt) => {
    if (!createdAt) return 0;
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export function DetailPig() {
    const location = useLocation();
    const navigate = useNavigate();
    const pigId = location.state;
    const [deletePig] = useDeletePigMutation();
    const [addInvoice] = useAddInvoiceMutation();

    const {
        data,
        isLoading,
        isError,
    } = useGetDetaiPigQuery(
        { pigId: pigId },
        { refetchOnMountOrArgChange: true }
    );

    const handleDelete = () => {
        deletePig({ id: pigId })
            .unwrap()
            .then(() => {
                navigate(ROUTES.PIG_PAGE);
            })
            .catch((error) => {
                alert('Failed delete');
            });
    };

    if (isLoading) {
        return (
            <BoxContainer padding={'2rem'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </BoxContainer>
        );
    }

    if (isError || !data || !data.data) {
        return (
            <BoxContainer padding={'2rem'} sx={{ textAlign: 'center' }}>
                <Typography variant="h5" color="error">{t("detailPig.nonePig")}</Typography>
                <Button variant="contained" onClick={() => navigate('/pigs')} sx={{ mt: 2 }}>{t("detailPig.back")}</Button>
            </BoxContainer>
        );
    }

    const pigDetail = data.data; 
    const latestWeightRecord = [...pigDetail.pig_growth_records]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    const initialWeight = parseFloat(pigDetail?.weight) || 0;
    const currentWeight = latestWeightRecord?.weight || initialWeight;
    const totalInitialPrice = parseFloat(pigDetail?.price) || 0;
    const initialPricePerKg =
        initialWeight > 0 ? totalInitialPrice / initialWeight : 0;

    const daysLived = calculateDaysLived(pigDetail?.createdAt);
    const weightDiff = currentWeight - initialWeight;
    const profit = weightDiff * initialPricePerKg;
    const profitDisplay =
        profit < 0
            ? `-${formatCurrency(Math.abs(profit))}`
            : formatCurrency(profit);



    const handleExport = () => {
        if (!data || !data.data) {
            alert('No data to export pig.');
            return;
        }

        const pigDetail = data.data;
        const invoicePayload = {
            pigCode: pigDetail.pigCode,
            weight: currentWeight,
            age: pigDetail.age,
            note: pigDetail.note,
            price: totalInitialPrice,
            users_permissions_user: pigDetail.users_permissions_user?.documentId,
        };

        addInvoice(invoicePayload)
            .unwrap()
            .then((invoiceResponse) => {
                const newInvoiceId = invoiceResponse?.data?.id;

                return deletePig(pigId)
                    .unwrap()
                    .then(() => {
                        navigate(ROUTES.INVOICE, {
                            state: newInvoiceId,
                        });
                    });
            })
            .catch((error) => {
                console.error('Error while exporting', error);
            });
    };

    return (
        <BoxContainer padding={'2rem'} sx={{ width: '100%', background: '#f0f0f0', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
                {t("detailPig.title")} {pigDetail.pigCode}
            </Typography>
            <Row sx={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'flex-start',
                '@media (max-width: 1249px)': {
                    flexDirection: 'column',
                    alignItems: 'stretch',
                },
            }}>
                <Column sx={{
                    width: '60%',
                    borderRadius: '1rem',
                    background: 'white',
                    boxShadow: 5,
                    p: 3,
                    '@media (max-width: 1249px)': { width: '100%' }
                }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: '700', color: '#333' }}>
                        {t("detailPig.heading")}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {[
                        { label: t("detailPig.id"), value: pigDetail?.pigCode, Icon: null },
                        { label: t("detailPig.type"), value: pigDetail?.pig_type?.name, Icon: FileText },
                        { label: t("detailPig.age"), value: `${pigDetail?.age} month`, Icon: Calendar },
                        { label: t("detailPig.weight"), value: `${initialWeight} kg`, Icon: Scale },
                        { label: t("detailPig.barn"), value: pigDetail?.barn?.name, Icon: Home },
                        { label: t("detailPig.health"), value: pigDetail?.healthStatus ? t("detailPig.good") : t("detailPig.pending"), Icon: Heart, color: pigDetail?.healthStatus ? 'success' : 'error' },
                        { label: t("detailPig.price"), value: formatCurrency(initialPricePerKg), Icon: DollarSign, color: 'info' },
                        { label: t("detailPig.created"), value: pigDetail?.users_permissions_user?.username, Icon: User },
                        { label: t("detailPig.date"), value: formatDateTime(pigDetail?.createdAt), Icon: Clock },
                    ].map((item, index) => (
                        <Column key={index}>
                            <Row sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px dotted #eee', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {item.Icon && <item.Icon size={18} color="#777" />} {item.label}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: '600', color: item.color ? (theme) => theme.palette[item.color].main : '#333' }}>
                                    {item.value || 'N/A'}
                                </Typography>
                            </Row>
                        </Column>
                    ))}

                    <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: '700', color: '#333' }}>
                        {t("detailPig.note")}
                    </Typography>
                    <Box sx={{ p: 2, bgcolor: '#fafafa', borderRadius: '4px', border: '1px solid #ddd' }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}>
                            {pigDetail?.note || t("detailPig.noNote")}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Edit size={20} />}
                        sx={{ mt: 3 }}
                        onClick={() => navigate(`/edit-pig/${pigId}`, { state: pigId })}
                    >
                        {t("detailPig.edit")}
                    </Button>
                </Column>

                <Column sx={{ width: '35%', gap: '1rem', '@media (max-width: 1249px)': { width: '100%' } }}>
                    <BoxData
                        title={t("detailPig.weight2")}
                        number={currentWeight}
                        unit={"kg"}
                        Icon={Scale}
                        color={'info'}
                    />
                    <BoxData
                        title={t("detailPig.date2")}
                        number={daysLived}
                        unit={"d"}
                        Icon={Clock}
                        color={'secondary'}
                    />
                    <BoxData
                        title={t("detailPig.growth")}
                        number={weightDiff > 0 ? `+${weightDiff}` : weightDiff}
                        unit={"kg"}
                        Icon={TrendingUp}
                        color={weightDiff > 0 ? 'success' : 'warning'}
                    />

                    <BoxData
                        title={t("detailPig.profit")}
                        number={profitDisplay}
                        unit={"VND"}
                        Icon={BarChart4}
                        color={profit >= 0 ? 'success' : 'error'}
                    />

                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<Trash2 size={20} />}
                        sx={{ mt: 0 }}
                        fullWidth
                        onClick={handleDelete}
                    >
                        {t("detailPig.delete")}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CircleDollarSign size={20} />}
                        fullWidth
                        onClick={handleExport}
                    >
                        {t("detailPig.export")}
                    </Button>
                </Column>
            </Row>
        </BoxContainer>
    );
}