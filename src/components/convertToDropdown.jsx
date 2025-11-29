export const convertToDropdown = (list) => {
    if (!list || !Array.isArray(list)) {
        return [];
    }

    return list?.map((item) => ({
        value: String(item?.id),
        label: item?.name || item?.pigCode,
    }));
};