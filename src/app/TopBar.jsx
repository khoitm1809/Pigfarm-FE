export default function TopBar({
    isLeftBarOpen = true,
    drawerWidth,
    isMobile
}) {
    const navigate = useNavigate();
    // const { role } = useSelector((state) => state?.auth);
    const role = useSelector((state) => state);
    const menuItems = [
        //adm
        { text: "Home", icon: null, path: ROUTES.HOME, role: ROLES.ADMIN },
        { text: "Quản lý tài khoản", icon: null, path: ROUTES.LIST_ACCOUNT, role: ROLES.ADMIN },
        { text: "Quản lý gói dịch vụ", icon: null, path: ROUTES.SERVICE_PACKAGES, role: ROLES.ADMIN },
        { text: "Settings", icon: null, path: ROUTES.SETTINGS, role: ROLES.ADMIN },
        // chu trai
        { text: "Tạo tài khoản cho nhân công", icon: null, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Quản lý giống và đàn lợn", icon: null, path: ROUTES.OFF_SPRING, role: ROLES.OWNER },
        { text: "Quản lý khu và chuồng nuôi", icon: null, path: ROUTES.HERD_BREED_MANAGEMENT, role: ROLES.OWNER },
        { text: "Thiết lập thức ăn và dinh dưỡng", icon: null, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Quản lý hóa đơn nhập hàng", icon: null, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Quản lý  kho hàng hóa", icon: null, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Giao việc cho công nhân", icon: null, path: ROUTES.HOME, role: ROLES.OWNER },
        { text: "Mua gói dịch vụ", icon: null, path: ROUTES.HOME, role: ROLES.OWNER },
        // cong nhan
        { text: "Nhập nguồn gốc giống lợn", icon: null, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Ghi nhận tốc độ tăng trưởng", icon: null, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Nhập thông tin sức khỏe toàn truồng và từng cá thể lợn", icon: null, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Nhập vào kho hàng, vacxin, ", icon: null, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Theo giõi chu kì động dục của lợn, ", icon: null, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "Ghi nhận và tính ngày phối giống", icon: null, path: ROUTES.HOME, role: ROLES.WORKER },
        { text: "To do list các việc mà chủ trang trại giao", icon: null, path: ROUTES.HOME, role: ROLES.WORKER },
        // Đăng xuất
        // { text: "Đăng xuất", icon: null, path: ROUTES.LOGIN },
    ];

    return (
        <AppBar
            position="fixed"
            sx={(theme) => ({
                background: THEME.MENU_BACKGROUND,
                zIndex: theme.zIndex.drawer + 1,
                transition: "margin 0.3s ease, width 0.3s ease",

                // Default: Adjust width if left bar open
                marginLeft: isLeftBarOpen ? `${drawerWidth}px` : 0,
                width: isLeftBarOpen
                    ? `calc(100% - ${drawerWidth}px)`
                    : "100%",

                // On small screens (<=1260px): Always full width
                [theme.breakpoints.up(1080)]: {
                    // marginLeft: 0,
                    // width: "100%",
                    display: 'none'
                },
                [theme.breakpoints.down(1080)]: {
                    marginLeft: 0,
                    width: "100%",
                },
            })}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>H</Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '0.4rem' }}>
                        {/* <Typography variant="10500">
                            Welcome
                        </Typography> */}
                        <Typography variant="12500">
                            {"Huy Phan"}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="row" alignItems="center">
                    {isMobile &&
                        menuItems
                            // .filter((item) => item?.role == role)
                            .map((item) => (
                                <Box
                                    key={item.text}
                                    onClick={() => {
                                        navigate({
                                            pathname: item.path,
                                            search: item.search,
                                        });
                                    }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        gap: '0.4rem',
                                    }}
                                >
                                    <IconButton sx={{ ml: 1, color: THEME.SECONDARY_TEXT_BUTTON }}>
                                        {item.icon}
                                    </IconButton>
                                    <Typography variant="12400" sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>{item.text}</Typography>
                                </Box>
                            ))}

                    {/* Đăng xuất luôn hiển thị, bất kể isMobile */}
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
                        }}
                    >
                        <IconButton sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>
                            {/* Có thể thay icon logout */}
                        </IconButton>
                        <Typography variant="12400" sx={{ color: THEME.SECONDARY_TEXT_BUTTON }}>Đăng xuất</Typography>
                    </Box>

                </Box>
            </Toolbar>
        </AppBar >
    );
}