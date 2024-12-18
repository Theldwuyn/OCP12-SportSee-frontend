function filterData(data, id) {
  return data.find((user) => user.id === parseInt(id));
}

export default filterData;
