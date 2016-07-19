var pos = require("../main/generateReceiptList.js");
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

        var receiptList = pos.generateReceiptList(receipt);

        expect(receiptList).toEqual(expectReceiptList);
    });

    it("the products are only buy two get one for free discount", function () {
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
                subTotal: 6.00,
                savedTotal: 3.00
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
                subTotal: 2.00,
                savedTotal: 1.00
            }],
            saved: 4.00,
            total: 8.00
        };
        var expectReceiptList =
            "***<没钱赚商店>购物清单***\n" +
            "名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6.00(元)\n" +
            "名称：羽毛球，数量：3个，单价：1.00(元)，小计：2.00(元)\n" +
            "----------------------\n" +
            "买二赠一商品：\n" +
            "名称：可口可乐，数量：1瓶\n" +
            "名称：羽毛球，数量：1个\n" +
            "----------------------\n" +
            "总计：8.00(元)\n" +
            "节省：4.00(元)\n" +
            "**********************";
        var receiptList = pos.generateReceiptList(receipt);

        expect(receiptList).toEqual(expectReceiptList);
    });

    it("the products are only five percent discount", function () {
        var receipt = {
            receiptProducts: [{
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
            }, {
                receiptProduct: {
                    product: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        price: 3.00
                    },
                    count: 3
                },
                subTotal: 9.00,
                savedTotal: 0.00
            }],
            saved: 0.55,
            total: 19.45
        };

        var expectReceiptList =
            "***<没钱赚商店>购物清单***\n" +
            "名称：苹果，数量：2斤，单价：5.50(元)，小计：10.45(元)\n" +
            "名称：雪碧，数量：3瓶，单价：3.00(元)，小计：9.00(元)\n" +
            "----------------------\n" +
            "总计：19.45(元)\n" +
            "节省：0.55(元)\n" +
            "**********************";
        var receiptList = pos.generateReceiptList(receipt);

        expect(receiptList).toEqual(expectReceiptList);
    });

    it("there are all kinds of products", function () {
        var receipt = {
            receiptProducts: [{
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
            }, {
                receiptProduct: {
                    product: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        price: 3.00
                    },
                    count: 3
                },
                subTotal: 6.00,
                savedTotal: 0.00
            }],
            saved: 3.55,
            total: 16.45
        };

        var expectReceiptList =
            "***<没钱赚商店>购物清单***\n" +
            "名称：苹果，数量：2斤，单价：5.50(元)，小计：10.45(元)\n" +
            "名称：雪碧，数量：3瓶，单价：3.00(元)，小计：6.00(元)\n" +
            "----------------------\n" +
            "总计：16.45(元)\n" +
            "节省：3.55(元)\n" +
            "**********************";
        var receiptList = pos.generateReceiptList(receipt);

        expect(receiptList).toEqual(expectReceiptList);
    });
});



