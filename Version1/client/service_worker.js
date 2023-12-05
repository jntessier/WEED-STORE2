
if( 'undefined' === typeof window)
{
  importScripts('/js/globals.js'); 
  importScripts('/js/idb.js');
  importScripts('/js/idb-operations.js');
 
} 



//--------------------------------------------------------------------------------------------------------------------
const versionCache = '1';
const NOM_CACHE_STATIQUE = `cache-statique-${versionCache}`;
const NOM_CACHE_DYNAMIQUE = `cache-dynamique-${versionCache}`;
//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
const ressources = [
  '/',
  '/index.html',
  '/icone.ico',
  '/manifest.webmanifest',

  '/utilitaires/bootstrap-5.2.3-dist/css/bootstrap.min.css',
  '/utilitaires/jquery-3.6.4.min.js',
  '/utilitaires/three.js/jquery-3.6.4.min.js',


  '/css/style.css',
  '/css/main.css',  

  '/js/idb.js', 
  '/js/idb-operations.js', 
  '/js/globals.js',  
  '/js/app.js', 
  '/js/main.js', 
  '/js/registrations.js',
  '/service_worker.js',  
  '/assets/'
];
//--------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------
self.addEventListener('install', function(event) 
{
    event.waitUntil(   caches.open(NOM_CACHE_STATIQUE).then(cache => {  cache.addAll(ressources); })   );
     console.log("[Service Worker] Installation terminer...");
});
//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
self.addEventListener('activate', function(event) 
{
  event.waitUntil(
    caches.keys().then(function(keyList)
    {
        return Promise.all(keyList.map(function(key)
        {          
          console.log("[Service Worker] Activation terminer...");
         
          if (key !== NOM_CACHE_STATIQUE && key !== NOM_CACHE_DYNAMIQUE) {  return caches.delete(key);     }

        }));
    })
  );
 
});
//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
self.addEventListener("fetch", event =>
{
  
  const url = 'http://127.0.0.1:3000/';
  //console.log('[fetch_JSONData()] Awaiting to receive products.json from url: ' + url);

  if (event.request.url.indexOf(url) > -1)
  {
    event.respondWith(fetch(event.request).then((resp) => 
    {
      console.log(resp);
        var cloneResp = resp.clone();
        cloneResp.json().then((products) =>
        {
           viderStore("products");
            for (var product of products) {   enregistrer('products', thisProduct);     }
            return resp;
        })
        return resp;
      })
    )
  }
  else
  { 
      event.respondWith(
      caches.match(event.request).then(response =>
      {
        return (  response ||  fetch(event.request).then(resp => 
        { 
            return caches.open(NOM_CACHE_DYNAMIQUE).then(cache => 
            {
              cache.put(event.request.url, resp.clone());   return resp;
            });
          })
        );
      }).catch(err => {console.log("Error: " + err)})
    );
    }
});
//--------------------------------------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------------------------------------
self.addEventListener('sync', (event) =>
{
  
  if (event.tag === 'sync-nouveau-product') 
  {
    console.log('[Service Worker] sync nouveau product');
    event.waitUntil(
      contenuStore('sync-products').then((products) => 
      {
          for (var thisProduct of products) { console.log("En SW");  console.log(JSON.stringify(thisProduct));
            fetch('/enregistrer', 
            {
              method: 'POST',
              headers: 
              {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               // "mode" : "no-cors"
              },
              body: JSON.stringify(thisProduct)
            })
              .then((res) => {console.log(res);
                
                if (res.ok) 
                {  console.log("le server a recu le nouveau product"); 
                  supprimerElement('sync-products',thisProduct.id);  
                  
                }
              })
              .catch((err) => {  console.log('Erreur :', err);
              });
          }

        })
    );
  }
});
//--------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------
self.addEventListener('notificationclick', (event) => 
{
 
  var notification = event.notification;
  var action       = event.action;

  console.log("Event : notificationclick" + notification);

  if (action === 'accepter') {   console.log('Vous avez choisi accepter');  }
  else if (action === 'infos')
  {
      event.waitUntil(
        clients.matchAll().then((cls) => 
        {
            var client = cls.find((c) =>  {  return c.visibilityState === 'visible';       });

            if (client !== undefined) {      client.navigate(notification.data);         client.focus();       } 
            else                      {      client.openWindow(notification.data);          }
            notification.close();
        })
      );
  }
  else {  console.log(action);  }  notification.close();
});
//--------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------
self.addEventListener('push', (event) =>
{

  const obj = event.data.json();
  
  const options = 
  {
    body: obj.content,
    data: obj.url,
    icon: 'icone.ico',
    badge: 'assets/images/icons/icone.72.png',
    actions: [  { action: 'infos', title: 'Infos', icon: 'assets/images/icons/icone.96.png'}     ]
  };
  event.waitUntil(self.registration.showNotification(obj.title, options));
});
//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
self.addEventListener('notificationclose', (event) => 
{ 
   console.log('[Event:notificationclose] - ', event); 
});
//--------------------------------------------------------------------------------------------------------------------
