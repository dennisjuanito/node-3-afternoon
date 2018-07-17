var swag = require("../models/swag.js");

module.exports = {
  search: (req, res, next) => {
    let { query, session } = req;
    let { category } = query;
    console.log(typeof category);
    if (
      category &&
      (category === "hats" ||
        category === "shirts" ||
        category === "jackets" ||
        category === "sweaters" ||
        category === "pants" ||
        category === "shorts")
    ) {
      return res
        .status(200)
        .send(swag.filter(item => item.category === category));
    } else if (!category) {
      return res.status(200).send([...swag]);
    } else {
      return res.status(404).send({ err: "query is invalid!" });
    }
  }
};
