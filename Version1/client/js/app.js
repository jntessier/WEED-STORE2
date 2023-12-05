const LOG_ENABLED = GLOBALS.APP_DEBUG; 


if( 'undefined' === typeof window)
{
  importScripts('/js/globals.js');   importScripts('/js/idb.js');  importScripts('/js/idb-operations.js'); 
} 

function Test(thisTest)
{   
  if (LOG_ENABLED) console.log("[Test(thisTest)] STARTED... thisTest = " + thisTest);

  if (thisTest === 'fs')
  {
    let filename = "ProductDetails.html";
    console.log("[Test(thisTest)] READING FILE = " + filename);
    let FileContent = fs.readFileSync(filename, 'utf8');
    console.log("[Test(thisTest)] FileContent = " + FileContent);
  }
}


//--------------------------------------------------------------------------------------------------------------------
function Init()
{       
  if (LOG_ENABLED) console.log("[Init()] STARTED...");

  if (document.querySelector(".background"))  InitBackground();  
                                              InitGUI();
                                              Refresh(); 
  
 // Test('fs');
}
//--------------------------------------------------------------------------------------------------------------------

function InitBackground()
{
  if (LOG_ENABLED) console.log("[InitBackground()] STARTED...");
   
    const particles = Particles.init(
    {
        selector: ".background",
        color: ["#03dac6", "#ff0266", "#000000"],
        connectParticles: true,
        responsive: [
        {
            breakpoint: 768,
            options: {
            color: ["#faebd7", "#03dac6", "#ff0266"],
            maxParticles: 43,
            connectParticles: false
            }
        }
        ]
    });
}
//--------------------------------------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------------------------------------
function InitGUI()
{
  if (LOG_ENABLED) console.log("[InitGUI()] STARTED...");

 


}
//--------------------------------------------------------------------------------------------------------------------


//MARK: EVENTS
//--------------------------------------------------------------------------------------------------------------------
function LangueOptions_OnChanged(GUIElement)  
{  
    if (LOG_ENABLED) console.log("[LangueOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
     alert("[LangueOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
    Refresh();
}
//--------------------------------------------------------------------------------------------------------------------
function ThemeOptions_OnChanged(GUIElement)  
{  
    if (LOG_ENABLED) console.log("[ThemeOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
     alert("[ThemeOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
    Refresh();
}
//--------------------------------------------------------------------------------------------------------------------
function CategoriesOptions_OnChanged(GUIElement)  
{  
    if (LOG_ENABLED) console.log("[CategoriesOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
    //alert("[CategoriesOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
    Refresh();
}
//--------------------------------------------------------------------------------------------------------------------
function SortByOptions_OnChanged(GUIElement)  
{  
    if (LOG_ENABLED) console.log("[SortByOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
    alert("[SortByOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
    Refresh();
}
//--------------------------------------------------------------------------------------------------------------------
function OrderByOptions_OnChanged(GUIElement)  
{  
    if (LOG_ENABLED) console.log("[OrderByOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
    alert("[OrderByOptions_OnChanged(GUIElement)] STARTED... \t GUIElement.value = " + GUIElement.value);
    Refresh();
}
//--------------------------------------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------------------------------------
function generateHTML_ProductList(ProductCard)
{ 
  if (LOG_ENABLED) console.log("[generateHTML_ProductList(ProductCard)] STARTED... \t ProductCard = " + ProductCard);
  
  
  //a debugguer flip card
  /*let TextString = `<div class="card"><div class="card__content"><div class="flip">
                      <div class="front">
                              <div class="card__title text-shadow">${ProductCard.provider}</div>
                              <img src=${ProductCard.image} alt=${ProductCard.name} class="card__image">
                              <form action="/ProductDetails" method="post">
                                <input type="hidden" name="id" id="id" value="4">
                                <button type="submit" class="btn-perso">VOIR DETAILS</button>
                              </form>
                              <div class="card__title">${ProductCard.name}</div>
                              <p class="card__text"><b>Description:\n</b>${ProductCard.description}</p>
                              <p class="card__text"><b>Categorie:</b>${ProductCard.categorie}</p>
                              <p class="card__text"><b>Rating:</b>${ProductCard.rating}</p>
                              <p class="card__text"></p>
                      </div></div>
                      <div class="back">
                           <div class="card__title">${ProductCard.name}</div>
                              <p class="card__text"><b>Description:\n</b>${ProductCard.description}</p>
                              <p class="card__text"><b>Categorie:</b>${ProductCard.categorie}</p>
                              <p class="card__text"><b>Rating:</b>${ProductCard.rating}</p>
                      </div>
                    </div>
              </div>`;*/

/*
  let TextString = `<div class="card">< class="card__content">
                      <div class="front">
                              <div class="card__title text-shadow">${ProductCard.provider}</div>
                              <img src=${ProductCard.image} alt=${ProductCard.name} class="card__image">
                              <form action="/ProductDetails" method="post">
                                <input type="hidden" name="id" id="id" value="4">
                                <button type="submit" class="btn-perso">VOIR DETAILS</button>
                              </form>
                              <div class="card__title">${ProductCard.name}</div>
                              <p class="card__text"><b>Description:\n</b>${ProductCard.description}</p>
                              <p class="card__text"><b>Categorie:</b>${ProductCard.categorie}</p>
                              <p class="card__text"><b>Rating:</b>${ProductCard.rating}</p>
                              <p class="card__text"></p>
                      </div>
                      <div class="back"></div>
                    </div>
              </div>`;*/


              let TextString = `<div class="card"><div class="card__content">
                  <div class="front">
                      <div class="card__title text-shadow">${ProductCard.provider}</div>
                      <img src=${ProductCard.image} alt=${ProductCard.name} class="card__image">
                      <form action="/ProductDetails" method="post">
                          <input type="hidden" name="id" id="id" value="4">
                          <button type="submit" class="btn-perso">VOIR DETAILS</button>
                        </form>
                        <div class="card__title">${ProductCard.name}</div>
                        <p class="card__text"><b>Description: </b><br>${ProductCard.description}</p>
                        <p class="card__text"><b>Categorie: </b>${ProductCard.categorie}</p>
                        <p class="card__text"><b>Rating: </b>${ProductCard.rating}</p>
                        <p class="card__text"></p>
                  </div>
                  <div class="back"></div>
              </div>
            </div>`;
          
      return TextString;
} 
//--------------------------------------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------------------------------------
function Refresh_ProductsList(Categorie)
{             
        if (LOG_ENABLED) console.log('[Refresh_ProductsList(Categorie)] STARTED...\t Categorie = ' + Categorie);
  
          let   CodeHTML =  '<div class="row">';
          let thisCategorie = Categorie.toLowerCase();
                         
          for (thisProduct of ProductsList)
          {    
            if(thisProduct.categorie === thisCategorie || thisCategorie === 'toutes')  
            {
                CodeHTML += generateHTML_ProductList(thisProduct);  
            }
          };
          
          CodeHTML+=`</div>`;    
          document.getElementById('main').innerHTML = CodeHTML;   
  
    
} 
//--------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------
async function fetch_Products()
{   
    if (LOG_ENABLED) console.log("[app.js] - fetch_Products() -> STARTED...");

   // let url = 'http://127.0.0.1:8080/assets/json/products.json';  
    let url = 'http://127.0.0.1:3000/products';  
    let reponse = [];
    try{   
        reponse = await fetch(url);
        reponse = await reponse.json(); 
    }catch(err){  console.log("[fetch_Products] Cannot received products.json"); reponse=[];   return reponse; }
    
    if (reponse.length > 0 ) 
    {
       console.log("Received products.json");  console.log(reponse); 
    //   fs.writeFileSync("../assets/json/products.json", JSON.stringify(reponse)); 
         
    }

    return reponse;
}
//--------------------------------------------------------------------------------------------------------------------


//MARK: REFRESH
async function Refresh_Data()
{
  if (LOG_ENABLED) console.log("[app.js] - Refresh_Data() -> STARTED...");
  await fetch_Products().then((JSONData) => 
  {    
    
    if(JSONData.length > 0 ) 
    { 
      let lastSize = ProductsList.length;
       ProductsList = JSONData;
       if (lastSize != ProductsList.length) Refresh_ProductsList(getSelectedCategorie());  
    }
                
   
  
    console.log("[Refresh_Data()] JSONData.length: " + JSONData.length);    
    console.log("[Refresh_Data()] ProductsList.length: " + ProductsList.length);
    
  })

  await contenuStore('products').then((dataStore) => 
  {
    
        console.log("[Refresh_Data()] dataStore(products).length: " + dataStore.length);
        //si ProductsList recupere les donnee du json et la table products est diffenrent, j'update les donnees
        if (ProductsList.length != 0 && dataStore.length != ProductsList.length)
        {

          console.log("Sauvegarde des products dans la db products...");
          if (dataStore.length > 0 ) viderStore("products");
          for (var thisProduct of ProductsList) {   enregistrer('products', thisProduct);     }
        }
    
    
   
    
  })

}
//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
function Refresh() 
{   
    if (LOG_ENABLED) console.log("[app.js] - Refresh() -> STARTED..."); 
     Refresh_Data(); 
     Refresh_ProductsList(getSelectedCategorie()); 
  
}
//--------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------
function requestPermission()
{
  if (LOG_ENABLED) console.log("[app.js] - requestPermission() -> STARTED...");

  Notification.requestPermission((resp) => 
  {
    if (resp !== 'granted') {   console.log('Permission refusée!');  document.getElementById("btn_notification").innerText = "Notification_OFF";  } 
    else                    {   console.log("Permission acceptée");    configurePushSub();   }
  });
}
//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
function getSelectedCategorie()
{
  if (LOG_ENABLED) console.log("[app.js] - getSelectedCategorie() -> STARTED..."); 

  let Categorie = 'toutes';

  let GUIElement = document.getElementById('CategoriesOptions_Select');
  
  let selectedIndex = GUIElement.selectedIndex;  
  if (selectedIndex != 0) Categorie = GUIElement.options[selectedIndex].value;
  return Categorie.toLowerCase();
}
//--------------------------------------------------------------------------------------------------------------------

