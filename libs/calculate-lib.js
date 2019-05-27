export function getCapital(item) {
    return item.quantity * item.pricePaid;
}

export function gainDollars(item) {
    if(!item.priceSold){
        return null;
    }
    const pricePaid = item.quantity * item.pricePaid;
    const priceSold = item.quantity * item.priceSold;
    const gain = priceSold - pricePaid;
    return item.tradeType === 'Short' ? -1*gain : gain;
}

export function gainPercent(item) {
    if(!item.priceSold){
        return null;
    }
    const pricePaid = item.quantity * item.pricePaid;
    const priceSold = item.quantity * item.priceSold;
    const gain = ((pricePaid - priceSold) / pricePaid) * 100;
    return item.tradeType === 'Short' ? gain : -1*gain;
}