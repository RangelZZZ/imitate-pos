function calculateReceiptProducts(receiptProducts) {
    var saved = 0;
    var total = 0;

    receiptProducts.forEach(function (receiptProduct) {
        saved += receiptProduct.savedTotal;
        total += receiptProduct.subTotal;
    });
    return {receiptProducts: receiptProducts, saved: saved, total: total};
}

exports.calculateReceiptProducts = calculateReceiptProducts;