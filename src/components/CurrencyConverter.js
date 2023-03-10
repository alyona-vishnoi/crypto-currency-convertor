import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

const CurrencyConverter= () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setchosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setchosenSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(0)
    //const [exchangeRate, setexchangeRate] = useState(0)
    const [result,setResult]=useState(0)

    const [exchangedData, SetexchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })
    const convert = ()=>{
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
            headers: {
              'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
              'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
            }
          };
          
          axios.request(options).then((response) => {
              //console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
              if (response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']) {
                //setexchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
                setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']*amount)
                SetexchangedData({
                    primaryCurrency: chosenPrimaryCurrency,
                    secondaryCurrency: chosenSecondaryCurrency,
                    exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
                })
              }
              
          }).catch((error) => {
                setResult('Cannot perform conversion')
                SetexchangedData({
                    primaryCurrency: chosenPrimaryCurrency,
                    secondaryCurrency: chosenSecondaryCurrency,
                    exchangeRate: 'Unvailable'
            })
              console.error(error);
          });
    }

    return (
      <div className = "currency-converter">
        <h2>Currency Converter</h2>
        <div className="input-box">
            <table>
                <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input
                            type = "number"
                            name="currency-amount-1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select 
                                value={chosenPrimaryCurrency} 
                                name="currency-option1" 
                                className="currency-options"
                                onChange={(e) => setchosenPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map( (currency,_index) => (<option key ={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input
                            name="currency-amount-2"
                            value={result}
                            disabled={true}
                            />
                        </td>
                        <td>
                            <select value={chosenSecondaryCurrency} 
                                name="currency-option2" 
                                className="currency-options"
                                onChange={(e) => setchosenSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map( (currency,_index) => (<option key ={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button id="convert-button" onClick ={convert}>Convert</button>
        </div>
        <ExchangeRate 
            exchangedData = {exchangedData}
        />
      </div>
    );
  };

export default CurrencyConverter