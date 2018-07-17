var swag = require("../models/swag.js");

module.exports = {
  add: (req, res, next) => {
    let { query, session } = req;
    let { cart } = session.user;
    if (!query.id) {
      // do nothing
    } else {
      // no id query
      let index = cart.findIndex(item => item.id === +query.id);
      if (index != -1) {
        // do nothing
      } else {
        // cannot find the id
        let indexToFindInSwag = swag.findIndex(item => item.id === +query.id);

        if (indexToFindInSwag != -1) {
            cart.push(swag[indexToFindInSwag]);
            session.user.total += swag[indexToFindInSwag].price;
        } else {
            return res.status(404).send({error: "the item does not exists"});
        }
      }
    }
    return res.status(200).send(session.user);
  },
  delete: (req, res, next) => {
    let { query, session } = req;
    let { id } = query;
    let { cart } = session.user;

    if (!id) {
      // do nothing
    } else {
      // no id query
      let indexSwap = cart.findIndex(item => item.id === +id);
      let swagToDelete = swag.find(item => item.id === +id);
      console.log(swagToDelete);
      if (indexSwap != -1) {
        cart.splice(indexSwap, 1);
        session.user.total -= swagToDelete.price;
      } else {
        // no id matches in the cart
        return res.status(404).send({error: "the item does not exits!"});
      }
    }
    return res.status(200).send(session.user);
  },
  checkout: (req, res, next) => {
    let { user } = req.session;
    user.cart = [];
    user.total = 0;
    return res.status(200).send(user);
  }
};
