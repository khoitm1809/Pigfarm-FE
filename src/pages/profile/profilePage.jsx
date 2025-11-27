import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { t } from "i18next";

export function ProfilePage() {
    return (
        <Box p={{ xs: 2, lg: 4 }} >
            {/* Title */}
            <Box mb={4}>
                <Typography variant="h4" mb={1}>
                    {t("profile.title")}
                </Typography>
                <Typography color="text.secondary">
                    {t("profile.heading")}
                </Typography>
            </Box>

            <Grid spacing={3} >
                {/* Profile Card */}
                <Grid item xs={12} lg={4} sx={{ marginY: '2rem' }}>
                    <Card>
                        <CardContent sx={{ pt: 3 }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar
                                    src="https://github.com/shadcn.png"
                                    sx={{ width: 120, height: 120 }}
                                />
                                <Box textAlign="center" mt={2}>
                                    <Typography variant="h5">Nguyễn Văn A</Typography>
                                    <Typography color="text.secondary">
                                        {t("profile.role")}
                                    </Typography>
                                </Box>

                                <Button fullWidth sx={{ mt: 2 }} variant="contained">
                                    {t("profile.avatar")}
                                </Button>
                            </Box>

                            {/* Profile Info */}
                            <Box mt={4} display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" gap={1} alignItems="center">
                                    <Mail size={18} />
                                    <Typography color="text.secondary">
                                        nguyenvana@example.com
                                    </Typography>
                                </Box>

                                <Box display="flex" gap={1} alignItems="center">
                                    <Phone size={18} />
                                    <Typography color="text.secondary">+84 123 456 789</Typography>
                                </Box>

                                <Box display="flex" gap={1} alignItems="center">
                                    <MapPin size={18} />
                                    <Typography color="text.secondary">
                                        Hà Nội, Việt Nam
                                    </Typography>
                                </Box>

                                <Box display="flex" gap={1} alignItems="center">
                                    <Calendar size={18} />
                                    <Typography color="text.secondary">
                                        Tham gia: Tháng 1, 2024
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Profile Form */}
                <Grid item xs={12} lg={8} sx={{ marginY: '2rem' }}>
                    <Card>
                        <CardHeader
                            title={<Typography variant="h6">{t("profile.info")}</Typography>}
                        />
                        <CardContent>
                            <Box component="form" display="flex" flexDirection="column" gap={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Họ"
                                            defaultValue="Nguyễn Văn"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth label="Tên" defaultValue="A" />
                                    </Grid>
                                </Grid>

                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    defaultValue="nguyenvana@example.com"
                                />

                                <TextField
                                    fullWidth
                                    label={t("profile.phone")}
                                    defaultValue="+84 123 456 789"
                                />

                                <TextField
                                    fullWidth
                                    label={t("profile.address")}
                                    defaultValue="Hà Nội, Việt Nam"
                                />

                                <TextField
                                    fullWidth
                                    label={t("profile.description")}
                                    multiline
                                    rows={4}
                                    defaultValue="Tôi là một quản trị viên hệ thống với nhiều năm kinh nghiệm trong lĩnh vực công nghệ thông tin."
                                />

                                <Box display="flex" gap={2} pt={2}>
                                    <Button variant="contained" type="submit">
                                        {t("profile.submit")}
                                    </Button>
                                    <Button variant="outlined" type="button">
                                        {t("profile.cancel")}
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Statistics Card */}
                <Grid item xs={12} sx={{ marginY: '2rem' }}>
                    <Card>
                        <CardHeader
                            title={<Typography variant="h6">{t("profile.activity")}</Typography>}
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Box
                                        p={2}
                                        borderRadius={2}
                                        sx={{ backgroundColor: "#e3f2fd" }}
                                    >
                                        <Typography color="text.secondary">
                                            {t("profile.assigned")}
                                        </Typography>
                                        <Typography variant="h4">24</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Box
                                        p={2}
                                        borderRadius={2}
                                        sx={{ backgroundColor: "#e8f5e9" }}
                                    >
                                        <Typography color="text.secondary">
                                            {t("profile.assigning")}
                                        </Typography>
                                        <Typography variant="h4">8</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Box
                                        p={2}
                                        borderRadius={2}
                                        sx={{ backgroundColor: "#fff9c4" }}
                                    >
                                        <Typography color="text.secondary">
                                            {t("profile.rate")}
                                        </Typography>
                                        <Typography variant="h4">4.8</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Box
                                        p={2}
                                        borderRadius={2}
                                        sx={{ backgroundColor: "#f3e5f5" }}
                                    >
                                        <Typography color="text.secondary">{t("profile.time")}</Typography>
                                        <Typography variant="h4">1,240</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
