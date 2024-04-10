const Group = require("../models/group");
const Expense = require("../models/expense")
exports.createExpense = async (req, res) => {
  try {
    const { description, amount, groupId } = req.body; 
    const userId = req.user ? req.user._id : null; 

    if (!userId) {
      return res.status(401).send({ message: "User not authenticated" });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(400).send({ message: "Invalid group" });
    }

    if (!group.members.includes(userId)) {
      return res
        .status(403)
        .send({ message: "Unauthorized to add expense to this group" });
    }

    const newExpense = new Expense({
      description,
      amount,
      groupId,
      createdBy: userId,
    });

    const savedExpense = await newExpense.save();

    res
      .status(200)
      .send({ message: "Expense created successfully", expense: savedExpense });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating expense" });
  }
};
