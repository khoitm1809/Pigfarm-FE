import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { BoxBeetwen, CloseButton, CloseIcon, MainButton } from './commonStyled';
import { closeModal } from '../store/helper/helperSlice';
import dayjs from 'dayjs';
import FormField from './FormField';

const getNestedValue = (obj, path) => {
    if (!obj || typeof obj !== 'object' || !path) return null;
    
    const parts = path.split('.');
    let current = obj;
    
    for (const part of parts) {
        if (current && current[part] !== undefined) {
            current = current[part];
        } else {
            return null;
        }
    }
    
    return current;
};

const transformDataForEdit = (selectedData, dialogTitle) => {
    if (!selectedData) return {};

    // Khởi tạo form data bằng dữ liệu gốc
    const transformedData = {};
    
    dialogTitle.forEach(field => {
        const fieldKey = field.key;
        let fieldValue = selectedData[fieldKey]; // Giá trị gốc

        if (field.mappingKey) {
            // Trường có mappingKey (ví dụ: barn.id)
            fieldValue = getNestedValue(selectedData, field.mappingKey);
        } else if (typeof fieldValue === 'object' && fieldValue !== null && (fieldValue.documentId || fieldValue.id)) {
            // Trường quan hệ không có mappingKey (ví dụ: pig_type, users_permissions_user)
            fieldValue = fieldValue.id; // Lấy ID số nguyên của quan hệ
        }

        // Đặt giá trị vào transformedData
        if (fieldValue !== undefined) {
            transformedData[fieldKey] = fieldValue;
        }
        
        if (field.isDisable && transformedData[fieldKey] === undefined && field.defaultValue !== undefined) {
            transformedData[fieldKey] = field.defaultValue;
        }
    });

    Object.keys(transformedData).forEach(key => {
        const field = dialogTitle.find(f => f.key === key);
        if (field?.isDateTime && transformedData[key]) {
            transformedData[key] = dayjs(transformedData[key]);
        }
    });

    delete transformedData.documentId;
    delete transformedData.createdAt;
    delete transformedData.updatedAt;
    delete transformedData.publishedAt;
    delete transformedData.id;

    return transformedData;
};


const transformPayload = (formData, dialogTitle) => {
    return Object.keys(formData).reduce((acc, key) => {
        const value = formData[key];
        const fieldConfig = dialogTitle.find(f => f.key === key);
        
        if (key === 'id') {
            return acc;
        }
        let finalValue;

        if (dayjs.isDayjs(value)) {
            // 1. Xử lý Date/Time: Chuyển sang ISO string
            finalValue = value.toISOString();
        } else if (fieldConfig?.isNumber) {
            // 2. Xử lý Number:
            const numValue = Number(value);
            // Giá trị rỗng hoặc NaN -> null
            if (value === "" || value === null || isNaN(numValue)) {
                finalValue = null; 
            } else {
                finalValue = numValue;
            }
        } else if (value === "" || value === null) {
            // 3. Xử lý String/Dropdown: Nếu là chuỗi rỗng hoặc null -> null
            finalValue = null;
        } else {
            // 4. Giữ nguyên các giá trị khác
            finalValue = value;
        }

        //Chỉ thêm vào payload nếu giá trị không phải là null
        if (finalValue !== null) {
            acc[key] = finalValue;
        }
        
        return acc;
    }, {});
};

export default function EditDataDialog({
    dialogTitle,
    mutationEditFunction,
    refetch
}) {
    const dispatch = useDispatch();
    const { isOpen, selectedData } = useSelector((state) => state.helper);

    const [formData, setFormData] = React.useState({});

    React.useEffect(() => {
        if (isOpen && selectedData) {
            const prefilledData = transformDataForEdit(selectedData, dialogTitle);
            
            setFormData(prefilledData);
        }
    }, [isOpen, selectedData, dialogTitle]); 

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            const finalPayloadData = transformPayload(formData, dialogTitle);

            const finalPayload = {
                id: selectedData?.documentId,
                ...finalPayloadData
            };

            // 3. THỰC HIỆN CHỈNH SỬA
            await mutationEditFunction(finalPayload).unwrap();

            refetch();
            dispatch(closeModal());
        } catch (error) {
            console.error("Save (Edit) error:", error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={() => dispatch(closeModal())} maxWidth="md" fullWidth>
            <DialogTitle>
                <BoxBeetwen>
                    <Typography fontWeight="bold">Cập nhật</Typography>
                    <CloseButton onClick={() => dispatch(closeModal())}><CloseIcon /></CloseButton>
                </BoxBeetwen>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {dialogTitle
                        ?.filter(field => !field.isHiddenInEdit) 
                        .map((field) => (
                        <FormField
                            key={field.key}
                            field={field}
                            disabled={field.isDisable}
                            value={formData[field.key]} 
                            onChange={handleChange}
                        />
                    ))}
                </Grid>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                <MainButton onClick={handleSave} variant="contained">Lưu</MainButton>
            </DialogActions>
        </Dialog>
    );
}