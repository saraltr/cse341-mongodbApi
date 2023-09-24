const mongodb = require('../db/connect');
const ObjectId = require("mongodb").ObjectId; 

// get all contacts
const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db("contacts").collection("contacts").find().toArray();

    // set the response content type to JSON and send the result
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
};

//get a single contact by ID
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id); // create an ObjectId from the request parameter

  try {
    const result = await mongodb.getDb().db("contacts").collection("contacts").find({ _id: userId });

    // convert the result to an array and send the first item
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAll, getSingle };
