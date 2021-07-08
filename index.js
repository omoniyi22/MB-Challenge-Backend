const puppeteer = require('puppeteer')
const $ = require("cheerio")
const CronJob = require('cron').CronJob;
const nodemailer = require("nodemailer")

const url = 'https://www.amazon.com/Sony-Noise-Cancelling-Headpones=WH1000XH3/dp/B07G4MNFS1/';

async function configureBrowsere() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url);
  return page
}


async function checkPrice(page) {

  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML)
  // console.log(html)   

  $('#priceblock_dealprice', html).each(function () {
    let dollarPrice = $(this).text();
    // console.log(dollarPrice)

    var currentPrice = Number(dollarPrice.replace(/[^0-9.-]+/g, ""));
    if (currentPrice < 300) {
      console.log("BUY !!!!!" + currentPrice)
    }
  })
  CronJob.apply()

  //priceblock_dealprice
}

async function monitor() {
  let page = await configureBrowsere()
  await checkPrice(page);
}

async function startTracking() {
  const page = await configureBrowsere();

  let job = new CronJob('*/30 * * * * *', function () {
    checkPrice(page);
  }, null, true, null, null, true)
  job.start()
}

async function sendNotification(price) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "omoniyioluwaseun22@gmail.com",
      pass: "seun2322"
    }
  })
  let text = 'Price dropped to ' + price;
  let html = `<a href=\"${url}\">Link</a>`;

  let info = await transporter.sendMail({
    from: '"Price Tracker" <omoniyioluwaseun22@gmail.com>',
    subject: "Price dropped to " + price,
    text,
    html,
  })

  console.log("Message sent: %s", info.messageId)
}


startTracking()

monitor()