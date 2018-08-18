var mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbgear"
});

var connectdb = function() {
  con.connect(function(err) {
    if (!err) {
      console.log("Database is connected ...");
    } else {
      //  console.log(err);
    }
  });
};

// query tất cả danh sách sản phẩm
exports.getproducts = function(callbackQuery) {
  connectdb();
  con.query("SELECT * FROM `products`", function(err, results, fieds) {
    if (!err) {
      // trả về array sản phẩm
      callbackQuery(results);
    } else {
      console.log("ErrorGetProduct" + err);
    }
  });
};

// query tìm sản phẩm theo tên
exports.findProducts = function(name, callbackFind) {
  connectdb();
  var sql = "SELECT * FROM `products` WHERE `name` LIKE '%" + name + "%'";
  con.query(sql, function(err, results, fieds) {
    if (!err) {
      callbackFind(results);
    } else {
      console.log("ErrorFindProduct" + err);
    }
  });
};

// update quatity when user buy
exports.updateQuatity = function(id, quatity, callbackUpdateQuatity) {
  connectdb();

  var sql = "";

  con.query(sql, function(err, results) {
    if (results.affectedRows === 0) {
      callbackUpdateQuatity(0);
    } else {
      callbackUpdateQuatity(results);
    }
  });
};
