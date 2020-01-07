const fetch = require('node-fetch');
const delay = require('delay');
const readlineSync = require('readline-sync');
var randomize = require('randomatic')

const functionName = () => new Promise((resolve, reject) => {

    fetch('https://uinames.com/api/?region=indonesia', { 
        method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
   //  const $ = cheerio.load(result);
     // const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionSendOtp = (nomor,reff) => new Promise((resolve, reject) => {

    fetch(`https://us-central1-eos-lynx.cloudfunctions.net/requestPhoneVerificationLynxReferral?phoneNumber=%2B62${nomor}&chainId=b62febe5aadff3d5399090b9565cb420387d3c66f2ccd7c7ac1f532c4f50f573&referral=${reff}`, { 
        method: 'GET',
        headers: {
            'Host': 'us-central1-eos-lynx.cloudfunctions.net',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Origin': 'https://create.lynxwallet.io',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Referer': `https://create.lynxwallet.io/${reff}`,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'

        }
    })
    .then(res => res.json())
    .then(result => {
   //  const $ = cheerio.load(result);
     // const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionVerifOtp = (nomor,reff, otp) => new Promise((resolve, reject) => {

    fetch(`https://us-central1-eos-lynx.cloudfunctions.net/verifyPhoneCodeLynxReferral?chainId=b62febe5aadff3d5399090b9565cb420387d3c66f2ccd7c7ac1f532c4f50f573&phoneNumber=%2B62${nomor}&referral=${reff}&code=${otp}`, { 
        method: 'GET',
        headers: {
            'Host': 'us-central1-eos-lynx.cloudfunctions.net',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Origin': 'https://create.lynxwallet.io',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Referer': `https://create.lynxwallet.io/${reff}`,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    })
    .then(res => res.json())
    .then(result => {
   //  const $ = cheerio.load(result);
     // const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionLogin = (nomor) => new Promise((resolve, reject) => {

    fetch(`https://us-central1-eos-lynx.cloudfunctions.net/requestPhoneVerificationLynx?chainId=b62febe5aadff3d5399090b9565cb420387d3c66f2ccd7c7ac1f532c4f50f573&phoneNumber=%2B62${nomor}`, { 
        method: 'GET',
        headers: {
            'User-Agent': 'Lynx Wallet/4.0.0 (com.needly.eoslynx; samsung/SM-G935FD; Android 22) okhttp',
            'Host': 'us-central1-eos-lynx.cloudfunctions.net',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'

        }
    })
    .then(res => res.json())
    .then(result => {
   //  const $ = cheerio.load(result);
     // const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionRegist = (username, first, last, nomor, pubkey) => new Promise((resolve, reject) => {

    fetch(`https://us-central1-eos-lynx.cloudfunctions.net/createLynxAccount?chainId=b62febe5aadff3d5399090b9565cb420387d3c66f2ccd7c7ac1f532c4f50f573&account=${username}&pubkey=${pubkey}&fullName=${first}%20${last}&phoneNumber=%2B62${nomor}`, { 
        method: 'GET',
        headers: {
            'User-Agent': 'Lynx Wallet/4.0.0 (com.needly.eoslynx; samsung/SM-G935FD; Android 22) okhttp',
            'Host': 'us-central1-eos-lynx.cloudfunctions.net',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'

        }                                                                                                                                                                                                                       
    })
    .then(res => res.json())
    .then(result => {
   //  const $ = cheerio.load(result);
     // const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {
    try {
        const nomor = readlineSync.question('[?] Nomor HP (ex: 83108XXXX): ')
        const reff = readlineSync.question('[?] Kode reff: ')
        const send = await functionSendOtp(nomor, reff)
        if (send.status == 'pending') {
            console.log('[+] Kode berhasil dikirim!')
            console.log(send)
        } else {
            console.log(send)
        }
        const otp = readlineSync.question('[?] OTP: ')
        const verif = await functionVerifOtp(nomor, reff, otp)
        if (verif.verified == true) {
            console.log('[+] Verifikasi berhasil!')
        } else {
            console.log(verif)
        }
       // console.log('[!] Mencoba login...')
       // const login = await functionLogin(nomor)
       /// if (login.verified == true) {
       //     console.log('[+] Berhasil')
     //   } else {
      //      console.log(login)
     //   }
      //  const pubkey = readlineSync.question('[?] Pubkey: ')
      //  const name = await functionName()
      //  const first = name.name
      //  const last = name.surname
    //    const number = Math.floor(Math.random() * 10000) + 100;
    //    const username = `${first}${number}`
    //    const regist = await functionRegist(username, first, last, nomor, pubkey)
     //   console.log(regist)
    } catch (e) {
        console.log(e)
}
})()
