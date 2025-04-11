const convertButton = document.querySelector('#convert-button')

function formatValues(locales, currency, value) {
    const formatedValue = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency
    }).format(value)

    return formatedValue
}

async function convertValues() {
    const selectFrom = document.querySelector('#convert-from')
    const selectTo = document.querySelector('#convert-to')
    const currencyValue = parseFloat(document.querySelector('#currency-value').value)
    const infoQuotes = document.querySelector('.rates')

    const quotes = 'USD-BRL,EUR-BRL,BTC-BRL,JPY-BRL,GBP-BRL'
    const url = `https://economia.awesomeapi.com.br/json/last/${quotes}`

    let options

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Erro ao buscar a cotação')
        }
        const data = await response.json()

        options = {
            real: { locales: 'pt-BR', currency: 'BRL', name: 'Real Brasileiro', flag: 'assets/img/real.png', bid: 1 },
            dolar: { locales: 'en-US', currency: data.USDBRL.code, name: 'Dolár Americano', flag: 'assets/img/dolar.png', bid: data.USDBRL.bid },
            euro: { locales: 'de-DE', currency: data.EURBRL.code, name: 'Euro', flag: 'assets/img/euro.png', bid: data.EURBRL.bid },
            iene: { locales: 'en-GB', currency: data.GBPBRL.code, name: 'Iene Japonês', flag: 'assets/img/iene.png', bid: data.JPYBRL.bid },
            libra: { locales: 'ja-JP', currency: data.JPYBRL.code, name: 'Libra Esterlina', flag: 'assets/img/libra.png', bid: data.GBPBRL.bid },
            bitcoin: { locales: 'en-US', currency: data.BTCBRL.code, name: 'Bitcoin', flag: 'assets/img/bitcoin.png', bid: data.BTCBRL.bid }
        }

        infoQuotes.textContent = `A cotação atual do ${options[selectTo.value].name} é ${options[selectTo.value].bid}`

    } catch (err) {
        console.error('Erro:', err)
    }

    const currencySelectedFrom = options[selectFrom.value]
    const currencySelectedTo = options[selectTo.value]

    const convertedValue = (currencyValue * currencySelectedFrom.bid) / currencySelectedTo.bid

    updateInfo('.image-convert', '.name-convert', '.input-value', currencySelectedFrom, currencyValue);
    updateInfo('.image-converted', '.name-converted', '.output-value', currencySelectedTo, convertedValue);
}

function updateInfo(flagSelector, nameSelector, valueSelector, currency, value) {
    document.querySelector(flagSelector).src = currency.flag;
    document.querySelector(nameSelector).textContent = currency.name;
    document.querySelector(valueSelector).textContent = formatValues(currency.locales, currency.currency, value)
}

convertButton.addEventListener('click', convertValues)
