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
        { text: "Home", icon: <HomeOutlinedIcon />, path: ROUTES.HOME, role: ROLES.ADMIN },
        { text: "Quản lý tài khoản", icon: <PhotoCameraFrontOutlinedIcon />, path: ROUTES.LIST_ACCOUNT, role: ROLES.ADMIN },
        { text: "Settings", icon: <SettingsOutlinedIcon />, path: ROUTES.SETTINGS, role: ROLES.ADMIN },
        // chu trai
        { text: "Home", icon: <HomeOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Tạo tài khoản cho nhân công", icon: <GroupAddOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Quản lý giống và đàn lợn", icon: <AgricultureOutlinedIcon />, path: ROUTES.OFF_SPRING, role: ROLES.OWNER },
        { text: "Quản lý khu và chuồng nuôi", icon: <AgricultureOutlinedIcon />, path: ROUTES.HERD_BREED_MANAGEMENT, role: ROLES.OWNER },
        { text: "Thiết lập thức ăn và dinh dưỡng", icon: <SoupKitchenOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Thiết lập sử dụng thuốc", icon: <VaccinesOutlinedIcon />, path: ROUTES.DRUG_USE, role: ROLES.OWNER },
        { text: "Quản lý hóa đơn nhập hàng", icon: <InventoryOutlinedIcon />, path: ROUTES.INVOICE, role: ROLES.OWNER },
        { text: "Quản lý  kho hàng hóa", icon: <WarehouseOutlinedIcon />, path: ROUTES.FOOD_WAREHOUSE, role: ROLES.OWNER },
        { text: "Nhập vào kho thuốc ", icon: <WarehouseOutlinedIcon />, path: ROUTES.MEDITION_WAREHOUSE, role: ROLES.OWNER },
        { text: "Giao việc cho công nhân", icon: <ContactMailOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        // cong nhan
        { text: "Home", icon: <HomeOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Nhập nguồn gốc giống lợn", icon: <UploadFileOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Ghi nhận tốc độ tăng trưởng", icon: <AreaChartOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Nhập thông tin sức khỏe toàn truồng và từng cá thể lợn", icon: <FeedOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Theo giõi chu kì động dục của lợn, ", icon: <PreviewOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Ghi nhận và tính ngày phối giống", icon: <CalendarMonthOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "To do list các việc mà chủ trang trại giao", icon: <ChecklistOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
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
