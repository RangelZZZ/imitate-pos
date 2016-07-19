var theNeedData = require("./fixture.js");
var pos = require("../main/buildCartProducts.js");

describe("buidCartProducts", function () {
    var allProducts = theNeedData.loadAllProducts();

    it("calculate the correct product count when the barcode doesn't exist '-'", function () {
        var barcodes = [
            "ITEM000000",
            "ITEM000004",
            "ITEM000004",
            "ITEM000005"
        ];
        var expectCartProducts = [
            {
                product: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                count: 1
            },
            {
                product: {
                    barcode: 'ITEM000004',
                    name: '电池',
                    unit: '个',
                    price: 2.00
                },
                count: 2
            },
            {
                product: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50
                },
                count: 1
            }
        ];
        var cartProducts = pos.buildCartProducts(barcodes, allProducts);

        expect(cartProducts).toEqual(expectCartProducts);
    });

    it("calculate the correct product count when the barcode exist '-'", function () {
        var barcode = ["ITEM000003-3"];
        var expectCartProduct = [{
            product: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
            },
            count: 3
        }];
        var cartProducts = pos.buildCartProducts(barcode, allProducts);

        expect(cartProducts).toEqual(expectCartProduct);
    });

    it(" caculate the correct product count when all kinds of barcodes exist", function () {
        var barcodes = [
            "ITEM000000",
            "ITEM000003-3"
        ];
        var expectCartProducts = [
            {
                product: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                count: 1
            },
            {
                product: {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00
                },
                count: 3
            }
        ];
        var cartProducts = pos.buildCartProducts(barcodes, allProducts);

        expect(cartProducts).toEqual(expectCartProducts);

    });
});
