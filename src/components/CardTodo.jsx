import {
    Card,
    CardContent,
    Typography,
    Box,
    useTheme
} from "@mui/material";
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Column, Row } from "./commonStyled";

export const TodoIcons = {
    'tổng công việc': EventNoteOutlinedIcon,
    'chưa làm': PendingActionsOutlinedIcon,
    'chưa giao': AssignmentLateOutlinedIcon,
    'đang làm': AccessTimeOutlinedIcon,
    'đã xong': CheckCircleOutlineOutlinedIcon,
    'quá hạn': ErrorOutlineOutlinedIcon,
};

const CardTodo = ({
    name,
    count,
    children 
}) => {
    const iconKey = name.toLowerCase().replace(/ /g, '');
    const IconComponent = TodoIcons[iconKey] || EventNoteOutlinedIcon;

    return (
        <Column sx={{ gap: '1rem' }}>
            <Card
                sx={{
                    width: '100%',
                    borderRadius: "14px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    transition: "0.25s ease",
                    "&:hover": {
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                        transform: "translateY(-2px)",
                    },
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '7rem',
                    maxHeight: '7rem',
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: '50%',
                            bgcolor: '#f2f2f2',
                            color: '#333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <IconComponent sx={{ fontSize: 24 }} />
                    </Box>

                    <Typography color="black" fontWeight={600} variant="h6">
                        {name}
                    </Typography>
                </Box>

                <Typography variant="h5" fontWeight={700} color="text.primary">
                    {count.toLocaleString()}
                </Typography>
            </Card >

            <Column
                gap={1.5}
                sx={{
                    width: '100%',
                    minHeight: '200px', 
                    maxHeight: 'calc(100vh - 400px)',
                    overflowY: 'auto',
                    paddingRight: '4px',
                }}
            >
                {children}
            </Column>
        </Column>
    );
};

export default CardTodo;

<Row
    sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1.2rem",

        "@media (max-width: 1000px)": {
            flexDirection: "column",
            alignItems: "stretch",
        },
    }}
>
    <Column sx={{
        width: '23%',
        "@media (max-width: 1000px)": {
            width: '100%'
        },
    }}>
        <CardTodo name={"Chưa giao"} count={123} />
    </Column>
</Row>