function filterData(data, id) {
  console.log('filterData', data);
  return data.find((user) => user.id === parseInt(id));
}

export default filterData;
