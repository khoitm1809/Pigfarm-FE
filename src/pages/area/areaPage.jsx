import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { BoxContainer, Row } from "../../components/commonStyled";
import { useNavigate } from "react-router";
import { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CardInfo from "../../components/CardInfo";
import { useAddAreaMutation, useDeleteAreaMutation, useEditAreaMutation, useGetListAreaQuery } from "../../store/area/areaAction";
import { ROUTES } from "../../router/routerConstants";
import { ROLES } from "../../utils/rolesConstant";
import { MESSAGE_TYPE } from "../../utils/constant";
import { useConfirmDialog } from "../../components/confirmDialog";
import { t } from "i18next";

const AreaPage = () => {
    const role = localStorage.getItem("role");
    const UID = localStorage.getItem("UID");
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editingArea, setEditingArea] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [addArea] = useAddAreaMutation();
    const [editArea] = useEditAreaMutation();
    const [deleteArea] = useDeleteAreaMutation();
    const { openDialog } = useConfirmDialog()
    const {
        data: listArea,
        isLoading: loadingArea,
        refetch
    } = useGetListAreaQuery({}, { refetchOnMountOrArgChange: true })

    const toggleAddDialog = () => setOpenAddDialog(prev => !prev);

    const handleOpenEditDialog = (area) => {
        setEditingArea(area);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditingArea(null);
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const description = formData.get('description');

        try {
            await addArea({ name, description, users_permissions_user: UID }).unwrap();

            toggleAddDialog();
            refetch();
        } catch (error) {
            console.error("Error while create");
            const errorMessage = error.data?.message || error.error || "Không thể thêm khu vực. Vui lòng thử lại.";
            openDialog({
                type: MESSAGE_TYPE.ERROR,
                message: `Error while create: ${errorMessage}`,
                isShowCloseBtn: true,
                isHideAction: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if (!editingArea) return;

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const description = formData.get('description');

        const updateData = {
            name,
            description
        };

        try {
            await editArea({
                id: editingArea.documentId,
                updateData
            }).unwrap();

            handleCloseEditDialog();
            refetch();
        } catch (error) {
            const errorMessage = error.data?.message || error.error || "Cannot use this area, please try again";
            openDialog({
                type: MESSAGE_TYPE.ERROR,
                message: `You have to delete ${barnCount} that can be deleted area`,
                isShowCloseBtn: true,
                isHideAction: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (areaId) => {
        const areaToDelete = listArea?.data?.find(area => area.documentId === areaId);
        const barnCount = areaToDelete?.barns?.length || 0;

        if (barnCount > 0) {
            openDialog({
                type: MESSAGE_TYPE.WARNING,
                // Hiển thị số lượng chuồng cần xóa
                message: "Error while delete",
                isShowCloseBtn: true,
                isHideAction: true,
                customSecondText: t("area.confirm")
            });
        } else {
            try {
                await deleteArea(areaId).unwrap();
                refetch();
            } catch (error) {
                openDialog({
                    type: MESSAGE_TYPE.ERROR,
                    message: `Error while delete`,
                    isShowCloseBtn: true,
                    isHideAction: true,
                });
            }
        }
    };

    const filteredArea = listArea?.data?.filter(area =>
        area?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <BoxContainer padding={'2rem'}>
            <Box mb={4}>
                {/* Tiêu đề trang */}
                <Box sx={{ marginBottom: '2rem' }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{ mb: 1 }}
                    >
                        {t("area.title")}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        {t("area.heading")}
                    </Typography>
                </Box>

                {/* Thanh tìm kiếm, lọc và nút thêm mới */}
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
                                border: "none",
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
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
                            "&:hover": {
                                borderColor: "#999",
                                backgroundColor: "#f7f7f7",
                            },
                        }}
                    >
                        {t("customTable.filters")}
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddOutlinedIcon />}
                        onClick={toggleAddDialog}
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

                {/* Danh sách thẻ khu vực */}
                <Row sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: '2rem',
                }}>
                    {filteredArea.map((area, index) => (
                        <Box key={area?.id || index}
                            sx={{
                                flex: {
                                    xs: "1 1 100%",
                                    sm: "0 0 calc(50% - 1rem)",
                                },
                            }}
                            onClick={() => navigate(ROUTES.BARN, { state: area?.id })}>
                            <CardInfo
                                name={area?.name}
                                description={area?.description}
                                publishedAt={area?.publishedAt}
                                arrayCount={area?.barns?.length}
                                isOwner={role === ROLES.OWNER}
                                createBy={`Create by ${area?.users_permissions_user?.username}`}
                                nameCount={t("area.barnQuantity")}
                                isEdit={true}
                                isAssign={false}
                                isDelete={true}
                                onActionEdit={() => {
                                    handleOpenEditDialog(area);
                                }}
                                onActionDelete={() => {
                                    handleDelete(area.documentId);
                                }}
                            />
                        </Box>
                    ))}
                    {!loadingArea && filteredArea.length === 0 && (
                        <Typography sx={{ p: 2, color: 'text.secondary' }}>{t("area.none")}</Typography>
                    )}
                </Row>

                {/* Dialog Thêm mới */}
                <Dialog
                    fullWidth
                    open={openAddDialog}
                    onClose={toggleAddDialog}
                    PaperProps={{
                        sx: {
                            borderRadius: "12px",
                            paddingTop: "4px"
                        }
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            pb: 1.5,
                        }}
                    >
                        {t("area.create")}
                    </DialogTitle>

                    <form onSubmit={handleSubmitAdd}>
                        <DialogContent
                            dividers
                            sx={{
                                border: "none",
                                pt: 2,
                                pb: 1,
                                "& .MuiDialogContent-root": {
                                    border: "none",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder={t("area.nameField")}
                                name="name"
                                required
                                disabled={isSubmitting}
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "8px",
                                        height: "44px",
                                        paddingLeft: "10px",

                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },

                                        "& input": { fontSize: "0.95rem" },
                                    },
                                    "& .MuiInputBase-input::placeholder": { color: "#999" },
                                }}
                            />

                            <TextField
                                fullWidth
                                placeholder={t("area.descField")}
                                name="description"
                                required
                                multiline
                                rows={3}
                                disabled={isSubmitting}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "8px",

                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },

                                        "& textarea": { fontSize: "0.95rem" },
                                    },
                                    "& .MuiInputBase-input::placeholder": { color: "#999" },
                                }}
                            />
                        </DialogContent>

                        <DialogActions sx={{ p: 2 }}>
                            <Button
                                onClick={toggleAddDialog}
                                sx={{
                                    textTransform: "none",
                                    color: "#444",
                                    borderRadius: "8px",
                                    px: 2,
                                    "&:hover": { backgroundColor: "#eee" }
                                }}
                                disabled={isSubmitting}
                            >
                                {t("area.cancel")}
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    px: 3,
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t("area.creating") : t("area.addForm")}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                {/* Dialog Chỉnh sửa */}
                <Dialog
                    fullWidth
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    PaperProps={{
                        sx: {
                            borderRadius: "12px",
                            paddingTop: "4px"
                        }
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            pb: 1.5,
                        }}
                    >
                        {t("area.edit")} {editingArea?.name}
                    </DialogTitle>

                    {editingArea && (
                        <form onSubmit={handleSubmitEdit}>
                            <DialogContent
                                dividers
                                sx={{
                                    border: "none",
                                    pt: 2,
                                    pb: 1,
                                    "& .MuiDialogContent-root": {
                                        border: "none",
                                    },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder={t("nameField")}
                                    name="name"
                                    required
                                    defaultValue={editingArea?.name || ''}
                                    disabled={isSubmitting}
                                    sx={{
                                        mb: 2,
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: "8px",
                                            height: "44px",
                                            paddingLeft: "10px",
                                            "& fieldset": { border: "none" },
                                            "&:hover fieldset": { border: "none" },
                                            "&.Mui-focused fieldset": { border: "none" },
                                            "& input": { fontSize: "0.95rem" },
                                        },
                                        "& .MuiInputBase-input::placeholder": { color: "#999" },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    placeholder={t("area.descField")}
                                    name="description"
                                    required
                                    multiline
                                    rows={3}
                                    defaultValue={editingArea?.description || ''}
                                    disabled={isSubmitting}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: "8px",
                                            "& fieldset": { border: "none" },
                                            "&:hover fieldset": { border: "none" },
                                            "&.Mui-focused fieldset": { border: "none" },
                                            "& textarea": { fontSize: "0.95rem" },
                                        },
                                        "& .MuiInputBase-input::placeholder": { color: "#999" },
                                    }}
                                />
                            </DialogContent>

                            <DialogActions sx={{ p: 2 }}>
                                <Button
                                    onClick={handleCloseEditDialog}
                                    sx={{
                                        textTransform: "none",
                                        color: "#444",
                                        borderRadius: "8px",
                                        px: 2,
                                        "&:hover": { backgroundColor: "#eee" }
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {t("area.cancel")}
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        px: 3,
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? t("area.saving") : t("area.save")}
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Dialog>

            </Box>
        </BoxContainer>
    )
}

export default AreaPage;