export const filterData = (data, query) => {
    if (!query) {
        return data;
    }

    return data.filter(item => {
        return Object.values(item).some(value =>
            String(value).toLowerCase().includes(query.toLowerCase())
        );
    });
};

