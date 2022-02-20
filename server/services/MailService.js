const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendMail(to, data) {
        const {
            totalPrice,
            totalCount,
            devices
        } = data
        const stringifyDevices = [...devices.map(device =>
            `<br>💡 ${device.name}/${device.price}$ шт`)
        ]
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Замовлення в магазині Dodo',
            text: '',
            html:
                `
                    <div>
                        <h1>Дякуємо за замовлення!</h1>
<hr/>
                        <span>Ви придабали ${totalCount} предметів на суму ${totalPrice}$</span>
                        <br>
                        Перелік товарів:
                        <br>
                        ${stringifyDevices.join(`<br>`)}
                    </div>
<hr/>
                `
        })
    }
}

module.exports = new MailService();
