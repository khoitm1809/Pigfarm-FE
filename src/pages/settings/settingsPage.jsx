import { useDispatch } from "react-redux";
import { BoxContainer } from "../../components/commonStyled";
import { useEffect } from "react";
import { setTitle } from "../../store/auth/authSlice";

const Settings = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setTitle("Settings"));
    },[])
   
    return (
        <BoxContainer>
            Setting page
        </BoxContainer>
    )
}

export default Settings;