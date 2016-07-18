function loadAllProducts() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadBarcodes() {
    return [
        'ITEM000000',
        'ITEM000000',
        'ITEM000001',
        'ITEM000002-3',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005'
    ]
}

function loadPromotinProducts() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        },
        {
            type: 'FIVE_PERCENT_DISCOUNT',
            barcodes: [
                'ITEM000000',
                'ITEM000002',
                'ITEM000003'
            ]
        }
    ];
}


module.exports = {
    loadBarcodes: loadBarcodes,
    loadAllProducts: loadAllProducts,
    loadPromotinProducts: loadPromotinProducts
}