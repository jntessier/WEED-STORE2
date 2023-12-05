


  //--------------------------------------------------------------------------------------------------------------------
  function enregistrer(st, thisProduct) 
  {    
    return dbPromise
      .then((db) => 
      {
        
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st); 
        
        newProduct = {
          id:             thisProduct.id,
          name:           thisProduct.name,
          provider:       thisProduct.provider,
          categorie:      thisProduct.categorie,
          description:    thisProduct.description,
          image:          thisProduct.image,
          rating:         thisProduct.rating
       };

        store.put(newProduct); 
        console.log("Enregistrement du product ID: " + newProduct.id + " name: " + newProduct.name + " dans la table " + store);
        return tx.complete;
      });
  }
  //--------------------------------------------------------------------------------------------------------------------
  function contenuStore(st) 
  {
    return dbPromise
      .then((db) => 
      {
        var tx = db.transaction(st, 'readonly');
        var store = tx.objectStore(st);    
        
        return store.getAll();
      });
  }
  //--------------------------------------------------------------------------------------------------------------------
  function viderStore(st) 
  {
    return dbPromise
      .then(function(db) 
      {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);  store.clear();
        console.log("["+st + "]-> est maintenant vide");
        return tx.complete;
      });
  }  
  //--------------------------------------------------------------------------------------------------------------------
  function supprimerElement(st, id)
  {
    
    dbPromise.then(function(db)
    {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);   store.delete(id);       
        return tx.complete;
      })
      .then(function() {    console.log("["+st + "]-> Le product numero: "+id + " a ete supprimer");    });
  }
  //--------------------------------------------------------------------------------------------------------------------
  async function creerBD(infosBD)
  {
    return await idb.open(infosBD.bd, 1, (db) => 
    {
        let listeStores=infosBD.stores;
        for(unSt of listeStores)
        {
          if (!db.objectStoreNames.contains(unSt.st))
          {
            db.createObjectStore(unSt.st, {keyPath: unSt.id, autoIncrement: true });
            console.log("Creation de la DB: " + unSt.st);
          }
        }
    });
  }  
  //--------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------
  let infosBD={'bd':'bdproducts', 'stores':[{'st':'products','id':'id'},{'st':'sync-products','id':'id'}]};
  var dbPromise=creerBD(infosBD);
  //--------------------------------------------------------------------------------------------------------------------