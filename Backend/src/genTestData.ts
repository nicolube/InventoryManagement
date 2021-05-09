import { randomInt } from "crypto"
import { initDB, models } from "./data/database_manager"

var sellerData = [
    {
        name: "Mercateo",
        url: "https://www.mercateo.com/",
        oder_url: "https://www.mercateo.com/p/%nr%/?quantity=%quantity%&AddToBasketAction"
    },
    {
        name: "Reichelt",
        url: "https://www.reichelt.de/",
    },
    {
        name: "Conrad",
        url: "https://www.conrad.de/",
    },
    {
        name: "Bürklin",
        url: "https://www.buerklin.com/",
    }
]

const names = [
    "Stacee Juneau",
    "Earlene Bedoya",
    "Barton Agan",
    "Sharen Mosher",
    "Apolonia Hagy",
    "Marchelle Church",
    "Nisha Friscia",
    "Hedy Burris",
    "Valda Halstead",
    "Ok Cervantez",
    "Marietta Mcclintic",
    "Gregorio Larkins",
    "Tina Garwood",
    "Carmon Bame",
    "Arlie Bott",
    "Julius Cottingham",
    "Zona Athens",
    "Jimmy Platt",
    "Betsy Beason",
    "Ardelia Sum",
    "Abbey Bondy",
    "Alana Febus",
    "Antony Hepler",
    "Billye Brosius",
    "Luetta Gorsuch",
    "Gregg Petteway",
    "Lynda Chaput",
    "Kiana Ihle",
    "Gracia Branum",
    "Deneen Pesqueira",
    "Anette Brimage",
    "Polly Swayze",
    "Frances Dyck",
    "Providencia Hoagland",
    "Kimber Drey",
    "Keneth Westman",
    "Maris Aleman",
    "Anika Oakland",
    "Tisa Kleiman",
    "Neville Goggins",
    "Melodee Schultheis",
    "Vida Jacobs",
    "Ellis Spataro",
    "Chantel Clack",
    "Oren Capozzoli",
    "Reyes More",
    "Tabitha Fedele",
    "Abel Arens",
    "Mack Champion",
    "Mollie Wineinger",
]


const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

const gen = async () => {
    const Seller = models.seller
    const OrderNo = models.order_no
    const Item = models.item
    var sellers = await Seller.createEach(sellerData).fetch()
    console.log(sellers)

    for (let i = 0; i < 50; i++) {
        var data = {
            name: names[i],
            storage: i,
            sub_storage: 0,
            std_restock: randomInt(30),
        }
        var item = await Item.create(data).fetch();
        for (let i1 = 0; i1 < randomInt(3) + 1; i1++) {
            await OrderNo.create({
                nr: zeroPad(randomInt(1000000000), 10),
                seller_id: sellers[i1].id,
                item_id: item.id
            })
        }
    }
}

initDB()
setTimeout(gen, 1000)
