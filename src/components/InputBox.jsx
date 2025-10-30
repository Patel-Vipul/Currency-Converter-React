import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "USD",
  amountDisable = false,
  currencyDisable = false,

  className = "",
}) {
  // generates unique id
  const id = useId();

  return (
    // main-container
    <div className={`bg-white p-3 rounded-lg text-sm flex flex-col sm:flex-row justify-between gap-3${className}`}>
      {/* label & input box */}
      <div className="w-1/2 sm:w-1/2">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block text-sm sm:text-base">
          {label}
        </label>

        <input
          id={id}
          type="number"
          className="outline-none w-full bg-transparent py-1.5 font-semibold text-base sm:text-lg"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
          placeholder="0"
        />
      </div>

      {/* option box */}
      <div className="w-full sm:w-1/2 flex flex-col items-start sm:items-end text-left sm:text-right">
        <p className="text-black/40 mb-2 text-sm sm:text-base">Currency Type</p>

        <select
          className="rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 cursor-pointer outline-none text-sm sm:text-base hover:bg-gray-200 transition-colors duration-200"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}>
          {/* for multiple options */}
          {currencyOptions.length > 0 ? (
            currencyOptions.map(({ code, countryName }) => (
              <option key={code} value={code}>
                {code}-{countryName}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
