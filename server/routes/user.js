// Endpoints focused on Users.
const router = require('express').Router();

const {
    signInUser,
    addNewUser,
    getUserInfo,
    addFriend,                          // in construction.
    reply,                              // in construction.
    getAllUniqueNames,
    getAllUsers
} = require('../handlers/users');

// User endpoints.
router.post("/user/signIn", signInUser);
router.post("/user/new", addNewUser);
router.post("/user/info", getUserInfo);
router.put("/user/add", addFriend);
router.put("/user/reply", reply);
router.get("/user/names", getAllUniqueNames);
router.get("/users", getAllUsers);

module.exports = router;