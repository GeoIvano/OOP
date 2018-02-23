function Food(name, url) {
    this.name = name;
    this.url = url;
}

function Mesno(name, url) {
    Food.call(this, name, url);
}
extend(Mesno, Food);
Mesno.prototype.lai = function() {
    document.write('<p>Bau-Bau</p>');
}

function Posno(name, url) {
    Food.call(this, name, url);
}
extend(Posno, Food);
Posno.prototype.stayHungry = function() {
    document.write('<p>I am hungry</p>');
}
const MESNI_QSTIQ = [new Mesno('Pizza', 'https://www.cicis.com/media/1243/pizza_adven_zestypepperoni.png'),
    new Mesno('Sudjuk', 'http://dahapna.co.uk/image/cache/data/products/11357-380x380.png'),
    new Mesno('Kebabche', 'http://chorbadjii.com/wp-content/uploads/2014/02/%D0%A1%D0%BA%D0%B0%D1%80%D0%B0-%D0%9A%D0%B5%D0%B1%D0%B0%D0%BF%D1%87%D0%B5%D1%82%D0%B0-1.png'),
    new Mesno('Parjola', 'http://chorbadjii.com/wp-content/uploads/2014/02/%D0%A1%D0%BA%D0%B0%D1%80%D0%B0-%D0%9F%D0%B8%D0%BB%D0%B5%D1%88%D0%BA%D0%B0-%D0%BF%D1%8A%D1%80%D0%B6%D0%BE%D0%BB%D0%B0-%D1%84%D0%B8%D0%BB%D0%B5.png'),
    new Mesno('Sarchica', 'http://chorbadjii.com/wp-content/uploads/2014/02/%D0%9F%D0%B8%D0%BB%D0%B5%D1%88%D0%BA%D0%B8-%D0%B2%D0%BE%D0%B4%D0%B5%D0%BD%D0%B8%D1%87%D0%BA%D0%B8-%D1%81-%D0%BB%D1%83%D0%BA.png')
];
const POSNI_QSTIQ = [new Posno('Salata', 'https://www.burgerking.com.tr/cmsfiles/products/king-delight-akdeniz-salata-1.png?v=94'),
    new Posno('Tarator', 'http://kapripizza.com/wp-content/uploads/2015/09/pizza-capri-tarator.png'),
    new Posno('Treva', 'https://cdn.pixabay.com/photo/2017/02/01/11/25/background-2029771_960_720.png'),
    new Posno('Pure', 'http://www.za100lie.com/images/1480489688.png'),
    new Posno('Banani', 'https://goingbananasvrg.files.wordpress.com/2013/05/cropped-bananas.png')
];

function extend(constr1, constr2) {
    constr1.prototype = Object.create(constr2.prototype)
    constr1.prototype.constructor = constr1;
}

function Person(name) {
    this.name = name;
}

function Restaurant(name) {
    this.name = name;
    this.waiters = [];
    this.cooks = [];
}
Restaurant.prototype.addWaiter = function(waiter) {
    if ((waiter != null) && (waiter instanceof Waiter) && (waiter.staj > 5)) {
        this.waiters.push(waiter);
        document.write("<p>We add the waiter " + waiter.name + "</p>");
    }
}
Restaurant.prototype.addCook = function(cook) {
    if (cook != null) {
        if (cook instanceof Chef) {
            if (this.cooks.findIndex(x => x instanceof Chef) == -1) {
                this.cooks.push(cook);
                document.write("<p>We add the chef " + cook.name + "</p>");
            } else {
                document.write("<p>We already have chefs</p>");
            }
        } else {
            if (cook instanceof SaladMaker) {
                var sal = this.cooks.filter(x => x instanceof SaladMaker);
                if (sal.length < 5) {
                    this.cooks.push(cook);
                    document.write("<p>We add the salad maker " + cook.name + "</p>");
                } else {
                    document.write('<p>We already have 5 salad makers</p>');
                }
            } else {
                this.cooks.push(cook);
                document.write('<p>We add the main cook ' + cook.name + "</p>");
            }
        }
    }
}
Restaurant.prototype.order = function(mesnoLiE) {
    var gotvach = this.cooks[Math.floor(Math.random() * this.cooks.length)];
    while (gotvach instanceof Chef) {
        gotvach.arrange();
        gotvach = this.cooks[Math.floor(Math.random() * this.cooks.length)];
    }
    if (gotvach instanceof SaladMaker) {
        gotvach.cut();
        gotvach.rint();
    }
    var meal = gotvach.gotvi(mesnoLiE);
    if (meal instanceof Mesno) {
        meal.lai();
    }
    if (meal instanceof Posno) {
        meal.stayHungry();
    }
    var waiter = this.waiters[Math.floor(Math.random() * this.waiters.length)];
    document.write(`<p>Me ${gotvach.name} have prepared for you ${meal.name}</p><img src="${meal.url}" width="200px"  alt="${meal.name}"/><p>${waiter.name} will bring it to you`);

    waiter.nosi();
}

function Waiter(name, staj) {
    Person.call(this, name);
    this.staj = staj;
}
extend(Waiter, Person);
Waiter.prototype.nosi = function() {
    document.write("<p>I bring you</p>");
}

function Cook(name) {
    Person.call(this, name);
}
extend(Cook, Person);
Cook.prototype.gotvi = function(mesnoLiE) {

    if (mesnoLiE) {
        var meal = MESNI_QSTIQ[Math.floor(Math.random() * MESNI_QSTIQ.length)];
    } else {
        var meal = POSNI_QSTIQ[Math.floor(Math.random() * POSNI_QSTIQ.length)];
    }

    return meal;
}

function Chef(name) {
    Cook.call(this, name);
}
extend(Chef, Cook);
Chef.prototype.arrange = function() {
    document.write('<p>I won`t cook you cook</p>');
}

function SaladMaker(name) {
    Cook.call(this, name);
}
extend(SaladMaker, Cook);
SaladMaker.prototype.rint = function() {
    document.write('<p>I cut</p>');
}
SaladMaker.prototype.cut = function() {
    document.write('<p>I rind</p>');
}


var rest = new Restaurant(" In Pesho`restaurant");
document.write(`<h2>Dobre doshli  ${rest.name}</h2>`);
var ch1 = new Chef('Manchev');
var ch2 = new Chef('Ivanov');
var sal1 = new SaladMaker('Pesho');
var sal2 = new SaladMaker('Gosho');
var sal3 = new SaladMaker('Mosho');
var sal4 = new SaladMaker('Sal');
var sal5 = new SaladMaker('Sam');
var sal6 = new SaladMaker('P');
var c = new Cook('Sally');
var c1 = new Cook('Tosho');
var w1 = new Waiter('Penka', 8);
var w2 = new Waiter('Gesho', 7);
var w3 = new Waiter('Jasmin', 15);
var w4 = new Waiter('Kichka', 10);
rest.addCook(ch1);
rest.addCook(ch2);
rest.addCook(sal1);
rest.addCook(sal2);
rest.addCook(sal3);
rest.addCook(sal4);
rest.addCook(sal5);
rest.addCook(sal6);
rest.addCook(c);
rest.addCook(c1);
rest.addWaiter(w1);
rest.addWaiter(w2);
rest.addWaiter(w3);
rest.addWaiter(w4);
rest.order(true);
rest.order(false);