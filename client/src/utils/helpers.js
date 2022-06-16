const moment = require("moment");

module.exports = {
  diffForHumans: (date) => {
    const formattedDate = moment(date * 1).format("YYYY/MM/DD HH:mm:ss");
    // const dateArr = formattedDate.split("/");
    // console.log(dateArr);

    return moment(formattedDate).fromNow();
  },
};
