
document.querySelector('.menuBtn')?.addEventListener('click',()=>document.querySelector('.nav').classList.toggle('show'));
document.querySelectorAll('[data-details]').forEach(b=>b.onclick=()=>{let c=b.closest('.product');document.querySelectorAll('.product.open').forEach(x=>{if(x!==c)x.classList.remove('open')});c.classList.toggle('open')});
function pickCall(){let x=confirm('OK = Rancho Cucamonga\nCancel = San Bernardino');location.href=x?'tel:19096762900':'tel:19096562600'}
function pickDir(){let x=confirm('OK = Rancho Cucamonga\nCancel = San Bernardino');window.open(x?'https://www.google.com/maps/dir/?api=1&destination=9836+Foothill+Blvd+Suite+6+Rancho+Cucamonga+CA+91730':'https://www.google.com/maps/dir/?api=1&destination=1292+W+Mill+St+Suite+107+San+Bernardino+CA+92410','_blank')}
