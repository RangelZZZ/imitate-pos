function calculateCartProducts(promotions, cartProducts) {
    var receiptProducts = [];

    cartProducts.forEach(function (cartProduct) {
        var promotionType = getPromotionType(promotions, cartProduct);
        receiptProducts = calculate(cartProduct ,promotionType,receiptProducts);
    });

    return receiptProducts;
}

function calculate(cartProduct, promotionType,receiptProducts) {
    var subTotal = cartProduct.product.price * cartProduct.count;
    var savedTotal = 0;

    if (promotionType.length === 2) {
        savedTotal = cartProduct.product.price * parseInt(cartProduct.count / 3);
        subTotal -= savedTotal;
    }
    if (promotionType.length === 1) {
        if (promotionType[0] === 'BUY_TWO_GET_ONE_FREE') {
            savedTotal = cartProduct.product.price * parseInt(cartProduct.count / 3);
            subTotal -= savedTotal;
        }
        else if (promotionType[0] === 'FIVE_PERCENT_DISCOUNT') {
            savedTotal = subTotal * 0.05;
            subTotal -= savedTotal;

        }
    }
    if (promotionType.length === 0) {
        subTotal = cartProduct.product.price * cartProduct.count;
        savedTotal = 0;
    }

    receiptProducts.push({receiptProduct: cartProduct, savedTotal: savedTotal, subTotal: subTotal});

    return receiptProducts;
}

function getPromotionType(promotions, cartProduct) {
    var promotionType = [];

    for (var i = 0; i < promotions.length; i++) {
        var promotionBarcodes = promotions[i].barcodes;

        if (findExistBarcode(cartProduct, promotionBarcodes)) {
            promotionType.push(promotions[i].type)
        }
    } 

    return promotionType;
}

function findExistBarcode(cartProduct, promotionBarcodes) {
    for (var i = 0; i < promotionBarcodes.length; i++) {
        if (cartProduct.product.barcode === promotionBarcodes[i]) {

            return true;
        }
    }

    return false;
}

exports.calculateCartProducts = calculateCartProducts;