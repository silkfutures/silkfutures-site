(function(){
 const endpoint='https://pathways.silkfutures.com/api/public-applications';
 for(const [id,type,buttonId,statusId] of [['artistForm','join','submit','status'],['refForm','referral','refSubmitBtn','refStatus']]){
  const form=document.getElementById(id);if(!form)continue;
  let requestId=crypto.randomUUID();let sending=false;
  form.addEventListener('submit',async function(event){
   event.preventDefault();if(sending||!form.reportValidity())return;
   sending=true;const button=document.getElementById(buttonId),status=document.getElementById(statusId),label=button.textContent;
   button.disabled=true;button.textContent='Sending…';status.textContent='Saving your enquiry…';status.style.color='';
   const data=new FormData(form),body=Object.fromEntries(data.entries());body.request_id=requestId;body.type=type;body.consent=data.get('contact_consent')==='yes';body.support=data.getAll('support');
   try{const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});let result;try{result=await response.json()}catch{throw Error('We could not confirm your enquiry. Please try again.')}if(!response.ok)throw Error(result.error||'We could not save your enquiry. Please try again.');
    form.reset();requestId=crypto.randomUUID();status.textContent='Thank you — your enquiry has been saved. The Silkfutures team will review it and get back to you.';status.style.color='#047857';
   }catch(error){status.textContent=error.name==='TimeoutError'?'We could not confirm your enquiry yet. Please try again — this will not create a duplicate.':error.message||'Unable to send. Please try again or email toni@silkfutures.com.';status.style.color='#b42318';}
   finally{button.disabled=false;button.textContent=label;sending=false;}
  });
 }
})();
