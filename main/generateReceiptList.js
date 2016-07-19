function generateReceiptList(receipt) {
    var receiptList = '***<没钱赚商店>购物清单***\n'
        + getSubProductText(receipt.receiptProducts) + '\n' +
        '总计：' + receipt.total.toFixed(2) + '(元)\n' +
        '节省：' + receipt.saved.toFixed(2) + '(元)\n' +
        '**********************';

    return receiptList;
}

function getSubProductText(receiptProducts) {
    var productList = '';

    receiptProducts.forEach(function (receiptProduct) {
        var productText = receiptProduct.receiptProduct;

        productList += '名称：' + productText.product.name + '，数量：' + productText.count + productText.product.unit + '，单价：' + productText.product.price.toFixed(2) + '(元)，小计：' + receiptProduct.subTotal.toFixed(2) + '(元)\n';
    });
    var discountProductList = generateDiscountProductList(receiptProducts);
    if (discountProductList === '买二赠一商品：\n') {
        return productList + '----------------------';
    }
    else {
        return productList + '----------------------\n' + discountProductList +
            '----------------------';
    }
}

function generateDiscountProductList(receiptProducts) {
    var discountReceiptList = '买二赠一商品：\n';

    receiptProducts.forEach(function (receiptProduct) {
        var productText = receiptProduct.receiptProduct;
        var discountCount = parseFloat(productText.count / 3);
        var discountSaved = productText.product.price * discountCount;

        if (discountSaved === receiptProduct.savedTotal) {
            discountReceiptList += '名称：' + productText.product.name + "，数量：" + discountCount + productText.product.unit + '\n';
        }
    });

    return discountReceiptList;
}

exports.generateReceiptList = generateReceiptList;


