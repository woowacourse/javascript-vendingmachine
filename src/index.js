"use strict";
exports.__esModule = true;
var ProductManageImpl_1 = require("./ts/tab/ProductManageImpl");
var ChargeMoney_1 = require("./ts/tab/ChargeMoney");
require("./css/index.css");
new ProductManageImpl_1["default"]().addEvent();
new ChargeMoney_1["default"]().addEvent();
