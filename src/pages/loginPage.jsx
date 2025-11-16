import styled from '@emotion/styled';
import { Box, IconButton, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { Column, MainButton, Row, TextFieldStyle } from '../components/commonStyled';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { THEME } from '../utils/ThemeConstants';
import { ROUTES } from '../router/routerConstants';
import { useUserLoginMutation } from '../store/auth/authAction';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import { useForm } from 'react-hook-form';
import { useConfirmDialog } from "../components/confirmDialog";
import { LANGUAGE_CODE_EN, LANGUAGE_CODE_VI, LOCAL_STORAGE_NAME, MESSAGE_TYPE } from "../utils/constant";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import TranslateIcon from "@mui/icons-material/Translate";

const ChildBox = styled(Box)(({ theme }) => ({
    height: '100vh',
}));

function LoginPage() {
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [loginUser] = useUserLoginMutation();
    const isMobile = useMediaQuery('(max-width:1080px')
    const navigate = useNavigate()
    const registered = location.state?.registered;
    const handleShowPassword = () => setShowPassword(!showPassword);
    const { openDialog } = useConfirmDialog();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });


    const onSubmit = async (data) => {
        try {
            const res = await loginUser(data).unwrap();
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", res.user.role);
            navigate(ROUTES.HOME);
        } catch (err) {
            openDialog({
                type: MESSAGE_TYPE.ERROR,
                message: "Lỗi đăng nhập",
                customMainText: "Lỗi đăng nhập",
                isShowCloseBtn: true,
                isHideAction: true,
                customSecondText: "Xác nhận"
            });
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    }

    return (
        <Row>
            <ChildBox sx={{ background: THEME.MENU_BACKGROUND, display: isMobile ? 'none' : 'block', width: '50%' }}>
                <Column sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', gap: '2rem' }}>
                    <Typography variant='18800' color={THEME.MAIN_TEXT_BUTTON}>Pig Farm</Typography>
                    {/* <img src={pigFarm} style={{ width: '90%', borderRadius: '1.2rem' }} alt="Pig farm" /> */}
                </Column>
            </ChildBox>
            <ChildBox sx={{ width: isMobile ? "100%" : "50%" }}>
                <Column sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', gap: '4rem' }}>
                    <Box>
                        <Typography variant='18700' color={THEME.SECONDARY_TEXT_BUTTON}>{registered ? t("login.registerSuccess") : t("login.welcomeBack")}</Typography>
                    </Box>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "50%" }}>
                        <Column sx={{ gap: '1rem' }}>
                            <TextFieldStyle placeholder='Tên đăng nhập'
                                {...register("email",
                                    { required: "Vui lòng nhập tên đăng nhập" })}
                                error={!!errors.email} />
                            {errors.email && (
                                <Typography variant="10400" color="red">
                                    {errors.email.message}
                                </Typography>
                            )}
                            <TextFieldStyle
                                placeholder='Mật khẩu'
                                type={showPassword ? 'text' : 'password'}
                                {...register("password",
                                    { required: "Vui lòng nhập mật khẩu" })}
                                error={!!errors.password}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: '10px' }
                                }} />
                                {errors.password && (
                                <Typography variant="10400" color="red">
                                    {errors.password.message}
                                </Typography>
                            )}
                            <Row sx={{ gap: '0.5rem', justifyContent: 'flex-end' }}>
                                <Typography variant='12400' color={THEME.SECONDARY_TEXT_BUTTON}>Chưa có tài khoản?</Typography>
                                <Typography
                                    variant='12400'
                                    sx={{ color: THEME.SECONDARY_TEXT_BUTTON, cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => navigate(ROUTES.REGISTER)}>Đăng ký</Typography>
                            </Row>
                        </Column>
                    <MainButton sx={{ width: "100%", marginTop: "2rem" }} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                        </MainButton>
                        </form>
                </Column>
            </ChildBox>
        </Row>
    )
}

export default LoginPage