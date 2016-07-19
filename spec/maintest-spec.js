var theNeedData = require("./fixture.js");
var pos = require("../main/buildCartProducts.js");
var pos1 = require("../main/calculateCartProducts.js");
var pos2 = require("../main/calculateReceiptProducts.js");
var pos3 = require("../main/generateReceiptList.js");

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
        var testCartProducts = pos.buildCartProducts(barcodes, allProducts);

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
        var testCartProducts = pos.buildCartProducts(barcodes, allProducts);

        expect(testCartProducts).toEqual(expectProducts);

    });
});


describe('calculateCartProducts', function () {
    var promotions = theNeedData.loadPromotinProducts();

    it("when there are no product to discount", function () {
        var cartProduct = [{
            product: {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
            },
            count: 3
        }];
        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000004',
                    name: '电池',
                    unit: '个',
                    price: 2.00
                },
                count: 3
            },
            subTotal: 6.00,
            savedTotal: 0.00
        }];

        var receiptProducts = pos1.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });

    it("when there are only buy two get one for free discount", function () {
        var cartProduct = [{
            product: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            },
            count: 3
        }];
        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50
                },
                count: 3
            },
            subTotal: 9.00,
            savedTotal: 4.50
        }];
        var receiptProducts = pos1.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });

    it("when there are only five percent discount", function () {
        var cartProduct = [{
            product: {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            count: 2
        }];
        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000002',
                    name: '苹果',
                    unit: '斤',
                    price: 5.50
                },
                count: 2
            },
            subTotal: 10.45,
            savedTotal: 0.55
        }];
        var receiptProducts = pos1.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });

    it("when one product has two discounts", function () {
        var cartProduct = [{
            product: {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            count: 3
        }];

        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                count: 3
            },
            subTotal: 6,
            savedTotal: 3
        }];

        var receiptProducts = pos1.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });
    it("when there are all kinds of products", function () {
        var cartProduct = [
            {
                product: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                count: 3
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

        var expectReceiptProducts = [{
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
        var receiptProducts = pos1.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });
});

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

        var receipt = pos2.calculateReceiptProducts(receiptProducts);

        expect(receipt).toEqual(expectReceipt);
    });
});

describe("generateReceiptProducts", function () {

    it("when there is no product to discount", function () {
        var receipt = {
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
                subTotal: 9.00,
                savedTotal: 0.00
            }, {
                receiptProduct: {
                    product: {
                        barcode: 'ITEM000003',
                        name: '羽毛球',
                        unit: '个',
                        price: 1.00
                    },
                    count: 3
                },
                subTotal: 3.00,
                savedTotal: 0.00
            }],
            saved: 0,
            total: 12.00
        };
        var expectReceiptList =
            "***<没钱赚商店>购物清单***\n" +
            "名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：9.00(元)\n" +
            "名称：羽毛球，数量：3个，单价：1.00(元)，小计：3.00(元)\n" +
            "----------------------\n" +
            "总计：12.00(元)\n" +
            "节省：0.00(元)\n" +
            "**********************";

        var receiptList = pos3.generateReceiptList(receipt);

        expect(receiptList).toEqual(expectReceiptList);
    });
});