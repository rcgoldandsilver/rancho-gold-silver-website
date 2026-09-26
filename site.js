document.querySelector('.menuBtn')?.addEventListener('click',()=>document.querySelector('.nav').classList.toggle('show'));

document.querySelectorAll('[data-details]').forEach(b=>b.onclick=()=>{
  let c=b.closest('.product');
  document.querySelectorAll('.product.open').forEach(x=>{
    if(x!==c)x.classList.remove('open')
  });
  c.classList.toggle('open')
});

let SITE_INFO={
  rancho_phone:'(909) 676-2900',
  sb_phone:'(909) 656-2600',
  rancho_address:'9836 Foothill Blvd, Suite 6, Rancho Cucamonga, CA 91730',
  sb_address:'1292 W Mill St, Suite 107, San Bernardino, CA 92410'
};

function phoneLink(phone){
  return 'tel:+1'+String(phone).replace(/\D/g,'').replace(/^1/,'');
}

function pickCall(){
  let x=confirm('OK = Rancho Cucamonga\nCancel = San Bernardino');
  location.href=phoneLink(x?SITE_INFO.rancho_phone:SITE_INFO.sb_phone);
}

function pickDir(){
  let x=confirm('OK = Rancho Cucamonga\nCancel = San Bernardino');
  let address=x?SITE_INFO.rancho_address:SITE_INFO.sb_address;
  window.open(
    'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(address),
    '_blank'
  );
}

(async()=>{
  try{
    const r=await fetch('content/settings/general.json',{cache:'no-store'});
    if(!r.ok)return;

    const g=await r.json();
    SITE_INFO={...SITE_INFO,...g};

    document.querySelectorAll('.phone').forEach(el=>{
      el.textContent=SITE_INFO.rancho_phone;
    });

    document.querySelectorAll('a[href^="tel:19096762900"]').forEach(el=>{
      el.href=phoneLink(SITE_INFO.rancho_phone);
      if(el.textContent.includes('909')) el.textContent=SITE_INFO.rancho_phone;
    });

   document.querySelectorAll('a[href^="tel:19096562600"]').forEach(el=>{
  el.href=phoneLink(SITE_INFO.sb_phone);
  if(el.textContent.includes('909')) el.textContent=SITE_INFO.sb_phone;
});

document.body.innerHTML=document.body.innerHTML
  .replaceAll('9836 Foothill Blvd, Suite 6', SITE_INFO.rancho_address.split(', Rancho Cucamonga')[0])
  .replaceAll('1292 W Mill St, Suite 107', SITE_INFO.sb_address.split(', San Bernardino')[0]);

  }catch(e){}
})();
