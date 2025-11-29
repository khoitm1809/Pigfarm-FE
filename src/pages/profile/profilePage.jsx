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
import { useGetCurrentUserQuery } from "../../store/auth/authAction";

const formatDate = (dateString) => {
    if (!dateString) return "Unavailable";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return "Error date format";
    }
};

const countPublished = (data) => {
    let count = 0;
    const arraysToCount = [
        data?.pigs || [],
        data?.areas || [],
        data?.pig_types || [],
        data?.owners || []
    ];

    arraysToCount.forEach(arr => {
        arr.forEach(item => {
            if (item.publishedAt) {
                count++;
            }
        });
    });

    return count;
};

const countDoingTodos = (owners) => {
    if (!owners) return 0;

    return owners.filter(owner => owner.toDoStatus === "doing" && owner.publishedAt).length;
};

export function ProfilePage() {
    const UID = localStorage.getItem("UID")
    const {
        data: userData,
        isLoading: loadingUser,
        refetch
    } = useGetCurrentUserQuery(
        { UID },
        { refetchOnMountOrArgChange: true }
    );

    const user = userData || {};
    const userName = user.username || "User name";
    const userEmail = user.email || "No email";
    const userRole = user.role?.name || "";
    const joinDate = formatDate(user.createdAt);

    const completedProjects = countPublished(user);
    const doingTasks = countDoingTodos(user.owners);
    const averageRating = "4.8";
    const workingHours = "1,240";

    if (loadingUser) {
        return <Box p={{ xs: 2, lg: 4 }}><Typography>{t("profile.loading")}</Typography></Box>;
    }

    return (
        <Box p={{ xs: 2, lg: 4 }} >
            <Box mb={4}>
                <Typography variant="h4" mb={1}>
                    {t("profile.title")}
                </Typography>
                <Typography color="text.secondary">
                    {t("profile.heading")}
                </Typography>
            </Box>

            <Grid spacing={3} >
                <Grid item xs={12} lg={4} mt={'2rem'}>
                    <Card>
                        <CardContent sx={{ pt: 3 }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar
                                    src="https://github.com/shadcn.png"
                                    sx={{ width: 120, height: 120 }}
                                />
                                <Box textAlign="center" mt={2}>
                                    <Typography variant="h5">{userName}</Typography>
                                    <Typography color="text.secondary">
                                        {userRole}
                                    </Typography>
                                </Box>

                                <Button fullWidth sx={{ mt: 2 }} variant="contained">
                                    {t("profile.avatar")}
                                </Button>
                            </Box>

                            <Box mt={4} display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" gap={1} alignItems="center">
                                    <Mail size={18} />
                                    <Typography color="text.secondary">
                                        {userEmail}
                                    </Typography>
                                </Box>

                                <Box display="flex" gap={1} alignItems="center">
                                    <Phone size={18} />
                                    <Typography color="text.secondary">+84 123 456 789</Typography>
                                </Box>

                                <Box display="flex" gap={1} alignItems="center">
                                    <MapPin size={18} />
                                    <Typography color="text.secondary">
                                        Hanoi, Vietnam
                                    </Typography>
                                </Box>

                                <Box display="flex" gap={1} alignItems="center">
                                    <Calendar size={18} />
                                    <Typography color="text.secondary">
                                        {t("profile.join")} {joinDate}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={8} mt={'2rem'}>
                    <Card>
                        <CardHeader
                            title={<Typography variant="h6">{t("profile.info")}</Typography>}
                        />
                        <CardContent>
                            <Box component="form" display="flex" flexDirection="column" gap={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            label={t("profile.name")}
                                            defaultValue={userName}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                </Grid>

                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    defaultValue={userEmail}
                                    InputLabelProps={{ shrink: true }}
                                    disabled
                                />

                                <TextField
                                    fullWidth
                                    label={t("profile.phone")}
                                    defaultValue="+84 123 456 789"
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    fullWidth
                                    label={t("profile.address")}
                                    defaultValue="Hanoi, Vietnam"
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    fullWidth
                                    label={t("profile.description")}
                                    multiline
                                    rows={4}
                                    defaultValue="I'm the first user using Pig360 for pig farm."
                                    InputLabelProps={{ shrink: true }}
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

                <Grid item xs={12} mt={'2rem'}>
                    <Card>
                        <CardHeader
                            title={<Typography variant="h6">{t("profile.activity")}</Typography>}
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box
                                        p={2}
                                        borderRadius={2}
                                        sx={{ backgroundColor: "#e3f2fd" }}
                                    >
                                        <Typography color="text.secondary">
                                            {t("profile.assigned")}
                                        </Typography>
                                        <Typography variant="h4"></Typography>
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
                                        <Typography variant="h4">{doingTasks}</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Box
                                        p={2}
                                        borderRadius={2}
                                        sx={{ backgroundColor: "#fff9c4" }}
                                    >
                                        <Typography color="text.secondary">
                                            {t("profile.rate")}
                                        </Typography>
                                        <Typography variant="h4">{averageRating}</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Box
                                        p={2}
                                        borderRadius={2}
                                        sx={{ backgroundColor: "#f3e5f5" }}
                                    >
                                        <Typography color="text.secondary">{t("profile.time")}</Typography>
                                        <Typography variant="h4">{workingHours}</Typography>
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
