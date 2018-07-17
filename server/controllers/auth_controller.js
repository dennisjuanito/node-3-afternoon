const users = require("../models/users.js");
var id = 1;


module.exports = {
    login: (req, res, next) => {
        let {username, password} = req.body;
        let index = users.findIndex(((user) => user.username && user.password));
        if (index != -1) {
            req.session.user.username = username;
            return res.status(200).send(req.session.user);
        } else {
            return res.status(500).send("you are not allowed to enter this site!");
        }
    }
    ,
    register: (req, res, next) => {
        let {username, password} = req.body;
        users.push({id, username, password});
        req.session.user.username = username;
        // req.session.user.password = password;
        id++;
        return res.status(200).send(req.session.user);
    }
    ,
    signout: (req, res, next) => {
        req.session.destroy();
        return res.send(req.session);
    }
    ,
    getUser: (req, res, next) => {
        let {user} = req.session;
        return res.status(200).send(user);
    }


    


}

