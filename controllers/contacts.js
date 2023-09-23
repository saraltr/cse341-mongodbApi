const { getDb } = require("../db/connect");
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res, next) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find({}).toArray();
    res.json(contacts);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getContacts
};
