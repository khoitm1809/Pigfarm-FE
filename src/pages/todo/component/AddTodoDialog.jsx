import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";

export const AddTodoDialog = ({ open, handleClose, handleAddTodo, isLoading }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (name.trim()) {
            handleAddTodo({ name: name.trim(), description: description.trim() });
            setName('');
            setDescription('');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{t("todo.create")}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label={t("todo.name")}
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    label={t("todo.description")}
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="black" disabled={isLoading}>
                    {t("todo.cancel")}
                </Button>
                <Button onClick={handleSubmit} sx={{backgroundColor:"black"}} color="primary" variant="contained" disabled={isLoading || !name.trim()}>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : t("todo.create")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
