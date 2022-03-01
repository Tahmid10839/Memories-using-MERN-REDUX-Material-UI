export const sortData = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
}