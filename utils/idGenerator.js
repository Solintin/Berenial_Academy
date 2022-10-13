const {MongooseAutoIncrementID} = require("mongoose-auto-increment-reworked");
const mongoose  = require("mongoose");

const idGenerator = (model, schema) => {
  MongooseAutoIncrementID.initialise("IdCounters");
  schema.plugin(MongooseAutoIncrementID.plugin, {
    modelName: model, // collection or table name in which you want to apply auto increment
    field: "_id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
  });
};

module.exports = idGenerator;
