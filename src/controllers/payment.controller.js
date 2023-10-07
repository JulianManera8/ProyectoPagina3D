import mercadopago from "mercadopago";

export const createOrder = async (res) => {

    mercadopago.configure({
        access_token: "TEST-4810140801313535-100716-27f67270d6ffcbf3c5c16802c3bf45a9-1504102142",
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
                tittle: "Laptop Lenovo",
                unit_price: 500,
                currency_id: "PEN",
                quantity: 1,
            }
        ]
    })

    res.send('creando orden perro');
}

