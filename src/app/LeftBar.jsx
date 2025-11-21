import { useLocation, useNavigate } from "react-router";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Button,
    IconButton,
    Typography,
    Avatar,
} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PhotoCameraFrontOutlinedIcon from '@mui/icons-material/PhotoCameraFrontOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import SoupKitchenOutlinedIcon from '@mui/icons-material/SoupKitchenOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import AreaChartOutlinedIcon from '@mui/icons-material/AreaChartOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/Logout';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import { ROUTES } from "../router/routerConstants";
import { ROLES } from "../utils/rolesConstant";
import { THEME } from "../utils/ThemeConstants";
import { useEffect, useState } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import { LANGUAGE_CODE_EN, LANGUAGE_CODE_VI, LOCAL_STORAGE_NAME, MESSAGE_TYPE } from "../utils/constant";
import { useTranslation } from "react-i18next";
import i18next, { t } from "i18next";
import { useSelector } from "react-redux";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

export default function LeftBar({ open, onClose, drawerWidth, isMobile }) {
    const [langSelect, setlangSelect] = useState(localStorage.getItem(LOCAL_STORAGE_NAME.LANGUAGE))
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const role = localStorage.getItem("role");
    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        localStorage.setItem(LOCAL_STORAGE_NAME.LANGUAGE, lng)
        setlangSelect(lng)
    };
    useEffect(() => {

    }, [role])
    const menuItems = [
        //adm
        { text: "Home", icon: <HomeOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: t("navigation.accList"), icon: <PhotoCameraFrontOutlinedIcon />, path: ROUTES.LIST_ACCOUNT, role: ROLES.ADMIN },
        { text: t("navigation.settings"), icon: <SettingsOutlinedIcon />, path: ROUTES.SETTINGS, role: ROLES.ADMIN },
        // chu trai
        { text: t("navigation.createWorkerAcc"), icon: <GroupAddOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: t("navigation.offSpring"), icon: <AgricultureOutlinedIcon />, path: ROUTES.OFF_SPRING, role: ROLES.OWNER },
        { text: t("navigation.herdBreedManagement"), icon: <AgricultureOutlinedIcon />, path: ROUTES.HERD_BREED_MANAGEMENT, role: ROLES.OWNER },
        { text: t("navigation.foodRation"), icon: <SoupKitchenOutlinedIcon />, path: ROUTES.FOOD_RATION, role: ROLES.OWNER },
        { text: t("navigation.drugUse"), icon: <VaccinesOutlinedIcon />, path: ROUTES.DRUG_USE, role: ROLES.OWNER },
        { text: t("navigation.invoice"), icon: <InventoryOutlinedIcon />, path: ROUTES.INVOICE, role: ROLES.OWNER },
        { text: t("navigation.foodWarehouse"), icon: <WarehouseOutlinedIcon />, path: ROUTES.FOOD_WAREHOUSE, role: ROLES.OWNER },
        { text: t("navigation.meditionWarehouse"), icon: <WarehouseOutlinedIcon />, path: ROUTES.MEDITION_WAREHOUSE, role: ROLES.OWNER },
        { text: t("navigation.toDoList"), icon: <ContactMailOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        // cong nhan
        { text: "Nhập nguồn gốc giống lợn", icon: <UploadFileOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Ghi nhận tốc độ tăng trưởng", icon: <AreaChartOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Nhập vào kho hàng - vắc xin ", icon: <WarehouseOutlinedIcon />, path: ROUTES.MEDITION_WAREHOUSE, role: ROLES.WORKER },
        { text: "Ghi nhận và tính ngày phối giống", icon: <CalendarMonthOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: t("navigation.tasks"), icon: <ChecklistOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },

    ];

    return (
        <Drawer
            variant={isMobile ? "temporary" : "persistent"}
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    background: THEME.MENU_BACKGROUND,
                    boxSizing: "border-box",
                },
            }}
        >
            <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%", cursor: 'pointer' }}>
                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={3}
                    p={2}
                    onClick={() => navigate(ROUTES.PROFILE)}
                    sx={{
                        backgroundColor: "grey.50",
                        borderRadius: 2,
                    }}
                >
                    {/* Avatar */}
                    <Avatar
                        src="https://github.com/shadcn.png"
                        alt="Nguyễn Văn A"
                        sx={{ width: 48, height: 48 }}
                    >
                        NV
                    </Avatar>

                    {/* Info */}
                    <Box flex={1} minWidth={0}>
                        <Typography
                            variant="body1"
                            noWrap
                            sx={{ fontWeight: 500 }}
                        >
                            {user?.username}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                        >
                            {user?.email}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary">
                            {role}
                        </Typography>
                    </Box>
                </Box>


                <Divider sx={{ mb: 2 }} />

                {/* Menu Items */}
                <List sx={{ flexGrow: 1 }}>
                    {menuItems
                        .filter((item) => item.role === role)
                        .map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                    onClick={() =>
                                        navigate({
                                            pathname: item.path,
                                            search: item.search,
                                        })
                                    }
                                >
                                    <ListItemIcon sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>

                <Divider sx={{ my: 2 }} />
                {/* Language switch */}
                <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
                    onClick={() =>
                        changeLanguage(
                            langSelect === LANGUAGE_CODE_EN ? LANGUAGE_CODE_VI : LANGUAGE_CODE_EN
                        )}>
                    <IconButton sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>
                        <LanguageOutlinedIcon />
                    </IconButton>
                    <Typography sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>Tiếng Việt</Typography>
                </Box>
                {/* Logout */}
                <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
                    onClick={() => {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("role");
                        navigate({ pathname: ROUTES.LOGIN });
                    }}
                >
                    <IconButton sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>
                        <LogoutOutlinedIcon />
                    </IconButton>
                    <Typography sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>{t("navigation.logout")}</Typography>
                </Box>
            </Box>
        </Drawer>
    );
}