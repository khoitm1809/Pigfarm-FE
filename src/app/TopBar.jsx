import { useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Tooltip, } from "@mui/material";
import Avatar from '@mui/material/Avatar';
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
import { deepOrange, deepPurple } from '@mui/material/colors';
import { ROLES } from "../utils/rolesConstant";
import { ROUTES } from "../router/routerConstants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { THEME } from "../utils/ThemeConstants";
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import { t } from "i18next";

export default function TopBar({
    onMenuClick
}) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    useEffect(() => {

    }, [role])
    const menuItems = [
        // chu trai
        { text: t("navigation.home"), icon: <HomeOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: t("navigation.accList"), icon: <GroupAddOutlinedIcon />, path: ROUTES.LIST_USER, role: ROLES.OWNER },
        { text: t("navigation.area"), icon: <GroupAddOutlinedIcon />, path: ROUTES.AREA, role: ROLES.OWNER },
        { text: t("navigation.pigType"), icon: <AgricultureOutlinedIcon />, path: ROUTES.PIG_TYPE, role: ROLES.OWNER },
        { text: t("navigation.warehouse"), icon: <WarehouseOutlinedIcon />, path: ROUTES.WAREHOUSE_CATEGORY, role: ROLES.OWNER },
        { text: t("navigation.todoList"), icon: <ContactMailOutlinedIcon />, path: ROUTES.TODO, role: ROLES.OWNER },
        // cong nhan
        { text: t("navigation.home"), icon: <HomeOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: t("navigation.myBarn"), icon: <GroupAddOutlinedIcon />, path: ROUTES.BARN, role: ROLES.WORKER },
        { text: t("navigation.growthRecord"), icon: <AreaChartOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: t("navigation.warehouseImport"), icon: <WarehouseOutlinedIcon />, path: ROUTES.WAREHOUSE_CATEGORY, role: ROLES.WORKER },
        { text: t("navigation.tasks"), icon: <ChecklistOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
    ];

    return (
        <AppBar
            position="fixed"
            sx={(theme) => ({
                background: THEME.MENU_BACKGROUND,
                [theme.breakpoints.up(1080)]: {
                    display: "none"
                }
            })}
        >
            <Toolbar sx={{ color: 'black' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                    <Avatar sx={{ bgcolor: deepOrange[500] }}>H</Avatar>

                    <Box sx={{ cursor: 'pointer' }} onClick={onMenuClick}>
                        <DensityMediumOutlinedIcon />
                    </Box>

                </Box>
            </Toolbar>
        </AppBar>
    );
}
