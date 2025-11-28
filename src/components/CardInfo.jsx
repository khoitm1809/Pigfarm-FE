import {
    Card,
    CardContent,
    IconButton,
    Chip,
    Typography,
    Box,
    Tooltip,
    Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "dayjs";
import { useGetListFeedSettingQuery } from "../store/warehouse/feedSettingsAction";
import { SettingsIcon } from "lucide-react";
import { t } from "i18next";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Row } from "./commonStyled";

const CardInfo = ({
    name,
    description,
    nameCount,
    publishedAt,
    arrayCount,
    createBy,
    isOwner,
    onClick,
    isEdit,
    isAssign,
    isDelete,
    onActionAssign,
    onActionEdit,
    onActionDelete,
    feedSetting,
    feedSettingData
}) => {
    const {
        data: listfeedSettings,
    } = useGetListFeedSettingQuery({}, { skip: !feedSetting, refetchOnMountOrArgChange: true })
    return (
        <Card
            onClick={onClick}
            sx={{
                borderRadius: "14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "0.25s ease",
                "&:hover": {
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    transform: "translateY(-2px)",
                },
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
                pb={0}
            >
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ fontSize: "1.05rem" }}
                >
                    {name}
                </Typography>

                {isOwner && <Box>
                    {isAssign && <Tooltip title={t("card.assign")} >
                        <IconButton size="small" onClick={(e) => {
                            e.stopPropagation();
                            onActionAssign?.();
                        }}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>}
                    {isEdit && <Tooltip title={t("card.edit")}>
                        <IconButton size="small" onClick={(e) => {
                            e.stopPropagation();
                            onActionEdit?.();
                        }}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>}
                    {isDelete && <Tooltip title={t("card.delete")}>
                        <IconButton size="small" color="error" onClick={(e) => {
                            e.stopPropagation();
                            onActionDelete?.();
                        }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>}
                </Box>}
                {feedSetting && <Tooltip title={t("card.feed")}>
                    <IconButton size="small" color="primary" onClick={(e) => {
                        e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên Card
                    }}>
                        <SettingsIcon fontSize="small" />
                    </IconButton>
                </Tooltip>}
            </Box>
            <Row gap={'0.4rem'} px={2} pb={0}>
                <Typography
                    variant="body2"
                    sx={{ color: "gray", }}>
                    {createBy}
                </Typography>
            </Row>
            <Divider sx={{ marginTop: '1rem' }} />

            <CardContent>
                <Typography
                    variant="body2"
                    sx={{ color: "gray", minHeight: "40px" }}
                >
                    {description}
                </Typography>
                {feedSetting && <Row gap={'0.4rem'}>
                    <Typography
                        variant="body2"
                        sx={{ color: "gray", minHeight: "20px" }}>
                        Feed Setting:
                    </Typography>
                    {/* {feeedSettingData?.map((item, index) => (
                        <Row sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography>{item?.amountPerDay}</Typography>
                        </Row>
                    ))} */}
                </Row>}
                {publishedAt && (
                    <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", mt: 1, display: "block" }}
                    >
                        {t("card.createdDate")}: {dayjs(publishedAt).format("DD/MM/YYYY")}
                    </Typography>
                )}
                <Box
                    mt={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Chip
                            label={`${nameCount}${arrayCount}`}
                            sx={{
                                bgcolor: "#f2f2f2",
                                fontWeight: 500,
                            }}
                        />
                    </Box>
                    <ChevronRightIcon sx={{ color: "gray" }} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardInfo;
