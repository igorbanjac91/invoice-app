import { useState, useEffect } from "react";

function useWindowSize() {

  const [windowSize, setWindowSize] = useState( {
    width: undefined,
    height: undefined
  })

  useEffect(() => {

    function handleResize() {

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize)
  }, []);

  return windowSize;
}


function formatDate(date) {
  let newDate = new Date(date);
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  let [day, month, year] = [newDate.getDate(), newDate.getMonth(), newDate.getFullYear()];
  let formattedDate = `${day} ${monthNames[month]} ${year}`; 
  return formattedDate
}

function formatPrice(price) {
  return `£ ${Number(price).toFixed(2)}`;
}

export {useWindowSize, formatDate, formatPrice };