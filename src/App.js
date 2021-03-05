import React, { useState, useEffect } from "react";
import "./style.css";

// In this challenge you are asked to build a calendar app. This app has the following requirements:
// Each square in the calendar is programmatically generated w/ the following info in it (3rd party library may be used to style/layout) Day
// Number of tasks in the center of the square
// Use state management (either Redux or useContext) to pass tasks down to the calendar
// When the date is clicked on, a modal should pop us using data from state management to load tasks
// Unit tests should be added to cover functionality

export default function App() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [dates, setDates] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  useEffect(() => {
    let datesArray = [];
    const monthFirst = new Date(year, month, 1);
    const monthLast = new Date(year, month + 1, 0);
    const lastDate = monthLast.getDate();
    const firstDay = monthFirst.getDay();

    let j = 1;
    while (j <= lastDate) {
      let datesRow = Array(7).fill(null);
      for (let i = 0; i < datesRow.length; i++) {
        if (!datesArray.length) {
          if (i >= firstDay) {
            datesRow.fill(j, i, i + 1);
            j++;
          }
        } else {
          datesRow.fill(j, i, i + 1);
          j++;
          if (j > lastDate) {
            break;
          }
        }
      }
      datesArray.push(datesRow);
    }
    setDates(datesArray);
  }, [year, month]);

  const setYearHandler = year => {
    setYear(year);
    setDates([]);
  };

  const setMonthHandler = month => {
    if (month < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (month > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month);
    }
    setDates([]);
  };

  return (
    <div className="calendar">
      <section className="header">
        <button className="button" onClick={() => setYearHandler(year - 1)}>
          &lt;&lt;
        </button>
        <button className="button" onClick={() => setMonthHandler(month - 1)}>
          &lt;
        </button>
        <h3>
          {months[month]} {year}
        </h3>
        <button className="button" onClick={() => setMonthHandler(month + 1)}>
          &gt;
        </button>
        <button className="button" onClick={() => setYearHandler(year + 1)}>
          &gt;&gt;
        </button>
      </section>
      <table className="month-calendar">
        <thead className="week-days">
          <tr className="table-row">
            <th className="table-heading">Sun</th>
            <th className="table-heading">Mon</th>
            <th className="table-heading">Tue</th>
            <th className="table-heading">Wed</th>
            <th className="table-heading">Thu</th>
            <th className="table-heading">Fri</th>
            <th className="table-heading">Sat</th>
          </tr>
        </thead>
        <tbody>
          {dates.map(dateRow => {
            return (
              <tr className="table-row">
                {dateRow.map(eachDate => {
                  return (
                    <td className="table-desc" key={eachDate}>
                      {eachDate}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
