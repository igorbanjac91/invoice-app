import React, { useEffect, useState } from "react";
import { IconArrowDown, IconArrowLeft, IconArrowRight, IconCalendar } from "./Icons";

const InvoiceForm = () => {

  return (
    <form className="invoice-form">
      <fieldset className="bill-from">
        <legend>Bill From</legend>
        <div className="field bill-from__name-field">
          <label htmlFor="user-address-name">Street Address</label>
          <input type="text" name="user-address-name" />
        </div>
        <div className="field bill-from__city-field">
          <label htmlFor="user-city">City</label>
          <input type="text" name="user-city" />
        </div>
        <div className="field bill-from__post-code-field">
          <label htmlFor="user-post-code">Post Code</label>
          <input type="text" name="user-post-code" />
        </div>
        <div className="field bill-from__country-field">
          <label htmlFor="user-country">Country</label>
          <input type="text" name="user-country" />
        </div>
      </fieldset>
      <fieldset className="bill-to">
        <legend>Bill To</legend>
        <div className="field bill-to__name-field">
          <label htmlFor="customer-name">Client's Name</label>
          <input type="text" name="customer-name" />
        </div>
        <div className="field bill-to__email-field">
          <label htmlFor="customer-email">Client's Email</label>
          <input type="email" name="customer-email" />
        </div>
        <div className="field bill-to__address-field">
          <label htmlFor="customer-address-name">Street Address</label>
          <input type="text" name="customer-address-name" />
        </div>
        <div className="field bill-to__city-field">
          <label htmlFor="cusbtomer-city">City</label>
          <input type="text" name="customer-city" />
        </div>
        <div className="field bill-to__post-code-field">
          <label htmlFor="post-code">Post Code</label>
          <input type="text" name="customer-post-code" />
        </div>
        <div className="field bill-to__country-field">
          <label htmlFor="Country">Country</label>
          <input type="text" name="customer-country" />
        </div>
      </fieldset>
      <fieldset className="invoice-info">
        <div className="field invoice-info__date">
          <label htmlFor="invoice-date">Invoice Date</label>
          <DatePicker />
        </div>
        <div className="field invoice-info__term">
          <label htmlFor="term">Payment Terms</label>
          {/* <select name="term" id="term">
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
          </select> */}
          <SelectTerm />
        </div>
        <div className="field invoice-info__description">
          <label htmlFor="description">Project Description</label>
          <input type="text" name="description" />
        </div>
      </fieldset>
      <fieldset className="items">
        <legend>Item List</legend>
        <div className="items-filed__item">
          <div className="field">
            <label htmlFor="item-name">Item Name</label>
            <input type="text" name="item-name" />
          </div>
          <div className="field">
            <label htmlFor="item-quantity">Qty.</label>
            <input type="number" name="item-quantity" />
          </div>
          <div className="field">
            <label htmlFor="item-price">Price</label>
            <input type="number" name="item-price" />
          </div>
          <div className="item-total-field">
            <div className="item-total">
              <span>Total</span>
              <span>156.00</span>
            </div>
            <button>Delete</button>
          </div>
        </div>
        <button>+ Add New Item</button>
      </fieldset>
      <div className="form-actions">
        <button>Cancel</button>
        <button>Save Changes</button>
      </div>
    </form>
  )
}

// Start with the current date

const DatePicker = () => {
  
  const [ month, setMonth ] = useState("Jan");
  const [ year, setYear ] = useState(2021);
  const [ day, setDay] = useState(1);
  let boxDates = document.querySelector(".date-picker__box-dates");
  let displayDate = document.querySelector(".date-picker__display-date");
  let body = document.querySelector("body");

  useEffect(() => {
    setDayBox();
  }, [month])

  const monthDays = {
    "Jan": 31,
    "Feb": 28,
    "Mar": 31,
    "Apr": 30, 
    "May": 31, 
    "Jun": 30, 
    "Jul": 31,
    "Aug": 31, 
    "Sep": 30, 
    "Oct": 31, 
    "Nov": 30, 
    "Dec": 31
  }

  function moveBack(e) {
    e.preventDefault();
    if (month === "Jan") {
      setMonth("Dec")
      setYear(year - 1);
    } 
    else {
      let monthArr = Object.keys(monthDays)
      let newMonth = monthArr[monthArr.indexOf(month) - 1];
      setMonth(newMonth);
    }
  }

  function moveForward(e) {
    e.preventDefault();
    if (month === "Dec") {
      setMonth("Jan")
      setYear(year + 1);
    } 
    else {
      let monthArr = Object.keys(monthDays)
      let newMonth = monthArr[monthArr.indexOf(month) + 1];
      setMonth(newMonth);
    }

  }

  function setDayBox() {
    let daysBox = document.querySelector(".days");
    daysBox.innerHTML = "";
    let days = monthDays[month];
    while (days > 0) {
      let day = document.createElement("span")
      day.classList.add("day");
      day.textContent = days;
      daysBox.prepend(day);
      days--;
      day.addEventListener("click", (e) => {
        e.stopPropagation();
        setDay(e.target.textContent);
        hideBoxDates();
      })
    }
  }

  function toggleDatePicker(e) {
    e.stopPropagation();
    if (boxDates.style.display == "block") {
      hideBoxDates();
    } else {
      showBoxDates();
    }
  }
  
  function stopPorop(e) {
    e.stopPropagation();
    showBoxDates();
  }

  body.addEventListener("click", () => {
    hideBoxDates();
  });

    
  function showBoxDates() {
    let displayDate = document.querySelector(".date-picker__display-date");
    let boxDates = document.querySelector(".date-picker__box-dates");
    let boxOptions = document.querySelector(".select-terms__options-box")
    boxOptions.style.display = "none";
    boxDates.style.display = "block";
    displayDate.style.borderColor = "rgb(145, 117, 255)";
  }
  
  function hideBoxDates() {
    let displayDate = document.querySelector(".date-picker__display-date");
    let boxDates = document.querySelector(".date-picker__box-dates");
    boxDates.style.display = "none";
    displayDate.style.borderColor = "rgb(244, 228, 251)";
  }

  return (
    <div className="date-picker">
      <div className="date-picker__display-date"
           onClick={toggleDatePicker}>
        <span>{`${day} ${month} ${year}`}</span>
        <IconCalendar />
      </div>
      <div className="date-picker__box-dates"
           onClick={stopPorop}>
        <div className="months">
          <button onClick={moveBack}>
            <IconArrowLeft />
          </button>
          <span>{`${month} ${year}`}</span>
          <button onClick={moveForward}>
            <IconArrowRight />
          </button>
        </div>
        <div className="days"></div>
      </div>
    </div>
  )
}


const SelectTerm = () => {

  const [ currentTerm, setCurrentTerm ] = useState(30);
  let body = document.querySelector("body");

  function formatDispayTermText(currentTerm) {
    if (currentTerm == 1) {
      return "Net 1 Day";
    } else {
      return `Net ${currentTerm} Days`;
    }
  }

  function handleSelectOption(value) {
    setCurrentTerm(value);
  }

  function toggleBoxOptions(e) {
    e.stopPropagation();
    showOptions();
  }

  body.addEventListener("click", (e) => {
    e.stopPropagation();
    hideOptions();
  })

  function showOptions() {
    let boxOptions = document.querySelector(".select-terms__options-box")
    let boxDates = document.querySelector(".date-picker__box-dates");
    boxOptions.style.display = "block";
    boxDates.style.display = "none";
  }

  function hideOptions() {
    let boxOptions = document.querySelector(".select-terms__options-box")
    boxOptions.style.display = "none";
  }

  return (
    <div className="select-terms">
      <div onClick={toggleBoxOptions} 
           className="select-terms__term-display">
        <span>{formatDispayTermText(currentTerm)}</span>
        <IconArrowDown />
      </div>
      <div className="select-terms__options-box">
        <div onClick={() => handleSelectOption(1)}
             className="option-container" >
          <span>Net 1 Day</span>
        </div>
        <div onClick={() => handleSelectOption(7)}
             className="option-container">
          <span>Net 7 Days</span>
        </div>
        <div onClick={() => handleSelectOption(14)}
             className="option-container">
          <span>Net 14 Days</span>
        </div>
        <div onClick={() => handleSelectOption(30)}
             className="option-container">
          <span>Net 30 Days</span>
        </div>
      </div>
    </div>
  )
}
export default InvoiceForm;