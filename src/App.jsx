import { useCallback, useEffect, useState } from "react";
import { InputBox } from "./components/index";
import useCurrency from "./custom_hook/useCurrency";
import useDebounce from "./custom_hook/useDebounce";

function App() {

  //State management
  const [currencies, setCurrencies] = useState([]);
  const [currenciesLoading, setCurrenciesLoading] = useState(true);
  const [currenciesError, setCurrenciesError] = useState(null);

  //Fetching available currencies
  useEffect(() => {
    setCurrenciesLoading(true);
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((data) => {
        const countyCurrencies = Object.entries(data).map(
          ([code, countryName]) => ({
            code,
            countryName,
          })
        );
        setCurrencies(countyCurrencies);
        setCurrenciesLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching currencies", err);
        setCurrenciesError("Failed to load currencies");
        setCurrenciesLoading(false);
      });
  }, []);

  // console.log(currencies);

  //Currency conversion Logic
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const debouncedAmount = useDebounce(amount, 500);

  const {
    data: result,
    loading,
    error,
  } = useCurrency(from, to, Number(debouncedAmount));
  // console.log(amount)
  // console.log(result)

  const convert = useEffect(() => {
    if (result !== null && result !== undefined) {
      setConvertedAmount(result);
    }
  }, [result]);

  //Swap currecny function
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(String(convertedAmount || 0));
  };

  //formatting helper function
  const formatNumber = (num)=>{
    if(num===null || num===undefined || isNaN(num)) return "";

    return new Intl.NumberFormat('en-US',{
      minimumFractionDigits : 2,
      maximumFractionDigits : 2
    }).format(num)
  }

  return (
    <>
      {/* main container */}
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-r from-blue-500 via-indigo-600 to-cyan-500 animate-gradient p-4 sm:p-6 md:p-8 lg:p-10">

        <div className="w-full">
          <div className="w-full max-w-lg mx-auto border border-gray-300 rounded-lg p-6 sm:p-8 backdrop-blur-sm bg-white/30 shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
                {/* form section  */}
              <div className="w-full mb-3 sm:mb-4">
                <InputBox
                  label="From"
                  amount={amount}
                  onAmountChange={setAmount}
                  currencyOptions={currencies}
                  onCurrencyChange={setFrom}
                  selectCurrency={from}
                  placeholderValue="Enter-Amount"
                />
              </div>

              {/* Swap Button  */}
              <div className="relative w-full h-0.5 my-2">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base px-3 py-1 transition-transform duration-200 active:scale-95 cursor-pointer"
                  onClick={swap}>
                  swap
                </button>
              </div>

              {/* output section  */}
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  onAmountChange={setConvertedAmount}
                  selectCurrency={to}
                  onCurrencyChange={(currency) => setTo(currency)}
                  currencyOptions={currencies}
                  amountDisable
                />
              </div>
              <p className="text-center text-sm sm:text-base text-gray-700 mt-2 mb-3 font-medium">
                {formatNumber(convertedAmount)}
              </p>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 ease-in-out shadow-md active:scale-95"
                onClick={() => convert()}
                disabled={loading || currenciesLoading}>
                {loading ? "Converting..." : `Convert ${from} to ${to}`}
              </button>

              {/* error Message */}
              {error && (
                <div className="text-red-500 text-sm mt-2 text-center underline">
                  {error}
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
