process.chdir(__dirname);
var sails;
var rc;
try {
  sails = require("sails");
  rc = require("sails/accessible/rc");
} catch (err) {
  console.error(err.stack);
  return;
} //-•

// Start server
sails.lift(rc("sails"));
