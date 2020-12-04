class Cart {
    constructor(id, name, quantity, price, img) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.img = img;
    }
    addItem() {} /* метод добавляет товар в корзину */
    removeItem() {} /* метод удаляет товар из корзины */
    saveCart() {} /* метод сохраняет данные в корзине */
    clearCart() {} /* метод удаляет все данные из корзины */
    changeItemQuantity() {} /* метод меняет количество единиц одного товара */
    getById() {} /* метод ищет элемент корзины по id товара */
    addDelivery() {} /* метод добавляет способ доставки */
    makeOrder() {} /* метод отправляет заказ в обработку */
    goodsSum() {} /* метод рассчитывает общую стоимостль товаров в корзине */
}

class Goods {
    constructor(id, name, color, size, price, quantity) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.size = size;
        this.price = price;
        this.quantity = quantity;
    }

    render() {} /* отрисовывает товары в html разметке */
    chooseColor() {} /* выбирает цвет товара */
    chooseSize() {} /* выбирает цвет товара */
    chooseQuantity() {} /* выбирает количество единиц товара */
}

class Man extends Goods {
    constructor(id, name, color, size, price, quantity) {}

}

class Women extends Goods {
    constructor(id, name, color, size, price, quantity) {}
}

class Kids extends Goods {
    constructor(id, name, color, size, price, quantity) {}
}

class Accessories extends Goods {
    constructor(id, name, color, size, price, quantity, type) {
        super(id, name, color, size, price, quantity); /* добавляется тип аксессуара: сумки, шарфы, ремни и тд. */
        this.type = type;
    }
}

class HotDeals extends Accessories {
    constructor(id, name, color, size, price, quantity, type, discount) {
        super(id, name, color, size, price, quantity, type); /* добавляем размер скидки */
        this.discount = discount;
    }
    makeDiscount() {} /* метод перессчитывает стоимость с учетом скидки */
}

class Featured extends HotDeals {
    constructor(id, name, color, size, price, quantity, type, discount) {
        /* в избранном могут быть товары, которые включают все свойства из каждого класса */
    }
}

class NewArrivals extends Accessories {
    constructor(id, name, color, size, price, quantity, type) {
        /* в этом разделе могут быть все свойства, кроме скидок */
    }
}


function goodsSum(goodsArr) {
    return goodsArr.reduce((sum, current) => sum + current, 0); /* goodsArr - массив стоимостей товаров, sum - сумма текущего и последующего товаров, current - стоимость текущего товара */
}

class Products {
    constructor(options) {
        this.container = document.querySelector(options.mainSelector);
        this.allProducts = []; /* поле, в котором будут храниться данные о товарах полученные с сервера */
        this.ProductsForShow = []; /* поле, в котором будут храниться данные для отображения на странице */
        this.url = options.URL;
        this.goods = options.goods ? options.goods : null;
        this.cart = options.cart ? options.cart : null;
        this._init(); /* метод, запускающий методы, которые должны сработать в момент создания класса */
    }


    // переделано с использованием промисов
    let getRequest = (url) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        reject('Error');
                    } else {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.send();
        })
    };

    // получение нового списка товаров корзины
    _render() {
        this.container.innerHTML = '';
        this.allProducts.forEach((goods) => {
            let newGoods = new this.goods(goods);
            this.container.insertAdjacentHTML('beforeend', newGoods.render());
        })
    }

    // метод добавления товара в корзину

    addItem(item) {
        this.getJson(`${API}/addToBasket.json`)
            .then(({
                result
            }) => {
                if (result) {
                    let goods = this.ProductsForShow.find((g) => g.id === item.id);
                    if (goods) {
                        goods.quantity++;
                    } else {
                        this.ProductsForShow.push({
                            ...item,
                            quantity: 1;
                        })
                    }
                    this._render();
                } else {
                    throw new Error("Server's answer isn't correct...");
                }
            })
            .catch((e) => {
                console.error(e);
            })
    }


    // метод удаления товаров из корзины

    removeItem(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(({
                result
            }) => {
                if (result) {
                    let goods = this.ProductsForShow.find((g) => g.id === item.id);
                    if (goods.quantity > 1) {
                        goods.quantity--;
                    } else {
                        let idx = this.ProductsForShow.findIndex((g) => g.id === item.id);
                        this.ProductsForShow.splice(idx, 1);
                    }
                    this._rander();
                } else {
                    throw new Error("Server's answer isn't correct...");
                }
            })
            .catch((e) => {
                console.error(e);
            })
    }
