/* =========================================================
   RANCHO CUCAMONGA GOLD & SILVER
   SHARED WEBSITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   DEFAULT SITE INFORMATION
   ========================================================= */

window.SITE_INFO = {

  rancho_location_name:
    "Rancho Cucamonga Gold & Silver",

  sb_location_name:
    "San Bernardino Gold & Silver",

  rancho_phone:
    "(909) 676-2900",

  sb_phone:
    "(909) 656-2600",

  rancho_address:
    "9836 Foothill Blvd, Suite 6, Rancho Cucamonga, CA 91730",

  sb_address:
    "1292 W Mill St, Suite 107, San Bernardino, CA 92410",

  rancho_hours_mon_thu:
    "Mon–Thu 10–7",

  rancho_hours_fri:
    "Fri 10–1, 2–7",

  rancho_hours_sat:
    "Sat 10–7",

  rancho_hours_sun:
    "Sun Closed",

  sb_hours_mon_thu:
    "Mon–Thu 11–7",

  sb_hours_fri:
    "Fri 11–1, 3–7",

  sb_hours_sat:
    "Sat 11–7",

  sb_hours_sun:
    "Sun Closed"

};


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function setText(id, value) {

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return;
  }

  const element =
    document.getElementById(id);

  if (element) {
    element.textContent = value;
  }

}


function setImage(id, value) {

  if (!value) return;

  const element =
    document.getElementById(id);

  if (element) {

    const separator =
      value.includes("?") ? "&" : "?";

    element.src =
      value +
      separator +
      "v=" +
      Date.now();

  }

}


function showAddress(element, address) {

  if (!element || !address) {
    return;
  }

  const parts =
    String(address)
      .split(",")
      .map(part => part.trim());

  if (parts.length >= 3) {

    element.innerHTML =
      parts.slice(0, -2).join(", ")
      +
      "<br>"
      +
      parts.slice(-2).join(", ");

  } else {

    element.textContent = address;

  }

}


function googleMapEmbed(address) {

  return (
    "https://www.google.com/maps?q="
    +
    encodeURIComponent(address)
    +
    "&output=embed"
  );

}


function googleDirections(address) {

  return (
    "https://www.google.com/maps/search/?api=1&query="
    +
    encodeURIComponent(address)
  );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(".menuBtn");

    if (!button) return;

    const header =
      button.closest(".header");

    if (!header) return;

    const nav =
      header.querySelector(".nav");

    if (!nav) return;

    nav.classList.toggle("show");

  }
);


document.addEventListener(
  "click",
  event => {

    const link =
      event.target.closest(".nav a");

    if (!link) return;

    const nav =
      link.closest(".nav");

    if (nav) {
      nav.classList.remove("show");
    }

  }
);


/* =========================================================
   PRODUCT VIEW DETAILS

   IMPORTANT:
   sell.html controls View Details.
   ========================================================= */


/* =========================================================
   PHONE CALLS

   JavaScript does NOT control phone calls.
   Phone links remain normal HTML tel: links.
   ========================================================= */

function pickCall() {
    window.location.href = "tel:+19096762900";
}


/* =========================================================
   GENERAL GET DIRECTIONS
   ALWAYS RANCHO CUCAMONGA
   ========================================================= */

function pickDir() {

  const info =
    window.SITE_INFO;

  window.open(
    googleDirections(
      info.rancho_address
    ),
    "_blank",
    "noopener"
  );

}


/* =========================================================
   APPLY SHARED SITE INFORMATION
   ========================================================= */

function applySharedSiteInfo() {

  const g =
    window.SITE_INFO;


  /* HEADER LOGO */

  if (g.header_logo) {

    document
      .querySelectorAll("#header-logo")
      .forEach(
        logo => {
          const separator = g.header_logo.includes("?") ? "&" : "?";
logo.src = g.header_logo + separator + "v=" + Date.now();
        }
      );

  }


  /* HEADER PHONE TEXT */

  document
    .querySelectorAll(".header .phone")
    .forEach(
      element => {

        element.textContent =
          g.rancho_phone;

      }
    );


  /* LOCATION NAMES */

  setText(
    "footer-rancho-name",
    g.rancho_location_name
  );

  setText(
    "footer-sb-name",
    g.sb_location_name
  );

  setText(
    "rancho-location-name",
    g.rancho_location_name
  );

  setText(
    "sb-location-name",
    g.sb_location_name
  );


  /* FOOTER ADDRESSES */

  showAddress(
    document.getElementById(
      "footer-rancho-address"
    ),
    g.rancho_address
  );

  showAddress(
    document.getElementById(
      "footer-sb-address"
    ),
    g.sb_address
  );


  /* PAGE ADDRESSES */

  showAddress(
    document.getElementById(
      "rancho-location-address"
    ),
    g.rancho_address
  );

  showAddress(
    document.getElementById(
      "sb-location-address"
    ),
    g.sb_address
  );

  showAddress(
    document.getElementById(
      "rancho-address"
    ),
    g.rancho_address
  );

  showAddress(
    document.getElementById(
      "sb-address"
    ),
    g.sb_address
  );


  /* PHONE DISPLAY TEXT ONLY */

  const footerRanchoPhone =
    document.getElementById(
      "footer-rancho-phone"
    );

  if (footerRanchoPhone) {

    footerRanchoPhone.textContent =
      g.rancho_phone;

  }


  const footerSBPhone =
    document.getElementById(
      "footer-sb-phone"
    );

  if (footerSBPhone) {

    footerSBPhone.textContent =
      g.sb_phone;

  }


  setText(
    "rancho-location-phone",
    g.rancho_phone
  );

  setText(
    "sb-location-phone",
    g.sb_phone
  );


  const ranchoPhone =
    document.getElementById(
      "rancho-phone"
    );

  if (ranchoPhone) {

    ranchoPhone.textContent =
      g.rancho_phone;

  }


  const sbPhone =
    document.getElementById(
      "sb-phone"
    );

  if (sbPhone) {

    sbPhone.textContent =
      g.sb_phone;

  }


  /* RANCHO HOURS */

  setText(
    "rancho-hours-mon-thu",
    g.rancho_hours_mon_thu
  );

  setText(
    "rancho-hours-fri",
    g.rancho_hours_fri
  );

  setText(
    "rancho-hours-sat",
    g.rancho_hours_sat
  );

  setText(
    "rancho-hours-sun",
    g.rancho_hours_sun
  );


  /* SAN BERNARDINO HOURS */

  setText(
    "sb-hours-mon-thu",
    g.sb_hours_mon_thu
  );

  setText(
    "sb-hours-fri",
    g.sb_hours_fri
  );

  setText(
    "sb-hours-sat",
    g.sb_hours_sat
  );

  setText(
    "sb-hours-sun",
    g.sb_hours_sun
  );


  /* FOOTER RANCHO HOURS */

  setText(
    "footer-rancho-hours-mon-thu",
    "Rancho Cucamonga: "
    +
    g.rancho_hours_mon_thu
  );

  setText(
    "footer-rancho-hours-fri",
    g.rancho_hours_fri
  );

  setText(
    "footer-rancho-hours-sat",
    g.rancho_hours_sat
  );

  setText(
    "footer-rancho-hours-sun",
    g.rancho_hours_sun
  );


  /* FOOTER SAN BERNARDINO HOURS */

  setText(
    "footer-sb-hours-mon-thu",
    "San Bernardino: "
    +
    g.sb_hours_mon_thu
  );

  setText(
    "footer-sb-hours-fri",
    g.sb_hours_fri
  );

  setText(
    "footer-sb-hours-sat",
    g.sb_hours_sat
  );

  setText(
    "footer-sb-hours-sun",
    g.sb_hours_sun
  );


  /* MAPS */

  const ranchoMap =
    document.getElementById(
      "rancho-map"
    );

  if (ranchoMap) {

    ranchoMap.src =
      googleMapEmbed(
        g.rancho_address
      );

  }


  const sbMap =
    document.getElementById(
      "sb-map"
    );

  if (sbMap) {

    sbMap.src =
      googleMapEmbed(
        g.sb_address
      );

  }


  /* DIRECTIONS */

  const ranchoDirections =
    document.getElementById(
      "rancho-directions"
    );

  if (ranchoDirections) {

    ranchoDirections.href =
      googleDirections(
        g.rancho_address
      );

  }


  const sbDirections =
    document.getElementById(
      "sb-directions"
    );

  if (sbDirections) {

    sbDirections.href =
      googleDirections(
        g.sb_address
      );

  }

}


/* =========================================================
   LOAD GENERAL SETTINGS
   ========================================================= */

async function loadSiteSettings() {

  try {

    const response =
      await fetch(
        "content/settings/general.json?v=" + Date.now(),
        {
          cache: "no-store"
        }
      );

    if (!response.ok) {

      applySharedSiteInfo();
      return;

    }

    const settings =
      await response.json();

    window.SITE_INFO = {

      ...window.SITE_INFO,
      ...settings

    };

    applySharedSiteInfo();

  } catch (error) {

    applySharedSiteInfo();

  }

}


loadSiteSettings();


/* =========================================================
   LIVE METAL TICKER
   ========================================================= */

const METAL_API =
  "https://api.gold-api.com/price/";

const TICKER_CACHE_KEY =
  "rancho-metal-ticker-v2";


/* =========================================================
   MONEY FORMAT
   ========================================================= */

function tickerMoney(value) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  ).format(value);

}


/* =========================================================
   GET METAL PRICE
   ========================================================= */

async function getMetalPrice(symbol) {

  const response =
    await fetch(
      METAL_API + symbol,
      {
        cache: "no-store"
      }
    );

  if (!response.ok) {

    throw new Error(
      "Metal price request failed"
    );

  }

  const data =
    await response.json();

  const price =
    Number(
      data.price ??
      data.ask ??
      data.bid
    );

  if (!Number.isFinite(price)) {

    throw new Error(
      "Invalid metal price"
    );

  }

  return price;

}


/* =========================================================
   PRICE DIRECTION
   ========================================================= */

function getPriceDirection(
  currentPrice,
  previousPrice
) {

  const current =
    Number(currentPrice);

  const previous =
    Number(previousPrice);


  if (
    !Number.isFinite(current) ||
    !Number.isFinite(previous)
  ) {

    return "";

  }


  if (current > previous) {

    return "up";

  }


  if (current < previous) {

    return "down";

  }


  return "";

}


/* =========================================================
   ARROW HTML
   ========================================================= */

function tickerDirectionHTML(direction) {

  if (direction === "up") {

    return (
      ' <span style="color:#35c76f;font-weight:900;font-size:15px;">▲</span>'
    );

  }


  if (direction === "down") {

    return (
      ' <span style="color:#ff5b5b;font-weight:900;font-size:15px;">▼</span>'
    );

  }


  return "";

}


/* =========================================================
   DISPLAY TICKER
   ========================================================= */

function displayMetalTicker(data) {

  if (!data) return;


  document
    .querySelectorAll(".ticker")
    .forEach(
      ticker => {

        const spans =
          ticker.querySelectorAll(
            ":scope > span"
          );


        if (spans.length < 3) {

          return;

        }


        /* GOLD */

        if (
          Number.isFinite(
            Number(data.gold)
          )
        ) {

          spans[0].innerHTML =
            "GOLD <b>"
            +
            tickerMoney(
              Number(data.gold)
            )
            +
            tickerDirectionHTML(
              data.goldDirection
            )
            +
            "</b>";

        }


        /* SILVER */

        if (
          Number.isFinite(
            Number(data.silver)
          )
        ) {

          spans[1].innerHTML =
            "SILVER <b>"
            +
            tickerMoney(
              Number(data.silver)
            )
            +
            tickerDirectionHTML(
              data.silverDirection
            )
            +
            "</b>";

        }


        /* PLATINUM */

        if (
          Number.isFinite(
            Number(data.platinum)
          )
        ) {

          spans[2].innerHTML =
            "PLATINUM <b>"
            +
            tickerMoney(
              Number(data.platinum)
            )
            +
            tickerDirectionHTML(
              data.platinumDirection
            )
            +
            "</b>";

        }

      }
    );

}


/* =========================================================
   READ PREVIOUS TICKER DATA
   ========================================================= */

function getPreviousTickerData() {

  try {

    const saved =
      localStorage.getItem(
        TICKER_CACHE_KEY
      );


    if (!saved) {

      return null;

    }


    return JSON.parse(saved);


  } catch (error) {

    return null;

  }

}


/* =========================================================
   SHOW CACHED PRICES IMMEDIATELY
   ========================================================= */

const previousTickerData =
  getPreviousTickerData();


if (previousTickerData) {

  displayMetalTicker(
    previousTickerData
  );

}


/* =========================================================
   UPDATE LIVE TICKER
   ========================================================= */

async function updateMetalTicker() {

  try {

    /*
       Get the prices that were stored BEFORE
       requesting the new prices.
    */

    const previous =
      getPreviousTickerData();


    /*
       Request all three current prices.
    */

    const [
      gold,
      silver,
      platinum
    ] =
      await Promise.all([

        getMetalPrice("XAU"),

        getMetalPrice("XAG"),

        getMetalPrice("XPT")

      ]);


    /*
       Compare the new prices against the
       previously stored prices.
    */

    const goldDirection =
      previous
        ? getPriceDirection(
            gold,
            previous.gold
          )
        : "";


    const silverDirection =
      previous
        ? getPriceDirection(
            silver,
            previous.silver
          )
        : "";


    const platinumDirection =
      previous
        ? getPriceDirection(
            platinum,
            previous.platinum
          )
        : "";


    /*
       Build the new ticker information.
    */

    const data = {

      gold,

      silver,

      platinum,

      goldDirection,

      silverDirection,

      platinumDirection,

      updated:
        Date.now()

    };


    /*
       Display it.
    */

    displayMetalTicker(data);


    /*
       Save it so the NEXT update can compare
       against these prices.
    */

    try {

      localStorage.setItem(
        TICKER_CACHE_KEY,
        JSON.stringify(data)
      );

    } catch (error) {}


  } catch (error) {

    /*
       If the live API temporarily fails,
       leave the last successful prices visible.
    */

  }

}


/* =========================================================
   FIRST LIVE UPDATE
   ========================================================= */

updateMetalTicker();


/* =========================================================
   REFRESH EVERY 5 MINUTES
   ========================================================= */

setInterval(
  updateMetalTicker,
  300000
);

/* MOBILE HEADER AND MENU IMPROVEMENTS */

@media (max-width:900px){

  .header{
    position:sticky;
    top:0;
    z-index:1000;
    background:#fff;
  }

  .ticker{
    position:relative;
    top:auto;
    z-index:1;
  }

  .nav{
    position:absolute;
    top:100%;
    left:0;
    right:0;
    margin:0;
    max-height:calc(100dvh - 76px);
    overflow-y:auto;
    background:#fff;
    box-shadow:0 8px 18px rgba(0,0,0,.12);
  }

  .nav.show{
    display:flex;
  }

}

@media (max-width:600px){

  .nav{
    max-height:calc(100dvh - 70px);
  }

}

