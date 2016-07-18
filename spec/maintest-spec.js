var theNeedData = require('./fixture.js');
var buildCartProducts = require('../main/main.js');

describe("buidCartProducts", function () {

    var allProducts = theNeedData.loadAllProducts();

    it("calculate the correct product count when the input has not '-'", function () {
        var barcodes = [
            "ITEM000000",
            "ITEM000004",
            "ITEM000004",
            "ITEM000005"
        ];
        var expectProducts = [
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
        var testCartProducts = buildCartProducts(barcodes, allProducts);

        expect(testCartProducts).toEqual(expectProducts);
    });

    it("calculate the correct product count when the input has '-'", function () {
        var barcodes = [
            "ITEM000000",
            "ITEM000003-3"
        ];
        var expectProducts = [
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
        var testCartProducts = buildCartProducts(barcodes, allProducts);

        expect(testCartProducts).toEqual(expectProducts);

    });
});
