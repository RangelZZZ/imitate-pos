var theNeedData = require("../spec/fixture.js");
var pos = require("./buildCartProducts.js");
var pos1 = require("./calculateCartProducts.js");
var pos2 = require("./calculateReceiptProducts.js");
var pos3 = require("./generateReceiptList.js");

function printReceiptList(barcodes) {
    var allProducts =  theNeedData.loadAllProducts();
    var cartProducts = pos.buildCartProducts(barcodes, allProducts);

    var promotions = theNeedData.loadPromotinProducts();
    var receiptProducts = pos1.calculateCartProducts(promotions, cartProducts);

    var receipt = pos2.calculateReceiptProducts(receiptProducts);
    var receiptList = pos3.generateReceiptList(receipt);

    console.log(receiptList);
}

exports.printReceiptList = printReceiptList;