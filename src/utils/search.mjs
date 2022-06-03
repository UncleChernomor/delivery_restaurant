function filterData(arr, str) {
    return arr.filter((item) => item.title.toLowerCase().includes(str.toLowerCase()));
}

export default filterData;