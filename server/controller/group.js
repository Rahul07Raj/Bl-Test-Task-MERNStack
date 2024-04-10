const Group = require("../models/group");
const User = require('../models/userModels');

exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const ownerId = req.user ? req.user._id : null;
    if (!ownerId) {
      return res.status(401).send({ message: "User not authenticated" });
    }
    const newGroup = new Group({
      name,
      ownerId,
      members: [ownerId, ...members],
    });

    const savedGroup = await newGroup.save();

    res
      .status(200)
      .send({ message: "Group created successfully", group: savedGroup });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating group" });
  }
};

exports.getAllGroup = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//   router.get('/groups/:groupId/members', async (req, res) => {
//     try {
//       const groupId = req.params.groupId;
//       // Find the group by ID and populate the 'members' field to get the member details
//       const group = await Group.findById(groupId).populate('members');
//       if (!group) {
//         return res.status(404).json({ message: 'Group not found' });
//       }
//       res.json(group.members);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
exports.getGroupMembersById = async (req, res) => {
  try {
    const groupId = req.params.id;
    // Find the group by ID and populate the 'members' field to get the member details
    const group = await Group.findById(groupId).populate("members","name");
    console.log(groupId)
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.json(group.members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
