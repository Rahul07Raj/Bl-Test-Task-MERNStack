const express = require("express");
const {createGroup, getAllGroup, getGroupMembersById} = require("../controller/group");
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route("/create-group").post(authenticate,createGroup);
router.route("/all").get(getAllGroup);
router.route("/:id").get(getGroupMembersById);

module.exports = router;
