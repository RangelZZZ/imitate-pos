var pos = require("../main/main.js");
var theNeedData = require("./fixture.js");

describe("intergrate test", function () {
    var allProducts;
    var barcodes;

    beforeEach(function () {
        allProducts = theNeedData.loadAllProducts();
        barcodes = ['ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });
    it('should print correct text', function () {
        spyOn(console, 'log');
        pos. printReceiptList(barcodes);

        var expectText =
            "***<没钱赚商店>购物清单***\n" +
            "名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n" +
            "名称：荔枝，数量：2斤，单价：15.00(元)，小计：28.50(元)\n" +
            "名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n" +
            "----------------------\n" +
            "买二赠一商品：\n" +
            "名称：方便面，数量：1袋\n" +
            "----------------------\n" +
            "总计：49.50(元)\n" +
            "节省：9.00(元)\n" +
            "**********************";
        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
