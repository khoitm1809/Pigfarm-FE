import * as React from 'react';
import { useDispatch } from 'react-redux'; // REDUX

import { useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Skeleton, TextField, Typography } from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';
import { openAddModal, openEditModal } from '../store/helper/helperSlice';
import { DeleteButton, EditButton, Row } from './commonStyled';
import { t } from 'i18next';
import CardStatus from './CardStatus';

const getValueByPath = (obj, path) => {
    if (!obj || !path) return null;
    const parts = path.split('.');
    if (path.startsWith("pig_growth_records.")) {
        return obj.pig_growth_records;
    }
    return parts.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
};

const formatValue = (key, value, isArrayField = false) => {
    if (value === null || value === undefined) return "-";
    if (isArrayField && Array.isArray(value)) {
        if (key === "pig_growth_records.weight" && value.length > 0) {
            const sortedRecords = value
                .slice()
                .sort((a, b) => new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime());
            const weights = sortedRecords.map(record => record.weight);
            return `[${weights.map(w => `${w}kg`).join(', ')}]`;
        }
        return value.toString();
    }

    if (typeof value === "boolean") return value ? "true" : "false";
    if (key.toLowerCase().includes("date") || key.toLowerCase().includes("created_at")) {
        return dayjs(value).isValid() ? dayjs(value).format("DD/MM/YYYY") : value;
    }
    return value;
};

const getStatusStyleMui = (value) => {
    const lowerValue = String(value)?.toLowerCase();
    switch (lowerValue) {
        case "true": case "active": return { background: '#e8f5e9', color: '#388e3c' };
        case "inactive": return { background: '#fff3e0', color: '#f57c00' };
        case "false": return { background: '#ffebee', color: '#d32f2f' };
        default: return { background: (theme) => theme.palette.grey[100], color: (theme) => theme.palette.text.secondary };
    }
};

export default function CustomTable({
    title,
    data,
    isEdit,
    detailNavigate,
    mutationDeleteFunction,
    loading,
    refetch,
    isListUser,
    invoice,
    invoiceSummary
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;
        const lowerSearch = searchTerm.toLowerCase();

        return data?.filter((item) =>
            title?.some((col) => {
                const rawValue = getValueByPath(item, col.key);
                const value = formatValue(col.key, rawValue, col.isArray);

                return value?.toString()?.toLowerCase()?.includes(lowerSearch);
            })
        );
    }, [data, searchTerm, title]);

    const handleDelete = async (id) => {
        try {
            if (mutationDeleteFunction) {
                await mutationDeleteFunction(id).unwrap();
                if (refetch) refetch();
            } else {
                console.warn("Delete function (mutationDeleteFunction) is not provided.");
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };
    return (
        <Box>
            <Box mb={4}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                    {t("customTable.title")}
                </Typography>

            </Box>
            {invoice && <Box marginY={'2rem'} width={'100%'}>
                <Row sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: '0.8rem',
                }}>
                    {invoiceSummary?.map((card, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: {
                                    xs: "1 1 100%",
                                    sm: "1 1 calc(50% - 0.5rem)",
                                },
                                maxWidth: { lg: '50%' }
                            }}
                        >
                            <CardStatus
                                title={card.title}
                                count={card.count}
                                iconKey={card.iconKey}
                            />
                        </Box>
                    ))}
                </Row>

            </Box>}

            <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
                gap={2}
                mb={2}
                sx={{ width: "100%" }}
            >
                <TextField
                    fullWidth
                    placeholder={t("customTable.search")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <SearchOutlinedIcon sx={{ color: "action.active", mr: 1 }} />
                        ),
                        sx: {
                            backgroundColor: "#f2f2f2",
                            borderRadius: "8px",
                            height: "44px",
                            paddingLeft: "8px",
                            "& fieldset": { border: "none" },
                        },
                    }}
                />

                <Button
                    variant="outlined"
                    startIcon={<TuneOutlinedIcon />}
                    sx={{
                        height: "44px",
                        minWidth: { xs: "100%", sm: "auto" },
                        bgcolor: "#fff",
                        borderColor: "#ccc",
                        color: "#333",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#f7f7f7" },
                    }}
                >
                    {t("customTable.filters")}
                </Button>

                <Button
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    onClick={() => dispatch(openAddModal())}
                    sx={{
                        height: "44px",
                        width: { xs: "100%", sm: "10rem" },
                        bgcolor: "#000",
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": { bgcolor: "#222" },
                    }}
                >
                    {t("customTable.create")}
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, width: "100%", overflowX: "auto" }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: (theme) => theme.palette.grey[50] }}>
                            {title?.filter(col => col.key !== "password")?.map((col, i) => (
                                <TableCell key={i} sx={{ fontWeight: 600, padding: '12px 16px' }}>
                                    {col.label}
                                </TableCell>
                            ))}
                            {isEdit && (
                                <TableCell sx={{ fontWeight: 600, padding: '12px 16px' }}>
                                    {t("customTable.action")}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            [...Array(5)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {title?.filter(col => col.key !== "password")?.map((_, colIndex) => (
                                        <TableCell key={colIndex}>
                                            <Skeleton variant="rectangular" width="90%" height={24} sx={{ borderRadius: 1 }} />
                                        </TableCell>
                                    ))}
                                    {isEdit && <TableCell><Skeleton variant="circular" width={32} height={32} /></TableCell>}
                                </TableRow>
                            ))
                        ) : filteredData?.length > 0 ? (
                            filteredData?.map((item, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    sx={{
                                        '&:last-child td': { borderBottom: 'none' },
                                        '&:hover': { backgroundColor: detailNavigate ? (theme) => theme.palette.action.hover : 'inherit' },
                                    }}
                                >
                                    {title?.filter(col => col.key !== "password")?.map((col, colIndex) => {
                                        const rawValue = getValueByPath(item, col?.key);
                                        const isStatusField = col?.key.toLowerCase().includes('status');
                                        const cellRawValue = isStatusField ? String(rawValue) : rawValue;

                                        let displayContent = cellRawValue;
                                        if (col.isDropDown && col.list) {
                                            const option = col.list.find(op => String(op.value) === String(cellRawValue));
                                            displayContent = option ? option.label : cellRawValue;
                                        } else {
                                            displayContent = formatValue(col?.key, cellRawValue, col.isArray);
                                        }

                                        const statusStyles = isStatusField ? getStatusStyleMui(cellRawValue) : {};


                                        return (
                                            <TableCell
                                                key={colIndex}
                                                onClick={() => detailNavigate && navigate(detailNavigate, { state: item?.documentId })}
                                                sx={{ cursor: detailNavigate ? "pointer" : "default" }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="span"
                                                    sx={{
                                                        ...(isStatusField ? {
                                                            padding: '4px 10px',
                                                            borderRadius: '16px',
                                                            fontWeight: 500,
                                                            display: 'inline-block',
                                                            ...statusStyles,
                                                        } : {}),
                                                        color: isStatusField ? statusStyles.color : (theme) => theme.palette.text.secondary
                                                    }}
                                                >
                                                    {displayContent}
                                                </Typography>
                                            </TableCell>
                                        );
                                    })}
                                    {isEdit && (
                                        <TableCell>
                                            <Row gap={'0.5rem'}>
                                                <EditButton onClick={() => dispatch(openEditModal(item))} sx={{ '& svg': { fontSize: '1.1rem' } }}>
                                                    <ModeEditOutlineOutlinedIcon />
                                                </EditButton>
                                                <DeleteButton onClick={() => handleDelete(isListUser ? item?.id : item?.documentId ?? item?.id)} sx={{ '& svg': { fontSize: '1.1rem' } }}>
                                                    <DeleteOutlineOutlinedIcon />
                                                </DeleteButton>
                                            </Row>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={title?.length + (isEdit ? 1 : 0)} align="center">
                                    <Typography variant="body1" sx={{ color: 'text.secondary', py: 3 }}>
                                        {t("customTable.none")}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}