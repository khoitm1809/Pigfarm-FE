import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTitle } from "../../store/auth/authSlice";

const ListAccount = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle("Danh sách tài khoản"));
    }, [])

    return (
        <BoxContainer padding={'2rem'}>

            <CustomTable
                // title={title}
                // data={data}
                isEdit={true}
            />
        </BoxContainer>
    )
}

export default ListAccount;