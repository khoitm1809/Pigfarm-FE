import { useState, useEffect } from 'react';
import { BoxContainer, Column, Row } from "../../components/commonStyled";
import { useAddTodoMutation, useEditTodoMutation, useGetListTodoQuery } from "../../store/todo/todoAction";
import { Button, TextField, Typography, Box, CircularProgress, Alert } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CardTodo from "../../components/CardTodo";
import CardStatus from "../../components/CardStatus";
import { TodoItem } from './component/TodoItem';
import { AddTodoDialog } from './component/AddTodoDialog';
import { ROLES } from '../../utils/rolesConstant';
import { t } from 'i18next';

export const todoStatus = [
    { value: "unAssigned", label: t("todo.unAssigned") },
    { value: "assigned", label: t("todo.assigned") },
    { value: "doing", label: t("todo.doing") },
    { value: "done", label: t("todo.done") },
    { value: "expired", label: t("todo.expired") }
];

const OWNER_COLUMN_STATUS = ['unAssigned', 'assigned', 'doing', 'done', 'expired'];
const OTHER_COLUMN_STATUS = ['assigned', 'doing', 'done', 'expired'];

const TodoPage = () => {
    const UID = localStorage.getItem("UID");
    const role = localStorage.getItem("role");
    const columnsToDisplay = role === ROLES.OWNER ? OWNER_COLUMN_STATUS : OTHER_COLUMN_STATUS;

    const [addTodo, { isLoading: isAddingTodo }] = useAddTodoMutation();
    const [editTodo] = useEditTodoMutation();
    const {
        data: listDoto,
        isLoading: loadingListTodo,
        refetch
    } = useGetListTodoQuery({
        UID: role == ROLES.OWNER ? null : UID
    },
        { refetchOnMountOrArgChange: true }
    );

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [error, setError] = useState(null); 
    const toggleAddDialog = () => setIsAddDialogOpen(!isAddDialogOpen);

    const classifiedTodos = OWNER_COLUMN_STATUS?.reduce((acc, status) => {
        acc[status] = [];
        return acc;
    }, { expired: [] });

    let totalCount = 0;

    if (listDoto?.data) {
        listDoto.data.forEach(todo => {
            const status = todo.toDoStatus;
            if (classifiedTodos.hasOwnProperty(status)) {
                classifiedTodos[status].push(todo);
            } else if (status === 'expired') {
                classifiedTodos.expired.push(todo);
            }
            totalCount++;
        });
    }

    const todoData = [
        { title: t("todo.total"), count: totalCount, iconKey: 'tổng công việc' },
        { title: t("todo.assigned"), count: classifiedTodos.assigned.length, iconKey: 'chưa làm' },
        { title: t("todo.unAssigned"), count: classifiedTodos.unAssigned.length, iconKey: 'chưa giao' },
        { title: t("todo.doing"), count: classifiedTodos.doing.length, iconKey: 'đang làm' },
        { title: t("todo.done"), count: classifiedTodos.done.length, iconKey: 'đã xong' },
        { title: t("todo.expired"), count: classifiedTodos.expired.length, iconKey: 'quá hạn' },
    ];

    const handleAddTodo = async ({ name, description }) => {
        try {
            await addTodo({ name, description, toDoStatus: 'unAssigned', create_by: UID }).unwrap();
            toggleAddDialog();
            refetch();
        } catch (error) {
            console.error('Error while create new task', error);
            setError(t("todo.errorAdd"));
        }
    };

    const handleChangeStatus = async (todoId, newStatus) => {
        setError(null);

        const currentTodo = listDoto?.data.find(todo => todo.documentId === todoId);

        if (currentTodo?.toDoStatus === 'unAssigned' && newStatus !== 'unAssigned') {
            setError(t("unAssignedMsg"));
            return;
        }

        try {
            await editTodo({ id: todoId, toDoStatus: newStatus }).unwrap();
            refetch();
        } catch (error) {
            console.error(`Error while update status ${todoId}:`, error);
            setError(t("todo.errorEdit"));
        }
    };

    const handleAssign = async (todoId, userId) => {
        setError(null); 
        try {
            const newStatus = userId ? 'assigned' : 'unAssigned';
            await editTodo({
                id: todoId,
                users_permissions_user: userId || null,
                toDoStatus: newStatus
            }).unwrap();
            refetch();
        } catch (error) {
            console.error(`Lỗi khi phân công cho todo ${todoId}:`, error);
            setError(t("todo.errorAssign"));
        }
    };


    return (
        <BoxContainer padding={'2rem'}>
            <Box mb={4}>
                <Box sx={{ marginBottom: '2rem' }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{ mb: 1 }}
                    >
                        {t("todo.title")}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary">
                        {t("todo.heading")}
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Row
                    sx={{
                        width: '100%',
                        flexWrap: 'wrap',
                        gap: '0.8rem',
                    }}>
                    {todoData.map((item, index) => (
                        <Box
                            sx={{
                                flex: {
                                    xs: "1 1 100%",
                                    sm: "1 1 calc(50% - 0.8rem)",
                                    md: "1 1 calc(33.33% - 0.8rem)",
                                    lg: "1 1 calc(16.66% - 0.8rem)",
                                },
                            }}
                            key={index}>
                            <CardStatus
                                title={item.title}
                                count={item.count}
                                iconKey={item.iconKey}
                            />
                        </Box>
                    ))}
                </Row>

                <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    gap={2}
                    mb={3}
                    mt={3}
                    sx={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        placeholder={t("customTable.search")}
                        InputProps={{
                            startAdornment: (
                                <SearchOutlinedIcon sx={{ color: "action.active", mr: 1 }} />
                            ),
                            sx: {
                                backgroundColor: "#f2f2f2",
                                borderRadius: "8px",
                                height: "44px",
                                paddingLeft: "8px",
                                border: "none",
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                            },
                        }}
                    />

                    <Button
                        startIcon={<TuneOutlinedIcon />}
                        sx={{
                            color: 'black',
                            background: 'white',
                            height: "44px",
                            minWidth: { xs: "100%", sm: "auto" },
                            textTransform: "none",
                        }}
                    >
                        {t("customTable.filters")}
                    </Button>

                    {role == ROLES.OWNER && <Button
                        variant="contained"
                        startIcon={<AddOutlinedIcon />}
                        onClick={toggleAddDialog}
                        sx={{
                            color: 'white',
                            background: 'black',
                            height: "44px",
                            width: { xs: "100%", sm: "10rem" },
                            textTransform: "none",
                        }}
                    >
                        {t("customTable.create")}
                    </Button>}
                </Box>

                {loadingListTodo ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                        <CircularProgress />
                        <Typography ml={2}>{t("todo.loading")}</Typography>
                    </Box>
                ) : (
                    <Row
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1.2rem",
                            alignItems: "flex-start",
                        }}
                    >
                        {columnsToDisplay.map(statusKey => {
                            const statusLabel = todoStatus.find(s => s.value === statusKey)?.label || statusKey;
                            const totalColumns = columnsToDisplay.length;

                            const percentage = 100 / totalColumns;

                            const calculatedBasis = `calc(${percentage}% - 1.2rem)`;

                            return (
                                <Column
                                    key={statusKey}
                                    sx={{
                                        width: '100%',
                                        flex: '0 0 100%',

                                        '@media (min-width: 1250px)': {
                                            width: calculatedBasis,
                                            flex: `0 0 ${calculatedBasis}`,
                                        },

                                        '@media (min-width: 900px) and (max-width: 1249px)': {
                                            width: '100%',
                                            flex: '0 0 100%',
                                        },

                                        minHeight: '200px',
                                    }}
                                >
                                    <CardTodo name={statusLabel} count={classifiedTodos[statusKey]?.length || 0}>
                                        {classifiedTodos[statusKey]?.map(todo => (
                                            <TodoItem
                                                key={todo.id}
                                                todo={todo}
                                                onChangeStatus={handleChangeStatus}
                                                onAssign={handleAssign}
                                                role={role}
                                            />
                                        ))}
                                    </CardTodo>
                                </Column>
                            );
                        })}
                    </Row>
                )}

            </Box>

            <AddTodoDialog
                open={isAddDialogOpen}
                handleClose={toggleAddDialog}
                handleAddTodo={handleAddTodo}
                isLoading={isAddingTodo}
            />
        </BoxContainer>
    );
}

export default TodoPage;