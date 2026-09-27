/* =========================================================
   RANCHO CUCAMONGA GOLD & SILVER
   SHARED WEBSITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   DEFAULT SITE INFORMATION
   These values are used if general.json cannot be loaded.
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

function cleanPhone(phone){

  return String(phone || "")
    .replace(/\D/g,"");

}



function setText(id,value){

  if(
    value === undefined ||
    value === null ||
    value === ""
  ){
    return;
  }


  const element =
    document.getElementById(id);


  if(element){
    element.textContent=value;
  }

}



function setImage(id,value){

  if(!value)return;


  const element =
    document.getElementById(id);


  if(element){
    element.src=value;
  }

}



function showAddress(
  element,
  address
){

  if(
    !element ||
    !address
  ){
    return;
  }


  const parts =
    String(address)
      .split(",")
      .map(
        part=>part.trim()
      );


  if(parts.length>=3){

    element.innerHTML =
      parts.slice(0,-2).join(", ")
      +
      "<br>"
      +
      parts.slice(-2).join(", ");

  }else{

    element.textContent=
      address;

  }

}



function googleMapEmbed(address){

  return (
    "https://www.google.com/maps?q="
    +
    encodeURIComponent(address)
    +
    "&output=embed"
  );

}



function googleDirections(address){

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
  event=>{

    const button =
      event.target.closest(
        ".menuBtn"
      );


    if(!button)return;


    const header =
      button.closest(
        ".header"
      );


    if(!header)return;


    const nav =
      header.querySelector(
        ".nav"
      );


    if(nav){

      nav.classList.toggle(
        "open"
      );

    }

  }
);



/* =========================================================
   PRODUCT DETAILS
   Works for static product cards.
   Dynamic sell.html cards have their own handler.
   ========================================================= */

document.addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest(
        "[data-details]"
      );


    if(!button)return;


    /*
      sell.html dynamically handles its own
      product buttons. If that button is inside
      a dynamic product, do not toggle it twice.
    */

    if(
      button.closest(
        "[data-dynamic-product='true']"
      )
    ){
      return;
    }


    const product =
      button.closest(
        ".product"
      );


    if(!product)return;


    product.classList.toggle(
      "open"
    );


    button.textContent =
      product.classList.contains(
        "open"
      )
        ? "Hide Details"
        : "View Details";

  }
);



/* =========================================================
   CALL / DIRECTIONS CHOOSER
   ========================================================= */

function pickCall(){

  const info =
    window.SITE_INFO;


  const choice =
    window.confirm(
      "Press OK for Rancho Cucamonga.\nPress Cancel for San Bernardino."
    );


  const phone =
    choice
      ? info.rancho_phone
      : info.sb_phone;


  window.location.href =
    "tel:"
    +
    cleanPhone(phone);

}



function pickDir(){

  const info =
    window.SITE_INFO;


  const choice =
    window.confirm(
      "Press OK for Rancho Cucamonga.\nPress Cancel for San Bernardino."
    );


  const address =
    choice
      ? info.rancho_address
      : info.sb_address;


  window.open(
    googleDirections(address),
    "_blank",
    "noopener"
  );

}



/* =========================================================
   APPLY SHARED SITE INFORMATION
   ========================================================= */

function applySharedSiteInfo(){

  const g =
    window.SITE_INFO;



  /* -------------------------
     HEADER LOGO
     ------------------------- */

  if(g.header_logo){

    document
      .querySelectorAll(
        "#header-logo"
      )
      .forEach(
        logo=>{
          logo.src=
            g.header_logo;
        }
      );

  }



  /* -------------------------
     HEADER PHONE
     ------------------------- */

  document
    .querySelectorAll(
      ".header .phone"
    )
    .forEach(
      element=>{

        element.textContent =
          g.rancho_phone;


        if(
          element.tagName === "A"
        ){

          element.href =
            "tel:"
            +
            cleanPhone(
              g.rancho_phone
            );

        }

      }
    );



  /* -------------------------
     LOCATION NAMES
     ------------------------- */

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



  /* -------------------------
     FOOTER ADDRESSES
     ------------------------- */

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



  /* -------------------------
     PAGE ADDRESSES
     ------------------------- */

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



  /* -------------------------
     FOOTER PHONES
     ------------------------- */

  const footerRanchoPhone =
    document.getElementById(
      "footer-rancho-phone"
    );


  if(footerRanchoPhone){

    footerRanchoPhone.textContent =
      g.rancho_phone;

    footerRanchoPhone.href =
      "tel:"
      +
      cleanPhone(
        g.rancho_phone
      );

  }



  const footerSBPhone =
    document.getElementById(
      "footer-sb-phone"
    );


  if(footerSBPhone){

    footerSBPhone.textContent =
      g.sb_phone;

    footerSBPhone.href =
      "tel:"
      +
      cleanPhone(
        g.sb_phone
      );

  }



  /* -------------------------
     LOCATION PAGE PHONES
     ------------------------- */

  setText(
    "rancho-location-phone",
    g.rancho_phone
  );


  const ranchoLocationPhoneLink =
    document.getElementById(
      "rancho-location-phone-link"
    );


  if(ranchoLocationPhoneLink){

    ranchoLocationPhoneLink.href =
      "tel:"
      +
      cleanPhone(
        g.rancho_phone
      );

  }



  setText(
    "sb-location-phone",
    g.sb_phone
  );


  const sbLocationPhoneLink =
    document.getElementById(
      "sb-location-phone-link"
    );


  if(sbLocationPhoneLink){

    sbLocationPhoneLink.href =
      "tel:"
      +
      cleanPhone(
        g.sb_phone
      );

  }



  /* -------------------------
     INDIVIDUAL STORE PHONES
     ------------------------- */

  const ranchoPhone =
    document.getElementById(
      "rancho-phone"
    );


  if(ranchoPhone){

    ranchoPhone.textContent =
      g.rancho_phone;

    ranchoPhone.href =
      "tel:"
      +
      cleanPhone(
        g.rancho_phone
      );

  }



  const sbPhone =
    document.getElementById(
      "sb-phone"
    );


  if(sbPhone){

    sbPhone.textContent =
      g.sb_phone;

    sbPhone.href =
      "tel:"
      +
      cleanPhone(
        g.sb_phone
      );

  }



  /* -------------------------
     CALL BUTTONS
     ------------------------- */

  const ranchoCallButton =
    document.getElementById(
      "rancho-call-button"
    );


  if(ranchoCallButton){

    ranchoCallButton.href =
      "tel:"
      +
      cleanPhone(
        g.rancho_phone
      );

  }



  const sbCallButton =
    document.getElementById(
      "sb-call-button"
    );


  if(sbCallButton){

    sbCallButton.href =
      "tel:"
      +
      cleanPhone(
        g.sb_phone
      );

  }



  const sellCallButton =
    document.getElementById(
      "sell-call-button"
    );


  if(sellCallButton){

    sellCallButton.textContent =
      "Rancho: "
      +
      g.rancho_phone;


    sellCallButton.href =
      "tel:"
      +
      cleanPhone(
        g.rancho_phone
      );

  }



  /* -------------------------
     PRODUCT CALL BUTTONS
     ------------------------- */

  document
    .querySelectorAll(
      ".product-call"
    )
    .forEach(
      link=>{

        link.href =
          "tel:"
          +
          cleanPhone(
            g.rancho_phone
          );

      }
    );



  /* -------------------------
     RANCHO HOURS
     ------------------------- */

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



  /* -------------------------
     SAN BERNARDINO HOURS
     ------------------------- */

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



  /* -------------------------
     FOOTER RANCHO HOURS
     ------------------------- */

  setText(
    "footer-rancho-hours-mon-thu",
    "Rancho: "
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



  /* -------------------------
     FOOTER SAN BERNARDINO HOURS
     ------------------------- */

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



  /* -------------------------
     MAPS
     ------------------------- */

  const ranchoMap =
    document.getElementById(
      "rancho-map"
    );


  if(ranchoMap){

    ranchoMap.src =
      googleMapEmbed(
        g.rancho_address
      );

  }



  const sbMap =
    document.getElementById(
      "sb-map"
    );


  if(sbMap){

    sbMap.src =
      googleMapEmbed(
        g.sb_address
      );

  }



  /* -------------------------
     DIRECTIONS BUTTONS
     ------------------------- */

  const ranchoDirections =
    document.getElementById(
      "rancho-directions"
    );


  if(ranchoDirections){

    ranchoDirections.href =
      googleDirections(
        g.rancho_address
      );

  }



  const sbDirections =
    document.getElementById(
      "sb-directions"
    );


  if(sbDirections){

    sbDirections.href =
      googleDirections(
        g.sb_address
      );

  }

}



/* =========================================================
   LOAD GENERAL SETTINGS
   ========================================================= */

async function loadSiteSettings(){

try{

const response =
  await fetch(
    "content/settings/general.json",
    {
      cache:"no-store"
    }
  );


if(!response.ok){

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


}catch(error){

applySharedSiteInfo();

}

}



loadSiteSettings();



/* =========================================================
   LIVE METAL TICKER
   ========================================================= */

const METAL_API =
  "https://api.gold-api.com/price/";

const DIRECTION_API =
  "https://rancho-gold-admin-auth.rcgoldandsilverllc.workers.dev/metal-direction";

const TICKER_CACHE_KEY =
  "rancho-metal-ticker-v1";



function tickerMoney(value){

  return new Intl.NumberFormat(
    "en-US",
    {
      style:"currency",
      currency:"USD",
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  ).format(value);

}



async function getMetalPrice(symbol){

  const response =
    await fetch(
      METAL_API + symbol,
      {
        cache:"no-store"
      }
    );


  if(!response.ok){

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


  if(!Number.isFinite(price)){

    throw new Error(
      "Invalid metal price"
    );

  }


  return price;

}



async function getMetalDirections(){

try{

const response =
  await fetch(
    DIRECTION_API,
    {
      cache:"no-store"
    }
  );


if(!response.ok){
  return {};
}


return await response.json();


}catch(error){

return {};

}

}



function directionValue(
  directions,
  symbol
){

  if(!directions){
    return null;
  }


  if(
    directions[symbol] !== undefined
  ){

    return directions[symbol];

  }


  if(
    directions[
      symbol.toLowerCase()
    ] !== undefined
  ){

    return directions[
      symbol.toLowerCase()
    ];

  }


  const names = {

    XAU:"gold",
    XAG:"silver",
    XPT:"platinum"

  };


  return directions[
    names[symbol]
  ];

}



function tickerArrow(value){

  if(
    value === undefined ||
    value === null ||
    value === ""
  ){

    return "";

  }


  const text =
    String(value)
      .toLowerCase();


  if(
    text.includes("up") ||
    text.includes("higher") ||
    text === "1" ||
    text === "+"
  ){

    return " ▲";

  }


  if(
    text.includes("down") ||
    text.includes("lower") ||
    text === "-1" ||
    text === "-"
  ){

    return " ▼";

  }


  return "";

}



/* =========================================================
   DISPLAY TICKER
   ========================================================= */

function displayMetalTicker(data){

  if(!data)return;


  document
    .querySelectorAll(
      ".ticker"
    )
    .forEach(
      ticker=>{

        const spans =
          ticker.querySelectorAll(
            "span"
          );


        if(spans.length<3){
          return;
        }


        if(
          Number.isFinite(
            Number(data.gold)
          )
        ){

          spans[0].innerHTML =
            "GOLD <b>"
            +
            tickerMoney(
              Number(data.gold)
            )
            +
            tickerArrow(
              data.goldDirection
            )
            +
            "</b>";

        }


        if(
          Number.isFinite(
            Number(data.silver)
          )
        ){

          spans[1].innerHTML =
            "SILVER <b>"
            +
            tickerMoney(
              Number(data.silver)
            )
            +
            tickerArrow(
              data.silverDirection
            )
            +
            "</b>";

        }


        if(
          Number.isFinite(
            Number(data.platinum)
          )
        ){

          spans[2].innerHTML =
            "PLATINUM <b>"
            +
            tickerMoney(
              Number(data.platinum)
            )
            +
            tickerArrow(
              data.platinumDirection
            )
            +
            "</b>";

        }

      }
    );

}



/* =========================================================
   LOAD CACHED TICKER IMMEDIATELY
   ========================================================= */

try{

const cached =
  localStorage.getItem(
    TICKER_CACHE_KEY
  );


if(cached){

  displayMetalTicker(
    JSON.parse(cached)
  );

}

}catch(error){}



/* =========================================================
   UPDATE TICKER
   ========================================================= */

async function updateMetalTicker(){

try{

const [
  gold,
  silver,
  platinum,
  directions
] =
  await Promise.all([

    getMetalPrice("XAU"),

    getMetalPrice("XAG"),

    getMetalPrice("XPT"),

    getMetalDirections()

  ]);


const data = {

  gold,
  silver,
  platinum,

  goldDirection:
    directionValue(
      directions,
      "XAU"
    ),

  silverDirection:
    directionValue(
      directions,
      "XAG"
    ),

  platinumDirection:
    directionValue(
      directions,
      "XPT"
    ),

  updated:
    Date.now()

};


displayMetalTicker(data);


try{

  localStorage.setItem(
    TICKER_CACHE_KEY,
    JSON.stringify(data)
  );

}catch(error){}


}catch(error){

/*
  If the live API is temporarily unavailable,
  the cached ticker remains visible.
*/

}

}



updateMetalTicker();


setInterval(
  updateMetalTicker,
  300000
);
