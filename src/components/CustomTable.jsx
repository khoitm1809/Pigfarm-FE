import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { BoxBeetwen, CloseButton, CloseIcon, DeleteButton, EditButton, MainButton, Row, TextFieldCustom } from "./commonStyled";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from "dayjs";
import Draggable from "react-draggable";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { NumericFormat } from 'react-number-format';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { t } from "i18next";

function PaperComponent(props) {
    const nodeRef = React.useRef(null);
    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

const FormField = React.memo(({ field, value, onChange }) => {
    return (
        <Grid item xs={12} sm={field.key === "note" ? 12 : 6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography sx={{ fontSize: 14, color: "#333", fontWeight: 500 }}>
                    {field.label}
                </Typography>
                {(field?.isDropDown || field?.isStatus || field?.isGender) ? (
                    <FormControl sx={{
                        minWidth: "200px",
                        "& fieldset": {
                            border: "none",
                        },
                    }}>
                        <InputLabel id={`${field.key}-label`}>{field.label}</InputLabel>
                        <Select
                            labelId={`${field.key}-label`}
                            variant="outlined"
                            sx={{ background: "#e8e7e7ff", width: "220px", height: "46px", borderRadius: "8px" }}
                            id={field.key}
                            value={value ?? ""}
                            onChange={(e) => onChange(field.key, e.target.value)}
                            autoWidth
                        >
                            {field?.list?.map((item, index) => (
                                <MenuItem value={item?.value} key={index}>
                                    {item?.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {field.key !== "status" && (
                            <Typography sx={{ fontSize: 14, color: "#333", fontWeight: 500 }}>
                                {field.label}
                            </Typography>
                        )}

                    </FormControl>
                ) : field.isDateTime ? (
                    <DateTimePicker
                        sx={{
                            background: "#e8e7e7ff",
                            width: "220px", height: "46px",
                            borderRadius: "8px",
                            "& fieldset": {
                                border: "none",
                            },
                        }}
                        value={value ? dayjs(value) : null}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                        }}
                        onChange={(newValue) => onChange(field.key, newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                ) : (
                    <TextFieldCustom
                        fullWidth
                        placeholder={field?.label}
                        variant="outlined"
                        value={value ?? ""}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        multiline={field.key === "note"}
                        rows={field.key === "note" ? 3 : 1}
                    />
                )}
            </Box>
        </Grid>
    );
});

const getStatusStyleMui = (value) => {
    const lowerValue = String(value)?.toLowerCase();
    switch (lowerValue) {
        case "true": case "active": return { background: '#e8f5e9', color: '#388e3c' };
        case "inactive": return { background: '#fff3e0', color: '#f57c00' };
        case "false": return { background: '#ffebee', color: '#d32f2f' };
        default: return { background: (theme) => theme.palette.grey[100], color: (theme) => theme.palette.text.secondary };
    }
};

export default function CustomTable({ title, data, isEdit, detailNavigate, mutationAddFunction, mutationEditFunction, mutationDeleteFunction, loading, refetch }) {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [isBtnEdit, setIsBtnEdit] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [formData, setFormData] = React.useState(
        title?.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {})
    );

    const getStatusStyle = (value) => {
        switch (value) {
            case "active":
                return { background: "green", color: "white" };
            case "inactive":
                return { background: "goldenrod", color: "white" };
            case "pending":
                return { background: "red", color: "white" };
            default:
                return { background: "inherit", color: "inherit" };
        }
    };

    const getValueByPath = (obj, path) => {
        if (!obj || !path) return null;
        const parts = path.split('.');

        // Nếu path là "pig_growth_records.weight", ta sẽ chỉ lấy mảng pig_growth_records
        // và để logic xử lý cân nặng (map, sort) cho formatValue.
        if (path.startsWith("pig_growth_records.")) {
            return obj.pig_growth_records;
        }

        // Xử lý thông thường cho các path khác
        return parts.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
    };


    const formatValue = (key, value, isArrayField = false) => {
        if (value === null || value === undefined) return "-";
        // --- Logic xử lý MẢNG đặc biệt (Chỉ áp dụng cho các cột được đánh dấu isArray) ---
        if (isArrayField && Array.isArray(value)) {
            // Trường hợp cụ thể: Cân nặng lợn
            if (key === "pig_growth_records.weight" && value.length > 0) {

                // 1. Sắp xếp theo recordDate tăng dần (từ cũ đến mới)
                const sortedRecords = value
                    .slice()
                    .sort((a, b) => new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime());

                // 2. Lấy mảng cân nặng và định dạng
                const weights = sortedRecords.map(record => record.weight);
                // Trả về chuỗi định dạng mong muốn: [65kg, 70kg]
                return `[${weights.map(w => `${w}kg`).join(', ')}]`;
            }

            // Trường hợp mảng chung khác (nếu có, có thể cần logic tùy chỉnh khác)
            // Ví dụ: return value.join(', ');
            return value.toString();
        }

        // --- Logic xử lý giá trị đơn giản ---

        if (typeof value === "boolean") {
            return value ? "true" : "false";
        }

        if (typeof value === "object") {
            return Object.entries(value)
                .map(([k, v]) => `${k}: ${v}`)
                .join(", ");
        }

        if (key.toLowerCase().includes("date") || key.toLowerCase().includes("created_at") || key.toLowerCase().includes("expiry")) {
            return dayjs(value).isValid() ? dayjs(value).format("DD/MM/YYYY") : value;
        }

        if (typeof value === "number") {
            return <NumericFormat
                value={value ?? 0}
                displayType={"text"}
                allowLeadingZeros
                decimalSeparator={"."}
                thousandSeparator={","}
            />
        }

        return value;
    };

    const isFormValid = title?.every(field => {
        const value = formData[field.key];
        // Nếu là dropdown hay input thì kiểm tra khác nhau
        return value !== "" && value !== null && value !== undefined;
    });

    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;
        const lowerSearch = searchTerm.toLowerCase();

        return data?.filter((item) =>
            title?.some((col) => {
                const rawValue = getValueByPath(item, col.key);

                // Sử dụng formatValue để có được giá trị đã định dạng (bao gồm cả chuỗi mảng)
                const value = formatValue(col.key, rawValue, col.isArray);

                // Chuyển đổi giá trị sang chuỗi để tìm kiếm
                return value?.toString()?.toLowerCase()?.includes(lowerSearch);
            })
        );
    }, [data, searchTerm, title]);

    const handleClickOpen = () => {
        setFormData([])
        setOpen(true);
        setIsBtnEdit(false)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = React.useCallback((key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    }, [setFormData]);

    const handleSave = async () => {
        try {
            if (isBtnEdit) {
                await mutationEditFunction(formData).unwrap();
            } else {
                await mutationAddFunction(formData).unwrap();
            }
            refetch();
            handleClose();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleOpenEdit = (item) => {
        setFormData(item);
        setOpen(true);
        setIsBtnEdit(true)
    };

    const handleDelete = async (id) => {
        try {
            // Kiểm tra xem mutationDeleteFunction có tồn tại không
            if (mutationDeleteFunction) {
                await mutationDeleteFunction(id).unwrap();
                // Kiểm tra xem refetch có tồn tại không
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
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                PaperProps={{
                    sx: {
                        background: 'white',
                        width: "50%",
                        height: "auto",
                        maxWidth: "none",
                    },
                }}
            >
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                    <BoxBeetwen>
                        <Typography style={{ fontWeight: "bold" }}>{t("customTable.create")}</Typography>
                        <CloseButton onClick={handleClose}>
                            <CloseIcon />
                        </CloseButton>
                    </BoxBeetwen>
                </DialogTitle>

                <DialogContent style={{ background: "#c0c0c023" }}>
                    <DialogContentText style={{ marginTop: "30px" }} component="div">
                        <Grid container spacing={2}>
                            {title
                                ?.filter(f => !f.disabledInDialog)
                                .map((field) => (

                                    <FormField
                                        key={field.key}
                                        field={field}
                                        value={formData[field.key]}
                                        onChange={handleChange}
                                    />
                                ))}
                        </Grid>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ width: '100%', justifyContent: "center" }}>
                    <BoxBeetwen>
                        <MainButton onClick={handleSave} sx={{ backgroundColor: "black" }} variant="contained" disabled={!isFormValid}>
                            {t("customTable.save")}
                        </MainButton>
                    </BoxBeetwen>
                </DialogActions>
            </Dialog>



            <Box mb={4}>
                {/* TITLE */}
                <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{ mb: 1 }}
                >
                    {t("customTable.accManage")}
                </Typography>

                {/* SUBTITLE */}
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                >
                    {t("customTable.accList")}
                </Typography>
            </Box>

            <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
                gap={2}
                mb={2}
                sx={{
                    width: "100%",
                }}
            >
                {/* Search Input */}
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
                            border: "none",

                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },
                        },
                    }}
                />

                {/* Nút Lọc */}
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
                        "&:hover": {
                            borderColor: "#999",
                            backgroundColor: "#f7f7f7",
                        },
                    }}
                >
                    {t("customTable.filters")}
                </Button>

                {/* Nút Thêm */}
                <Button
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    onClick={handleClickOpen}
                    sx={{
                        height: "44px",
                        width: { xs: "100%", sm: "10rem" },
                        bgcolor: "#000",
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": {
                            bgcolor: "#222",
                        },
                    }}
                >
                    {t("customTable.create")}
                </Button>
            </Box>



            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    width: "100%",
                    overflowX: "auto",
                    display: "block"
                }}
            >
                <Table aria-label="customized table">

                    <TableHead>
                        <TableRow sx={{ backgroundColor: (theme) => theme.palette.grey[50] }}>
                            {title?.filter(col => col.key !== "password")?.map((col, i) => (
                                <TableCell
                                    key={i}
                                    sx={{
                                        fontWeight: 600,
                                        color: (theme) => theme.palette.text.primary,
                                        padding: '12px 16px'
                                    }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                            {isEdit && (
                                <TableCell sx={{ fontWeight: 600, color: (theme) => theme.palette.text.primary, padding: '12px 16px' }}>
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
                                    {isEdit && (
                                        <TableCell>
                                            <Skeleton variant="circular" width={32} height={32} />
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : filteredData?.length > 0 ? (
                            // Hiển thị Dữ liệu
                            filteredData?.map((item, rowIndex) => {
                                const getStatusStyleMui = (value) => {
                                    const lowerValue = String(value).toLowerCase();
                                    switch (lowerValue) {
                                        case "true":
                                            return { background: '#e8f5e9', color: '#388e3c' };
                                        case "inactive":
                                            return { background: '#fff3e0', color: '#f57c00' };
                                        case "pending":
                                            return { background: '#ffebee', color: '#d32f2f' };
                                        default:
                                            return { background: (theme) => theme.palette.grey[100], color: (theme) => theme.palette.text.secondary };
                                    }
                                };
                                return (
                                    <TableRow
                                        key={rowIndex}
                                        sx={{
                                            '&:last-child td': { borderBottom: 'none' },
                                            '&:hover': {
                                                backgroundColor: detailNavigate ? (theme) => theme.palette.action.hover : 'inherit'
                                            },
                                        }}
                                    >
                                        {title?.filter(col => col.key !== "password")?.map((col, colIndex) => {
                                            const rawValue = getValueByPath(item, col.key);
                                            const isStatusField = col.key.toLowerCase().includes('status');
                                            const cellRawValue = isStatusField ? String(rawValue) : rawValue;

                                            // 2. Định dạng nội dung hiển thị (sử dụng formatValue và truyền cờ isArray)
                                            const displayContent = formatValue(col?.key, cellRawValue, col.isArray);

                                            // 3. Lấy style cho status
                                            const statusStyles = isStatusField ? getStatusStyleMui(cellRawValue) : {};

                                            return (
                                                <TableCell
                                                    key={colIndex}
                                                    onClick={() => detailNavigate && navigate(detailNavigate)}
                                                    sx={{
                                                        cursor: detailNavigate ? "pointer" : "default",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        component="span"
                                                        sx={{
                                                            ...(isStatusField ? {
                                                                padding: '4px 10px',
                                                                borderRadius: '16px',
                                                                fontWeight: 500,
                                                                textTransform: "capitalize",
                                                                ...statusStyles,
                                                                display: 'inline-block',
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
                                                    <EditButton
                                                        onClick={() => handleOpenEdit(item)}
                                                        sx={{ '& svg': { fontSize: '1.1rem' } }}
                                                    >
                                                        <ModeEditOutlineOutlinedIcon />
                                                    </EditButton>
                                                    <DeleteButton
                                                        onClick={() => handleDelete(item?.id)}
                                                        sx={{ '& svg': { fontSize: '1.1rem' } }}
                                                    >
                                                        <DeleteOutlineOutlinedIcon />
                                                    </DeleteButton>
                                                </Row>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })
                        ) : (
                            // Trường hợp không có dữ liệu
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
        </Box >
    );
}