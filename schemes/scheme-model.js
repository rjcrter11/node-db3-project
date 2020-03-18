const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(schemeId) {
  return db("schemes")
    .where({ id: schemeId })
    .first();
}

function findSteps(schemeId) {
  return db("steps as st")
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .select(
      "st.step_number as Step",
      "sc.scheme_name as Scheme",
      "st.instructions as Instructions",
      "st.id "
    )
    .where("st.scheme_id", schemeId)
    .orderBy("st.step_number");
}

function add(schemeData) {
  return db("schemes")
    .insert(schemeData, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function addStep(stepData, schemeId) {
  return (
    db("steps as st")
      .join("schemes as s", "st.scheme_id", "=", "s.id")

      // .select(
      //   "st.step_number as Step",
      //   "sc.scheme_name as Scheme",
      //   "st.instructions as Instructions",
      //   "st.id ",
      //   "st.scheme_id"
      // )
      .where("st.scheme_id", schemeId)
      .insert(stepData)
  );
  //.then(([id]) => findById(id));
}

function update(id, changes) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}
