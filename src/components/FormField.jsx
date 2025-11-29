import * as React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TextFieldCustom } from './commonStyled';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

const FormField = React.memo(({ field, value, onChange, disabled }) => {
    const displayValue = value === null || value === undefined ? "" : value; 

    return (
        <Grid item xs={12} sm={field.key === "note" ? 12 : 6}>
            {field?.isDropDown || field?.isStatus ? (
                <FormControl fullWidth sx={{ minWidth: "200px" }}>
                    <InputLabel id={`${field.key}-label`}>{field.label}</InputLabel>
                    <Select
                        labelId={`${field.key}-label`}
                        id={field.key}
                        value={displayValue} 
                        onChange={(e) => onChange(field.key, e.target.value)}
                        label={field?.label}
                    >
                        {field?.list?.map((item, index) => (
                            <MenuItem value={item?.value} key={index}>
                                {item?.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            ) : field?.isDateTime ? (
                <DateTimePicker
                    sx={{ background: "#e8e7e7ff" }}
                    label={field.label}
                    value={value ? dayjs(value) : null}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                    }}
                    onChange={(newValue) => onChange(field.key, newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                    disabled={disabled}
                />

            ) : (
                <TextFieldCustom
                    fullWidth
                    label={field?.label} 
                    placeholder={field?.label}
                    variant="outlined"
                    type={field.isNumber ? "number" : "text"} 
                    value={displayValue}
                    onChange={(e) => onChange(field.key, e.target.value)} 
                    multiline={field.key === "note"}
                    rows={field.key === "note" ? 3 : 1}
                    InputProps={{ inputProps: field.isNumber ? { min: 0 } : {} }} 
                    disabled={disabled}
                />
            )}
        </Grid>
    );
});

export default FormField;