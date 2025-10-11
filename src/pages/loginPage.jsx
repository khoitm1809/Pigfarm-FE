import styled from '@emotion/styled';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Column, MainButton, Row, TextFieldStyle } from '../components/commonStyled';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { THEME } from '../utils/ThemeConstants';
import { ROUTES } from '../router/routerConstants';
import { useUserLoginMutation } from '../store/auth/authAction';

const ChildBox = styled(Box)(({ theme }) => ({
    height: '100vh',
}));

function LoginPage() {
    const location = useLocation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginUser] = useUserLoginMutation();
    const isMobile = useMediaQuery('(max-width:1080px')
    const navigate = useNavigate()
    const registered = location.state?.registered;
    const dispatch = useDispatch();
    const login = () => {
        loginUser({ email, password })
            .unwrap()
            .then((res) => {
                // Lưu token nếu cần
                localStorage.setItem("token", res.token);

                // Navigate về Home
                navigate(ROUTES.HOME);

                // Tạm thời set role cứng (vì API chưa trả role)
                // if (res.user?.email === "admin@gmail.com") {
                //     dispatch(setRole(ROLES.ADMIN));
                // } else {
                //     dispatch(setRole(ROLES.USER));
                // }
            })
            .catch((err) => {
                console.error("Login failed:", err);
            });
    };



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
                        <Typography variant='18700' color={THEME.SECONDARY_TEXT_BUTTON}>{registered ? "Đăng ký thành công! Vui lòng đăng nhập." : "Welcome Back!"}</Typography>
                    </Box>
                    <Column sx={{ width: '50%', gap: '1rem' }}>
                        <TextFieldStyle placeholder='Tên đăng nhập' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextFieldStyle placeholder='Mật khẩu' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Row sx={{ gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <Typography variant='12400' color={THEME.SECONDARY_TEXT_BUTTON}>Chưa có tài khoản?</Typography>
                            <Typography
                                variant='12400'
                                sx={{ color: THEME.SECONDARY_TEXT_BUTTON, cursor: 'pointer' }}
                                onClick={() => navigate(ROUTES.REGISTER)}>Đăng ký</Typography>
                        </Row>
                    </Column>
                    <MainButton
                        sx={{ width: '40%' }}
                        onClick={() => login()}
                        >Đăng nhập</MainButton>
                </Column>
            </ChildBox>
        </Row>
    )
}

export default LoginPage