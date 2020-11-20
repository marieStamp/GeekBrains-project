class Goods {
    constructor(name, color, size, price, quantity, shipping) {
    this.name = name;
    this.color = color;
    this.size = size;
    this.price = price;
    this.quantity = quantity;
    this.shipping = shipping;
    }
    Add(){} /* метод добавляет товар в корзину */
    Cancel(){}  /* метод удаляет товар из корзины */
    Buy(){}  /* метод подтверждает покупку товара */
}

class Man extends Goods {
    constructor(name, color, size, price, quantity, shipping) {
        super(name, color, size, price, quantity, shipping);
    }
    super.Add();
    super.Cancel();
    super.Buy();
}

class Women extends Goods {
    constructor(name, color, size, price, quantity, shipping) {
      super(name, color, size, price, quantity, shipping);  
    }
    super.Add();
    super.Cancel();
    super.Buy();
}

class Kids extends Goods {
    constructor(name, color, size, price, quantity, shipping) {
        super(name, color, size, price, quantity, shipping);
    }
    super.Add();
    super.Cancel();
    super.Buy();
}

class Accessories extends Goods {
    constructor(name, color, size, price, quantity, shipping, type){
        super(name, color, size, price, quantity, shipping);   /* добавляется тип аксессуара: сумки, шарфы, ремни и тд. */
        this.type = type;
    }
    super.Add();
    super.Cancel();
    super.Buy();
}

class HotDeals extends Accessories {
    constructor(name, color, size, price, quantity, shipping, type, discount) {
        super(name, color, size, price, quantity, shipping, type);  /* размер скидки */
        this.discount = discount;
    }
    super.Add();
    super.Cancel();
    super.Buy();
    makeDiscount(){}  /* метод перессчитывает стоимость с учетом скидки */
}

class Featured extends HotDeals {
    constructor(name, color, size, price, quantity, shipping, type, discount) {   /* в избранном могут быть товары, которые включают все свойства из каждого класса */
        super(name, color, size, price, quantity, shipping, type, discount);
    }
    super.Add();
    super.Cancel();
    super.Buy();
}

class NewArrivals extends Accessories {
    constructor(name, color, size, price, quantity, shipping, type) {   /* в этом разделе могут быть все свойства, кроме скидок */
        super(name, color, size, price, quantity, shipping, type);
    }
    super.Add();
    super.Cancel();
    super.Buy();   
}

goodsSum(price, quantity){
    return this.price * this.quantity
}