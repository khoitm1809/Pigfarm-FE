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
import i18next from "i18next";

export default function LeftBar({ open, onClose, drawerWidth }) {
    const [langSelect, setlangSelect] = useState(localStorage.getItem(LOCAL_STORAGE_NAME.LANGUAGE))
    const navigate = useNavigate();
    const location = useLocation();
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
        { text: "Quản lý tài khoản", icon: <PhotoCameraFrontOutlinedIcon />, path: ROUTES.LIST_ACCOUNT, role: ROLES.ADMIN },
        { text: "Settings", icon: <SettingsOutlinedIcon />, path: ROUTES.SETTINGS, role: ROLES.ADMIN },
        // chu trai
        { text: "Tạo tài khoản cho nhân công", icon: <GroupAddOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Quản lý giống và đàn lợn", icon: <AgricultureOutlinedIcon />, path: ROUTES.OFF_SPRING, role: ROLES.OWNER },
        { text: "Quản lý khu và chuồng nuôi", icon: <AgricultureOutlinedIcon />, path: ROUTES.HERD_BREED_MANAGEMENT, role: ROLES.OWNER },
        { text: "Thiết lập thức ăn và dinh dưỡng", icon: <SoupKitchenOutlinedIcon />, path: ROUTES.FOOD_RATION, role: ROLES.OWNER },
        { text: "Thiết lập sử dụng thuốc", icon: <VaccinesOutlinedIcon />, path: ROUTES.DRUG_USE, role: ROLES.OWNER },
        { text: "Quản lý hóa đơn nhập hàng", icon: <InventoryOutlinedIcon />, path: ROUTES.INVOICE, role: ROLES.OWNER },
        { text: "Quản lý  kho hàng hóa", icon: <WarehouseOutlinedIcon />, path: ROUTES.FOOD_WAREHOUSE, role: ROLES.OWNER },
        { text: "Quản lý kho thuốc ", icon: <WarehouseOutlinedIcon />, path: ROUTES.MEDITION_WAREHOUSE, role: ROLES.OWNER },
        { text: "Giao việc cho công nhân", icon: <ContactMailOutlinedIcon />, path: ROUTES.HOME, role: ROLES.OWNER },
        // cong nhan
        { text: "Ghi nhận tốc độ tăng trưởng", icon: <AreaChartOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Nhập thông tin sức khỏe toàn truồng và từng cá thể lợn", icon: <FeedOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Quản lý kho thuốc ", icon: <WarehouseOutlinedIcon />, path: ROUTES.MEDITION_WAREHOUSE, role: ROLES.WORKER },
        { text: "To do list các việc mà chủ trang trại giao", icon: <ChecklistOutlinedIcon />, path: ROUTES.HOME, role: ROLES.WORKER },

    ];

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={(theme) => ({
                width: drawerWidth,
                flexShrink: 0,

                // ✅ Hide drawer on smaller screens (<1200px)
                [theme.breakpoints.down(1080)]: {
                    display: "none",
                },
                "& .MuiDivider-root": {
                    borderBottomWidth: 0,
                },
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: THEME.MENU_BACKGROUND,
                    borderRight: "none"
                },
            })}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ padding: '2rem', flexGrow: 1 }}>
                    {/* <Box sx={{ borderBottom: '1px solid #FFFFFF1A' }}>
                    <img
                        onClick={() => { navigate(ROUTES.HOME) }}
                        src={null}
                        style={{
                            minWidth: '23.2rem',
                            minHeight: '3.9rem',
                            padding: '0rem 0rem 1.6rem 1.2rem',
                            cursor: 'pointer'
                        }} />
                </Box> */}
                    <List>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                gap: '0.4rem',
                                cursor: 'pointer',
                                padding: '8px 16px'
                            }}
                            onClick={() => {
                                changeLanguage(langSelect == LANGUAGE_CODE_EN
                                    ? LANGUAGE_CODE_VI : LANGUAGE_CODE_EN)
                            }}>
                            <TranslateIcon />
                            <Typography>{langSelect == LANGUAGE_CODE_EN ? "Tiếng Anh" : "Tiếng Việt"}</Typography>
                        </Box>
                        {menuItems
                            .filter((item) => item?.role === role)
                            .map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <ListItem key={item.text} disablePadding>
                                        <ListItemButton
                                            onClick={() => navigate(item.path)}
                                            sx={{
                                                backgroundColor: isActive ? THEME.ACTIVE_MENU_BG : "transparent",
                                                borderRadius: "12px",
                                                "& .MuiListItemText-root, & .MuiListItemIcon-root": {
                                                    color: isActive ? THEME.MAIN_TEXT_BUTTON : THEME.SECONDARY_TEXT_BUTTON,
                                                },
                                                "&:hover": {
                                                    backgroundColor: isActive ? THEME.SECONDARY_TEXT_BUTTON : "rgba(0,0,0,0.04)"
                                                }
                                            }}>
                                            <ListItemIcon sx={{
                                                color: THEME.SECONDARY_TEXT_BUTTON
                                            }}>{item.icon}</ListItemIcon>
                                            <ListItemText sx={{
                                                color: THEME.SECONDARY_TEXT_BUTTON
                                            }} primary={item.text} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                    </List>
                </Box>
                <Box
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate({ pathname: ROUTES.LOGIN });
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        gap: '0.4rem',
                        paddingBottom: "2rem",
                        paddingLeft: "3rem"
                    }}
                >
                    <IconButton sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>
                        <LogoutOutlinedIcon />
                    </IconButton>
                    <Typography variant="12400" sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>Đăng xuất</Typography>
                </Box>
            </Box>
            <Divider />
        </Drawer>
    );
}