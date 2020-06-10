import React, {useState} from 'react'

function Calculator() {


  const [calc, setCalc] = useState({
    rubAmount: 0,
    rate: 69
  })

  const handleAmountChange = event => {
    setCalc({
    rubAmount: event.target.value
    });
  }

  function calcUSDsum() {
    return (calc.rubAmount / calc.rate).toFixed(2)
  }

  const loadActualRate = () => {
    fetch(process.env.REACT_APP_CURRENCY_URL)
    .then(response => response.json())
    .then(rates => {
      const findUSD = rate => rate.code === 'USD';
      const rate = rates.find(findUSD).value
      setCalc({ rate });
    });
  }
     
  return (
    <>
      <div>
        <h3>Конвертер валют:</h3>
        <div>Текущий курс: {calc.rate}</div>
      <div>
        <span>Сумма в рублях: </span>
        <input
          type="text"
          placeholder="Сумма в рублях"
          onChange={handleAmountChange}
          value={calc.rubAmount}/>
      </div>
        <span>Сумма в долларах: {calcUSDsum()} </span>
      </div> 
      <button onClick={loadActualRate}>
        Загрузить курс валют
      </button>
    </>
  )
}

export default Calculator
