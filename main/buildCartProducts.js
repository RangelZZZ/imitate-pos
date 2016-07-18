function buildCartProducts(barcodes, allProducts) {
    var cartProducts = [];

    barcodes.forEach(function (barcode) {
        var product = barcode.split('-');
        var existProduct = findExist(product[0], allProducts);
        var productCount = (product[1] || 1);
        var cartProduct = findExistProduct(product[0], cartProducts);

        if (cartProduct) {
            cartProduct.count++;
        }
        else {
            cartProducts.push({product: existProduct, count: parseInt(productCount)});
        }
    });

    return cartProducts;
}


function findExist(barcode, allProducts) {
    for (var i = 0; i < allProducts.length; i++) {
        if (barcode === allProducts[i].barcode) {

            return allProducts[i];
        }
    }
}

function findExistProduct(barcode, cartProducts) {
    for (var i = 0; i < cartProducts.length; i++) {
        if (barcode === cartProducts[i].product.barcode) {

            return cartProducts[i];
        }
    }

    return false;
}


exports.buildCartProducts = buildCartProducts;

