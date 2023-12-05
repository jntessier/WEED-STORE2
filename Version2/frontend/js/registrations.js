

//------------------------------------------------------------------------------------------------
if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('service_worker.js').then(
      function()
      {
        console.log('[Service worker] Enregistrement terminer...');
      }).catch(function(err) {  console.log('[Service worker] Enregistrement Erreur: ' + err);     });
}
//------------------------------------------------------------------------------------------------    


  var promptDiffere;

  window.addEventListener('beforeinstallprompt', function(event) 
  {
    event.preventDefault();   promptDiffere = event;
    return false;
  });
  