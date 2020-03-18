const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update
  // remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(schemeId) {
  return db("steps as st")
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .select(
      "st.step_number as ID",
      "sc.scheme_name as Scheme",
      "st.id as Step",

      "st.instructions as Instructions"
    )
    .where("st.scheme_id", schemeId)
    .orderBy("st.id");
}

function add(schemeData) {
  return db("schemes")
    .insert(schemeData)
    .then(([id]) => {
      return findById(id);
    });
}

function update(id, changes) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
