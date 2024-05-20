document.addEventListener('DOMContentLoaded', () => {
    const stocksData = document.getElementById('stocks-data');
    const apiKey = 'FO3BBNU9TXDHD4TO';
    const symbol = 'AAPL';

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data['Time Series (Daily)']) {
                throw new Error(`Alpha Vantage API error: ${data['Error Message'] || 'Unknown error'}`);
            }
            const timeSeries = data['Time Series (Daily)'];
            const latestDate = Object.keys(timeSeries)[0];
            const latestData = timeSeries[latestDate];

            stocksData.innerHTML = `
                <p>Symbol: ${symbol}</p>
                <p>Date: ${latestDate}</p>
                <p>Open: $${latestData['1. open']}</p>
                <p>High: $${latestData['2. high']}</p>
                <p>Low: $${latestData['3. low']}</p>
                <p>Close: $${latestData['4. close']}</p>
                <p>Volume: ${latestData['6. volume']}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            stocksData.innerHTML = 'Error loading stock prices.';
        });
});
