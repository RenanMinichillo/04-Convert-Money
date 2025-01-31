const convertButton = document.querySelector('#convert-button');

const rates = {
    real: { locales: 'pt-BR', currency: 'BRL', name: 'R$ Real', flag: 'img/real.png', bid: 1 },
    dolar: { locales: 'en-US', currency: 'USD', name: 'US$ Dólar', flag: 'img/dolar.png', bid: 5.91 },
    euro: { locales: 'de-DE', currency: 'EUR', name: '€ Euro', flag: 'img/euro.png', bid: 6.2 },
    libra: { locales: 'en-GB', currency: 'GBP', name: '£ Libra', flag: 'img/libra.png', bid: 7.3 },
    iene: { locales: 'ja-JP', currency: 'JPY', name: '¥ Iene', flag: 'img/iene.png', bid: 0.04 },
    won: { locales: 'ko-KR', currency: 'KRW', name: '₩ Won', flag: 'img/won.png', bid: 0.0041 },
    bitcoin: { locales: 'en-US', currency: 'BTC', name: 'BTC Bitcoin', flag: 'img/bitcoin.png', bid: 607.040 }
};

function convertValues() {
    const amountInput = parseFloat(document.querySelector('#amount-input').value);
    const fromCurrency = document.querySelector('#currency-select-from').value;
    const toCurrency = document.querySelector('#currency-select-to').value;

    const selectedFrom = rates[fromCurrency];
    const selectedTo = rates[toCurrency];

    const convertedValue = (amountInput * selectedFrom.bid) / selectedTo.bid;

    updateUI('.flag.convert', '#currency-name-from', '#currency-value-from', selectedFrom, amountInput);
    updateUI('.flag.converted', '#currency-name-to', '#currency-value-to', selectedTo, convertedValue);
}

function updateUI(flagSelector, nameSelector, valueSelector, currency, value) {
    document.querySelector(flagSelector).src = currency.flag;
    document.querySelector(nameSelector).textContent = currency.name;
    document.querySelector(valueSelector).textContent = new Intl.NumberFormat(currency.locales, {
        style: 'currency',
        currency: currency.currency
    }).format(value);
}

convertButton.addEventListener('click', convertValues);