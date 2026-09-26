document.querySelector('.menuBtn')?.addEventListener('click',()=>{
  document.querySelector('.nav')?.classList.toggle('show');
});

document.querySelectorAll('[data-details]').forEach(b=>{
  b.onclick=()=>{
    const c=b.closest('.product');

    document.querySelectorAll('.product.open').forEach(x=>{
      if(x!==c)x.classList.remove('open');
    });

    c?.classList.toggle('open');
  };
});


let SITE_INFO={
  rancho_phone:'(909) 676-2900',
  sb_phone:'(909) 656-2600',
  rancho_address:'9836 Foothill Blvd, Suite 6, Rancho Cucamonga, CA 91730',
  sb_address:'1292 W Mill St, Suite 107, San Bernardino, CA 92410'
};


function phoneLink(phone){

  return 'tel:+1'+String(phone)
    .replace(/\D/g,'')
    .replace(/^1/,'');
}


function pickCall(){

  const x=confirm(
    'OK = Rancho Cucamonga\nCancel = San Bernardino'
  );

  location.href=phoneLink(
    x ? SITE_INFO.rancho_phone : SITE_INFO.sb_phone
  );
}


function pickDir(){

  const x=confirm(
    'OK = Rancho Cucamonga\nCancel = San Bernardino'
  );

  const address=x
    ? SITE_INFO.rancho_address
    : SITE_INFO.sb_address;

  window.open(
    'https://www.google.com/maps/dir/?api=1&destination='+
    encodeURIComponent(address),
    '_blank'
  );
}


/* =========================================
   SAFE TEXT REPLACEMENT
   ========================================= */

function replacePageText(oldText,newText){

  const walker=document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  let node;

  while((node=walker.nextNode())){

    if(node.nodeValue.includes(oldText)){

      node.nodeValue=
        node.nodeValue.replaceAll(
          oldText,
          newText
        );

    }

  }
}


/* =========================================
   ADDRESS PARTS
   ========================================= */

function addressParts(address){

  const parts=String(address)
    .split(',')
    .map(x=>x.trim());

  return {
    street:parts.slice(0,2).join(', '),
    city:parts.slice(2).join(', ')
  };
}


/* =========================================
   WEBSITE SETTINGS
   ========================================= */

(async()=>{

  try{

    const r=await fetch(
      'content/settings/general.json',
      {cache:'no-store'}
    );

    if(!r.ok)return;

    const g=await r.json();

    SITE_INFO={
      ...SITE_INFO,
      ...g
    };


    /* HEADER PHONE */

    document.querySelectorAll('.phone').forEach(el=>{

      el.textContent=
        SITE_INFO.rancho_phone;

    });


    /* RANCHO PHONE */

    document.querySelectorAll(
      'a[href^="tel:19096762900"], a[href^="tel:+19096762900"]'
    ).forEach(el=>{

      el.href=
        phoneLink(SITE_INFO.rancho_phone);

      if(el.textContent.includes('909')){

        el.textContent=
          SITE_INFO.rancho_phone;

      }

    });


    /* SAN BERNARDINO PHONE */

    document.querySelectorAll(
      'a[href^="tel:19096562600"], a[href^="tel:+19096562600"]'
    ).forEach(el=>{

      el.href=
        phoneLink(SITE_INFO.sb_phone);

      if(el.textContent.includes('909')){

        el.textContent=
          SITE_INFO.sb_phone;

      }

    });


    /* ADDRESSES */

    const rancho=
      addressParts(SITE_INFO.rancho_address);

    const sb=
      addressParts(SITE_INFO.sb_address);


    replacePageText(
      '9836 Foothill Blvd, Suite 6',
      rancho.street
    );

    replacePageText(
      'Rancho Cucamonga, CA 91730',
      rancho.city
    );

    replacePageText(
      '1292 W Mill St, Suite 107',
      sb.street
    );

    replacePageText(
      'San Bernardino, CA 92410',
      sb.city
    );


    /* GOOGLE MAPS */

    document.querySelectorAll(
      'iframe.map'
    ).forEach(frame=>{

      const src=
        frame.getAttribute('src') || '';


      if(
        src.includes('9836+Foothill') ||
        src.includes('Rancho+Cucamonga')
      ){

        frame.src=
          'https://www.google.com/maps?q='+
          encodeURIComponent(
            SITE_INFO.rancho_address
          )+
          '&output=embed';

      }

      else if(
        src.includes('1292+W+Mill') ||
        src.includes('San+Bernardino')
      ){

        frame.src=
          'https://www.google.com/maps?q='+
          encodeURIComponent(
            SITE_INFO.sb_address
          )+
          '&output=embed';

      }

    });

  }catch(e){}

})();


/* =========================================
   LIVE PRECIOUS METAL PRICES
   ========================================= */

const METAL_API=
  'https://api.gold-api.com/price/';


const DIRECTION_API=
  'https://rancho-gold-admin-auth.rcgoldandsilverllc.workers.dev/metal-direction';


const TICKER_CACHE_KEY=
  'ranchoMetalTicker';


async function getMetalPrice(symbol){

  const r=await fetch(
    METAL_API+symbol,
    {cache:'no-store'}
  );

  if(!r.ok){

    throw new Error(
      'Price unavailable'
    );

  }

  const data=
    await r.json();

  const price=
    Number(data.price);

  if(!Number.isFinite(price)){

    throw new Error(
      'Invalid price'
    );

  }

  return price;
}


/* =========================================
   GET MARKET DIRECTION
   ========================================= */

async function getMetalDirections(){

  try{

    const r=await fetch(
      DIRECTION_API,
      {cache:'no-store'}
    );

    if(!r.ok){
      return {};
    }

    return await r.json();

  }catch(e){

    return {};

  }

}


/* =========================================
   DIRECTION ARROW
   ========================================= */

function tickerArrow(direction){

  if(direction==='up'){

    return (
      '<span style="'+
      'color:#188038;'+
      'font-weight:800;'+
      'margin-left:4px;'+
      '">▲</span>'
    );

  }


  if(direction==='down'){

    return (
      '<span style="'+
      'color:#c5221f;'+
      'font-weight:800;'+
      'margin-left:4px;'+
      '">▼</span>'
    );

  }


  return '';
}


/* =========================================
   DISPLAY TICKER
   ========================================= */

function displayMetalTicker(
  gold,
  silver,
  platinum,
  directions={}
){

  const ticker=
    document.querySelector('.ticker');

  if(!ticker)return;


  const goldArrow=
    tickerArrow(
      directions?.XAU?.direction
    );


  const silverArrow=
    tickerArrow(
      directions?.XAG?.direction
    );


  const platinumArrow=
    tickerArrow(
      directions?.XPT?.direction
    );


  ticker.innerHTML=

    '<span>GOLD <b>$'+

    Number(gold).toLocaleString(
      'en-US',
      {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }
    )+

    '</b>'+
    goldArrow+
    '</span>'+


    '<span>SILVER <b>$'+

    Number(silver).toLocaleString(
      'en-US',
      {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }
    )+

    '</b>'+
    silverArrow+
    '</span>'+


    '<span>PLATINUM <b>$'+

    Number(platinum).toLocaleString(
      'en-US',
      {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }
    )+

    '</b>'+
    platinumArrow+
    '</span>';

}


/* =========================================
   SHOW SAVED PRICES IMMEDIATELY
   ========================================= */

function loadSavedTicker(){

  try{

    const saved=
      localStorage.getItem(
        TICKER_CACHE_KEY
      );

    if(!saved)return;


    const data=
      JSON.parse(saved);


    if(
      Number.isFinite(data.gold) &&
      Number.isFinite(data.silver) &&
      Number.isFinite(data.platinum)
    ){

      displayMetalTicker(
        data.gold,
        data.silver,
        data.platinum,
        data.directions || {}
      );

    }

  }catch(e){}

}


/* =========================================
   SAVE LAST SUCCESSFUL TICKER
   ========================================= */

function saveTicker(
  gold,
  silver,
  platinum,
  directions
){

  try{

    localStorage.setItem(
      TICKER_CACHE_KEY,
      JSON.stringify({

        gold,
        silver,
        platinum,
        directions,
        savedAt:Date.now()

      })
    );

  }catch(e){}

}


/* =========================================
   UPDATE TOP TICKER
   ========================================= */

async function updateMetalTicker(){

  const ticker=
    document.querySelector('.ticker');

  if(!ticker)return;


  try{

    const [
      gold,
      silver,
      platinum,
      directions
    ]=await Promise.all([

      getMetalPrice('XAU'),

      getMetalPrice('XAG'),

      getMetalPrice('XPT'),

      getMetalDirections()

    ]);


    displayMetalTicker(
      gold,
      silver,
      platinum,
      directions
    );


    saveTicker(
      gold,
      silver,
      platinum,
      directions
    );


  }catch(e){

    /*
      Saved prices remain visible if
      the API is temporarily unavailable.
    */

  }

}


/* =========================================
   SHOW SAVED PRICE FIRST
   ========================================= */

loadSavedTicker();


/* =========================================
   GET FRESH PRICE
   ========================================= */

updateMetalTicker();


/* =========================================
   REFRESH EVERY 5 MINUTES
   ========================================= */

setInterval(
  updateMetalTicker,
  5*60*1000
);
