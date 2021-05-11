export var backend = window.location.origin+"/api/"
if (process.env.NODE_ENV !== 'production') {
    backend = "http://localhost:4100/";
}

export var cart = [];
if (navigator.cookieEnabled) {
    if (document.cookie["cart"]) {

    }
}
if (sessionStorage["cart"]) {
    console.log("Nano")
    cart = JSON.parse(sessionStorage["cart"]);
}

export const fetchItems = async () => {
    const res = await fetchFromBackend("items")
    const data = await res.json();

    return data;
}
export const fetchSellers = async () => {
    const res = await fetchFromBackend("seller")
    const data = await res.json();
    return data;
}

export const fetchCart = async () => {
    if (cart.length === 0) {
        return []
    }
    var q = "";
    cart.forEach(item => q += 'id='+item.id + '&');
    const res = await fetchFromBackend("items?"+q);
    const data =  await res.json();
    return data;
}


export const fetchFromBackend = async (path, method = "GET", data=null) => {
    var query = {
        method: method,
        headers: {
            'Content-Type': 'application/json'

        },
        redirect: 'follow'
    }
    if (data !== null) {
        query["body"] = JSON.stringify(data);
    }
    return await fetch(backend+path, query);
}

export const OpenWinowShort = async (url) => {
    const w = window.open(url);
    setTimeout(() => window.focus(), 10);
    setTimeout(() => w.close(), 500);
  }
  