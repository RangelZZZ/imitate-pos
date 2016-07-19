function calculateReceiptProducts(receiptProducts) {
    var saved = 0;
    var total = 0;

    receiptProducts.forEach(function (receiptProduct) {
        saved += receiptProduct.savedTotal;
        total += receiptProduct.subTotal;
    });
    var receipt = ({receiptProducts: receiptProducts, saved: saved, total: total});

    return receipt;
}

exports.calculateReceiptProducts = calculateReceiptProducts;