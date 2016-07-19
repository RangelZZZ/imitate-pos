var pos = require("../main/calculateReceiptProducts.js");

describe("calculateReceiptProducts", function () {

    it('should print correct savedTotal and total', function () {
        var receiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                count: 3
            },
            subTotal: 6.00,
            savedTotal: 3.00
        },
            {
                receiptProduct: {
                    product: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        price: 15.00
                    },
                    count: 3
                },
                subTotal: 42.75,
                savedTotal: 2.25
            }
        ];
        var expectReceipt = {
            receiptProducts: [{
                receiptProduct: {
                    product: {
                        barcode: 'ITEM000000',
                        name: '可口可乐',
                        unit: '瓶',
                        price: 3.00
                    },
                    count: 3
                },
                subTotal: 6.00,
                savedTotal: 3.00
            }, {
                receiptProduct: {
                    product: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        price: 15.00
                    },
                    count: 3
                },
                subTotal: 42.75,
                savedTotal: 2.25
            }
            ],
            saved: 5.25,
            total: 48.75
        };

        var receipt = pos.calculateReceiptProducts(receiptProducts);

        expect(receipt).toEqual(expectReceipt);
    });
});