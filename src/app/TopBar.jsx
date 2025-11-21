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

export default function TopBar({
    onMenuClick
}) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
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
        { text: t("navigation.growthRecord"), icon: <AreaChartOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Nhập vào kho hàng - vắc xin ", icon: <WarehouseOutlinedIcon />, path: ROUTES.MEDITION_WAREHOUSE, role: ROLES.WORKER },
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
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center',  }}>

                    <Avatar sx={{ bgcolor: deepOrange[500] }}>H</Avatar>

                    <Box sx={{ cursor: 'pointer' }} onClick={onMenuClick}>
                        <DensityMediumOutlinedIcon />
                    </Box>

                </Box>
            </Toolbar>
        </AppBar>
    );
}
