import { Box, Typography } from "@mui/material";
import { BoxContainer } from "../../components/commonStyled";
import CustomTable from "../../components/CustomTable";
import { useDeleteUserMutation, useEditUserMutation, useGetListRoleQuery, useGetListUserQuery, useUserRegisterMutation } from "../../store/auth/authAction";
import { useSelector } from "react-redux";
import { convertToDropdown } from "../../components/convertToDropdown";

const ListUserPage = () => {
    const [registerUser] = useUserRegisterMutation();
    const [editUser] = useEditUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const { modalType } = useSelector((state) => state.helper);

    const {
        data: listRole,
    } = useGetListRoleQuery({}, { refetchOnMountOrArgChange: true })

    const title = [
        { key: "username", label: "Tên người dùng" },
        { key: "email", label: "Email" },
        { key: "createdAt", label: "Ngày tạo" },
        { key: "password", label: "Mật khẩu" },
    ];
    const titleDialog = [
        { key: "username", label: "Tên người dùng" },
        { key: "email", label: "Email" },
        { key: "password", label: "Mật khẩu", isHiddenInEdit: true }, // Nên ẩn mật khẩu khi Edit
        { key: "role", label: "Role", isDropDown: true, list: convertToDropdown(listRole?.roles), mappingKey: "role.id" },
    ];
    const {
        data: listUser,
        isLoading: loadingListUser,
        refetch
    } = useGetListUserQuery({}, { refetchOnMountOrArgChange: true })
    return (
        <BoxContainer padding={'2rem'}>
            <CustomTable
                title={title}
                data={listUser}
                isEdit={true}
                mutationAddFunction={registerUser}
                mutationEditFunction={editUser}
                mutationDeleteFunction={deleteUser}
                loading={loadingListUser}
                refetch={refetch}
            />
        </BoxContainer>
    )
}

export default ListUserPage;