import { useLocation } from "react-router";
import { Box, Typography } from '@mui/material';

export default function DetailPage() {
    const location = useLocation();
    const item = location.state.item;
    console.log(item, '???')

    return (
        <Box>
            <Typography>
                {item?.name}
            </Typography>
        </Box>
    );
}
