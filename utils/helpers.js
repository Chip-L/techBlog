module.exports = {
  format_date: (date) => {
    const [year, month, day] = date.split("-");
    return `${month}-${day}-${year}`;
  },
};
