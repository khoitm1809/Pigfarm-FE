import styled from '@emotion/styled';
import { Box, Button, Checkbox, FormControlLabel, InputAdornment, Link, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { THEME } from '../utils/ThemeConstants';
import { ROUTES } from '../router/routerConstants';
import { useUserLoginMutation, useLazyGetUserRoleQuery } from '../store/auth/authAction';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import { useForm } from 'react-hook-form';
import { useConfirmDialog } from "../components/confirmDialog";
import { LANGUAGE_CODE_EN, LANGUAGE_CODE_VI, LOCAL_STORAGE_NAME, MESSAGE_TYPE } from "../utils/constant";
import { useTranslation } from "react-i18next";
import i18next, { t } from "i18next";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { setUser } from "../store/auth/authSlice";

const ChildBox = styled(Box)(({ theme }) => ({
    height: '100vh',
}));

function LoginPage() {
    const [langSelect, setlangSelect] = useState(localStorage.getItem(LOCAL_STORAGE_NAME.LANGUAGE))
    const { t } = useTranslation();
    const location = useLocation();
    const dispatch = useDispatch();
    const [loginUser] = useUserLoginMutation();
    const isMobile = useMediaQuery('(max-width:1080px)')
    const navigate = useNavigate()
    const [getUserRole] = useLazyGetUserRoleQuery();
    const { openDialog } = useConfirmDialog();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            identifier: "",
            password: "",
        },
    });


    const onSubmit = async (data) => {
        try {
            const res = await loginUser(data).unwrap();
            localStorage.setItem(LOCAL_STORAGE_NAME.TOKEN, res.jwt);
            localStorage.setItem("UID", res.user.id);
            localStorage.setItem("username", res.user.username);

            const roleRes = await getUserRole().unwrap();
            localStorage.setItem("role", roleRes?.role?.type);
            dispatch(setUser(res.user));
            
            navigate(ROUTES.HOME);
        } catch (err) {
            openDialog({
                type: MESSAGE_TYPE.ERROR,
                message: "Error Login",
                customMainText: t("login.errorLogin"),
                isShowCloseBtn: true,
                isHideAction: true,
                customSecondText: t("login.confirmLogin")
            });
        }
    };

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
                        {t("login.login")}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ marginTop: "0.5rem" }}
                    >
                        {t("login.notice")}
                    </Typography>
                </Box>

                {/* FORM */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "70%" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {/* EMAIL */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography variant="body2" >
                                Username/Email
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="admin@example.com"
                                {...register("identifier", { required: t("emailRequired") })}
                                error={!!errors.identifier}
                                helperText={errors.identifier?.message}
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
                                {t("login.passWord")}
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="••••••••"
                                type="password"
                                {...register("password", { required: t("login.passWordReq") })}
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
                                        {t("login.remember")}
                                    </Typography>
                                }
                            />

                            <Link
                                underline="hover"
                                sx={{ color: "#2563eb", cursor: "pointer" }}
                            >
                                {t("login.forgotPassword")}
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
                            {isSubmitting ? t("login.loggingIn") : t("login.login")}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default LoginPage