import styled from "@emotion/styled";
import { Box, IconButton, InputAdornment, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../router/routerConstants";
import { THEME } from "../utils/ThemeConstants";
import { Column, MainButton, Row, TextFieldStyle } from "../components/commonStyled";
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import { useUserRegisterMutation } from "../store/auth/authAction";
import { useForm } from "react-hook-form";

const ChildBox = styled(Box)(({ theme }) => ({
    height: '100vh',
}));

function RegisterPage() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
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
                        <Typography variant='18700' color={THEME.SECONDARY_TEXT_BUTTON}>Đăng ký tài khoản</Typography>
                    </Box>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "50%" }}>
                        <Column sx={{ gap: '1rem' }}>
                            <TextFieldStyle
                                placeholder='Họ và tên'
                                {...register("name",
                                    { required: "Vui lòng nhập họ và tên" })}
                                error={!!errors.name}
                            />
                            {errors.name && <Typography variant="10400" color="red">{errors.name.message}</Typography>}
                            <TextFieldStyle placeholder='Tên đăng nhập'
                                {...register("email",
                                    { required: "Vui lòng nhập tên đăng nhập" })}
                                error={!!errors.email}
                            />
                            {errors.email && <Typography variant="10400" color="red">{errors.email.message}</Typography>}
                            <TextFieldStyle placeholder='Mật khẩu'
                                type={showPassword ? 'text' : 'password'}
                                {...register("password",
                                    { required: "Vui lòng nhập mật khẩu" })}
                                error={!!errors.password}
                                onKeyDown={handleEnter}
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
                            {errors.password && <Typography variant="10400" color="red">{errors.password.message}</Typography>}
                            {/* <TextFieldStyle placeholder='Xác nhận mật khẩu' type='password' value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                            <Row sx={{ gap: '0.5rem', justifyContent: 'flex-end' }}>
                                <Typography variant='12400' color={THEME.SECONDARY_TEXT_BUTTON}>Đã có tài khoản?</Typography>
                                <Typography
                                    variant='12400'
                                    sx={{ color: THEME.SECONDARY_TEXT_BUTTON, cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Typography>
                            </Row>

                        </Column>
                        <MainButton sx={{ width: "100%", marginTop: "2rem" }} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
                        </MainButton>
                    </form>
                </Column>
            </ChildBox>
        </Row>
    )
}

export default RegisterPage
