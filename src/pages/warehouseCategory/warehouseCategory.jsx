import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography, CircularProgress, DialogTitle } from "@mui/material";
import { BoxContainer, Row } from "../../components/commonStyled";
import { useNavigate } from "react-router";
import { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CardInfo from "../../components/CardInfo";
import { useAddWarehouseCategoryMutation, useDeleteWarehouseCategoryMutation, useEditWarehouseCategoryMutation, useGetListWarehouseCategoryQuery } from "../../store/warehouse/warehouseAction";
import { ROUTES } from "../../router/routerConstants";
import { ROLES } from "../../utils/rolesConstant";
import { MESSAGE_TYPE } from "../../utils/constant";
import { useConfirmDialog } from "../../components/confirmDialog";
import { t } from "i18next";

const WareHouseCategory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    const { openDialog } = useConfirmDialog();

    const [addWareHouseCategory, { isLoading: isAdding }] = useAddWarehouseCategoryMutation();
    const [editWareHouseCategory, { isLoading: isEditing }] = useEditWarehouseCategoryMutation();
    const [deleteWareHouseCategory, { isLoading: isDeleting }] = useDeleteWarehouseCategoryMutation();

    const {
        data: listWareHouseCategory,
        isLoading: loadingListWareHouseCategory,
        refetch,
    } = useGetListWarehouseCategoryQuery({}, { refetchOnMountOrArgChange: true });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenAdd = () => {
        setFormData({ name: '', description: '' }); 
        setEditingId(null); 
        setOpenAddDialog(true);
    };

    const handleOpenEdit = (item) => {
        setFormData({
            name: item.name,
            description: item.description
        });
        setEditingId(item.documentId);
        setOpenAddDialog(true);
    };

    const toggleAddDialog = () => {
        setOpenAddDialog(prev => !prev);
        if (openAddDialog) {
            setFormData({ name: '', description: '' });
            setEditingId(null);
        }
    }

    const handleDelete = async (category) => {
        const itemArray = category?.warehouse_items || [];
        const itemCount = itemArray.length;

        if (itemCount > 0) {
            openDialog({
                type: MESSAGE_TYPE.WARNING,
                message: `The category has ${itemCount} goods. You have to delete goods before delete category.`,
                isShowCloseBtn: true,
                isHideAction: true,
            });
            return; 
        }

        openDialog({
            type: MESSAGE_TYPE.CONFIRM,
            message: `Are you sure to delete category?`,
            actionConfirm: async () => {
                try {
                    await deleteWareHouseCategory(category?.documentId).unwrap();
                    refetch();
                } catch (error) {
                    console.error("Error when delete category");
                    openDialog({
                        type: MESSAGE_TYPE.ERROR,
                        message: `Error when delete category`,
                        isShowCloseBtn: true,
                        isHideAction: true,
                    });
                }
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description) return;

        try {
            if (editingId) {
                await editWareHouseCategory({
                    id: editingId,
                    ...formData
                }).unwrap();
            } else {
                await addWareHouseCategory(formData).unwrap();
            }
            refetch();

            setOpenAddDialog(false);
            setFormData({ name: '', description: '' });
            setEditingId(null);

        } catch (error) {
            console.error("Error while saving:", error);

            openDialog({
                type: MESSAGE_TYPE.ERROR,
                message: `Error while saving:`,
                isShowCloseBtn: true,
                isHideAction: true,
            });
        }
    };

    const filteredCategories = listWareHouseCategory?.data?.filter(category =>
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <BoxContainer padding={'2rem'}>
            <Box mb={4}>
                <Box sx={{ marginBottom: '2rem' }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{ mb: 1 }}
                    >
                        {t("warehouseCate.title")}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        {t("warehouseCate.heading")}
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

                    {role == ROLES.OWNER && <Button
                        variant="contained"
                        startIcon={<AddOutlinedIcon />}
                        onClick={handleOpenAdd}
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
                    </Button>}
                </Box>

                <Row sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    justifyContent: 'flex-start'
                }}>
                    {loadingListWareHouseCategory ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
                            <CircularProgress size={30} />
                            <Typography color="text.secondary" sx={{ ml: 2 }}>{t("warehouseCate.loading")}</Typography>
                        </Box>
                    ) : filteredCategories.length === 0 ? (
                        <Typography color="text.secondary" sx={{ p: 2, width: '100%' }}>{t("warehouseCate.none")}</Typography>
                    ) : (
                        filteredCategories.map((category, index) => (
                            <Box key={category?.id || index}
                                sx={{
                                    flex: {
                                        xs: "1 1 100%",
                                        sm: "0 0 calc(50% - 1rem)",
                                    },
                                }}
                                onClick={() => navigate(ROUTES.WAREHOUSE_ITEM, { state: category?.id })}>
                                <CardInfo
                                    name={category?.name}
                                    description={category?.description}
                                    publishedAt={category?.publishedAt}
                                    nameCount={"Items: "}
                                    arrayCount={category?.warehouse_items?.length}
                                    isOwner={role == ROLES.OWNER}
                                    isEdit={true}
                                    isDelete={true}
                                    onActionEdit={() => {
                                        handleOpenEdit(category);
                                    }}
                                    onActionDelete={() => {
                                        handleDelete(category);
                                    }}
                                />
                            </Box>
                        ))
                    )}
                </Row>

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
                        {editingId ? t("warehouseCate.edit") : t("warehouseCate.dialog")}
                    </DialogTitle>

                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers sx={{ border: "none", pt: 2, pb: 1, "& .MuiDialogContent-root": { border: "none" } }}>
                            <TextField
                                fullWidth
                                label={t("warehouseCate.category")}
                                placeholder={t("warehouseCate.nameField")}
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={isAdding || isEditing}
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "8px",
                                        height: "44px",
                                        "& fieldset": { border: "none" }
                                    }
                                }}
                            />

                            <TextField
                                fullWidth
                                label={t("warehouseCate.description")}
                                placeholder={t("warehouseCate.descField")}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                multiline
                                rows={3}
                                disabled={isAdding || isEditing}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "8px",
                                        "& fieldset": { border: "none" }
                                    }
                                }}
                            />
                        </DialogContent>

                        <DialogActions sx={{ p: 2 }}>
                            <Button
                                onClick={toggleAddDialog}
                                disabled={isAdding || isEditing}
                                sx={{ textTransform: "none", color: "#444", borderRadius: "8px", px: 2, "&:hover": { backgroundColor: "#eee" } }}
                            >
                                {t("warehouseCate.cancel")}
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isAdding || isEditing}
                                sx={{ textTransform: "none", borderRadius: "8px", px: 3, backgroundColor: "black" }}
                            >
                                {editingId
                                    ? (isEditing ? <CircularProgress size={20} color="inherit" /> : t("warehouseCate.save"))
                                    : (isAdding ? <CircularProgress size={20} color="inherit" /> : t("warehouseCate.addForm"))
                                }
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box >
        </BoxContainer >
    )
}

export default WareHouseCategory;