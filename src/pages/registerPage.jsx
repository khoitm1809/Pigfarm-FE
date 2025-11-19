import styled from "@emotion/styled";
import { Box, Button, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../router/routerConstants";
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import { useUserRegisterMutation } from "../store/auth/authAction";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const ChildBox = styled(Box)(({ theme }) => ({
    height: '100vh',
}));

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [registerUser] = useUserRegisterMutation();
    const isMobile = useMediaQuery('(max-width:1080px')
    const navigate = useNavigate()
    const handleShowPassword = () => setShowPassword(!showPassword);


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await registerUser(data).unwrap();
            navigate(ROUTES.LOGIN, { state: { registered: true } });
        } catch (err) {
            console.error("Register failed:", err);
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            register();
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#dde0ffff",
                p: 2,
            }}>
            <Paper
                elevation={4}
                sx={{
                    width: "50%",
                    maxWidth: 500,
                    p: 4,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    background: "#FFFFF",
                }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.2rem' }}>
                    <LanguageOutlinedIcon />
                    <Typography>Tiếng Việt</Typography>
                </Box>
                {/* Icon circle */}
                <Box
                    sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        backgroundColor: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <LockOutlinedIcon sx={{ color: "#fff", width: 32, height: 32 }} />
                </Box>

                {/* Title */}
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" fontWeight={700}>
                        Đăng nhập
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ marginTop: "0.5rem" }}
                    >
                        Nhập thông tin để truy cập hệ thống
                    </Typography>
                </Box>

                {/* FORM */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "70%" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {/* EMAIL */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography variant="body2" >
                                Email
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="admin@example.com"
                                {...register("identifier", { required: "Vui lòng nhập email" })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon sx={{ color: "gray" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    input: { color: "black" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "black" },
                                        "&:hover fieldset": { borderColor: "#black" },
                                        "&.Mui-focused fieldset": { borderColor: "#black" },
                                    },
                                }}
                            />
                        </Box>

                        {/* PASSWORD */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography variant="body2" color="black">
                                Mật khẩu
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="••••••••"
                                type="password"
                                {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon sx={{ color: "gray" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    input: { color: "black" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "black" },
                                        "&:hover fieldset": { borderColor: "black" },
                                        "&.Mui-focused fieldset": { borderColor: "black" },
                                    },
                                }}
                            />
                        </Box>

                        {/* REMEMBER + FORGOT */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <FormControlLabel
                                control={<Checkbox sx={{ color: "black" }} />}
                                label={
                                    <Typography variant="body2" color="black">
                                        Ghi nhớ đăng nhập
                                    </Typography>
                                }
                            />

                            <Link
                                underline="hover"
                                sx={{ color: "#2563eb", cursor: "pointer" }}
                            >
                                Quên mật khẩu?
                            </Link>
                        </Box>

                        {/* BUTTON */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmitting}
                            sx={{ mt: 2 }}
                        >
                            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default RegisterPage
