const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; 

// get all contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("contacts").collection("contacts").find().toArray();

    // set the response content type to JSON and send the result
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

//get a single contact by ID
const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id); // create an ObjectId from the request parameter

  try {
    const result = await mongodb.getDb().db("contacts").collection("contacts").find({ _id: userId });

    // convert the result to an array and send the first item
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

// create a new contact in the database
const createContact = async (req, res) => {
  try {
    // extract contact information from the request body
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb.getDb().db("contacts").collection("contacts").insertOne(contact);

    if (result.acknowledged) {
      res.status(201).json({ message: "Contact created successfully", result });
    } else {
      res.status(500).json({error: result.error});
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

// update an existing contact
const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb.getDb().db("contacts").collection("contacts").replaceOne({ _id: userId }, contact);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("contacts").collection("contacts").deleteOne({ _id: userId }, true);
    if (result.acknowledged) {
      res.status(200).send();
    } else {
      res.status(500).json({error: result.error});
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
