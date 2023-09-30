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

const createContact = async (req, res, next) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = mongodb.getDb();
    const result = await db.collection("contacts").insertOne(contact);

    if (result.acknowledged) {
      res.status(201).json({ message: "Contact created successfully" });
    } else {
      throw new Error("Contact creation failed");
    }
  } catch (error) {
    console.error("Error creating contact:", error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = mongodb.getDb();
    const result = await mongodb.getDb().db("contacts").collection("contacts").replaceOne({ _id: userId }, contact);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};


module.exports = { getAll, getSingle, createContact, updateContact };
