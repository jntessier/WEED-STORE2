


//?------------------------------------------------------------------------------------
/*En cours:

ajout des ficheir ejs, relier au client, produit, panier achat

/cart    = cart.ejs     /achats  = achats.ejs

/clients        /payment-success    /produits   /user-purchases
*/
//?------------------------------------------------------------------------------------







//?----------------------------------/* CONSTANTES */-------------------------------------------------------
//FLAGS 
    const LOG_TRACE                       = true; 
    const LOG_CONFIG                        =   true;

//FILENAME 
    const ROOT_FOLDER                       = __dirname + '/views';              if (LOG_CONFIG) console.log("ROOT_FOLDER: " + ROOT_FOLDER);
    const ASSETS_FOLDER                     = __dirname + "/assets/";
    const JSON_FOLDER                       = __dirname + "/assets/json/";
    const ICONS_FOLDER                      = __dirname + "/assets/icons/";
    const IMAGES_FOLDER                     = __dirname + "/assets/images/";

              

    const PRODUCTS_FILENAME                 = "products.json";
    const NOTIFICATION_REGISTERED_FILENAME  = "notification.json";

//SERVER 
  
    const SERVER_HOST                       = 'http://127.0.0.1';
    const SERVER_PORT                       = 3000;
    const SERVER_URL                        = SERVER_HOST + ':' + SERVER_PORT;

 
//?-------------------------------------------------------------------------------------------------------


//?----------------------------------/* GLOBALS */--------------------------------------------------------
//DATABASE TABLES
    let logins;    let adresses;    let utilisateurs;

//PRODUITS 
    var ProductsList = [];

//UTILISATEURS 
    var LoginList = [];     var AdresseList = [];      var  UtilisateurList = [];
//?-------------------------------------------------------------------------------------------------------

//?-------------------------------------------------------------------------------------------------------
//INIT -> filesystem 
const path = require('path');       const fs = require('fs');
//?-------------------------------------------------------------------------------------------------------
//INIT -> express  
const express  = require('express');  const app = express(); app.use(express.static(ROOT_FOLDER));     
app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port 3000`)
})
//-------------------------------------------------------------------------------------------------------
//INIT -> body-parser 
const   bodyParser = require('body-parser');
        app.use(bodyParser.json());      app.use(bodyParser.urlencoded({ extended: true }));
//-------------------------------------------------------------------------------------------------------
/* INIT -> cors */      const cors = require('cors');           app.use(cors());
//-------------------------------------------------------------------------------------------------------
/* INIT -> dotenv */    const dotenv = require('dotenv');       dotenv.config();
//-------------------------------------------------------------------------------------------------------
//INIT -> swagger
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//-------------------------------------------------------------------------------------------------------
//INIT -> ejs
const ejs = require('ejs');     app.set("view engine", "ejs");
//-------------------------------------------------------------------------------------------------------
//INIT -> mongoose
const   mongoose = require('mongoose');       
//-------------------------------------------------------------------------------------------------------

main();

function main()  
{  

    if (init() == false)   { console.log("[main()] Le server na pas pu demarrer"); return false; }  
    return true;
}
//?------------------------------------------------------------------------------------------------------------------------------------------------
//INITIALISATION 
function init()  
{  
    if (init_Database() == false)   { console.log("[init()] Une erreur est survenu lors du chargement de la base de donnees"); return false; }  
    if (init_Users()    == false)   { console.log("[init()] Une erreur est survenu lors du chargement des utilisateurs"); return false; }
    if (init_Products() == false)   { console.log("[init()] Une erreur est survenu lors du chargement des produits");     return false; }

    return true; 
}
//?-----------------------------------------------------/* TESTS: OKAY */---------------------------------------------------------------------------
//TABLE logins
function init_Database()  
{  
    mongoose.connect("mongodb://localhost:27017/weed-store");
    const LoginSchema = new mongoose.Schema({   identifiant: {    type:String, required:[true, "Identifiant est requis"]    },
                                                motdepasse:  {    type:String, required:[true, "motdepasse est requis"]    },
                                                isadmin: Boolean });     

    logins = mongoose.model("Login", LoginSchema);
    //?------------------------------------------------------------------------------------------------------------------------------------------------
    //TABLE adresses
    const AdresseSchema = new mongoose.Schema({ id:         {  type:String, required:[true, "id est requis"]    },
                                                numero:             String,
                                                rue:                String,
                                                ville:              String,
                                                codepostal:         String,
                                                province:           String,
                                                pays:               String    });

    adresses = mongoose.model("Adresse", AdresseSchema);
    //?------------------------------------------------------------------------------------------------------------------------------------------------
    //TABLE utilisateurs
    const UtilisateurSchema = new mongoose.Schema({
                                                login:    {    type:String, required:[true, "login est requis"]    },  
                                                adresse:  {    type:String, required:[true, "adresse est requis"]  },  
                                                prenom:             String,
                                                nom:                String,
                                                courriel:           String,
                                                telephone:          String,
                                                datedenaissance:    String,
                                                profession:         String  });

    utilisateurs = mongoose.model("Utilisateur", UtilisateurSchema);
}

function init_Users()  
{  
    
    if (readUsers() == false) return false;    
    if (LOG_TRACE) console.log("[init_Users()] Utilisateur Count = " + getUsersCount());
    return true; 
}

function init_Products()  
{      
    if (readProducts() == false) return false;    
    if (LOG_TRACE) console.log("[init_Products()] Produits Count = " + getProductCount());
    return true; 
}


//?-------------------------------/* TESTS: OKAY */------------------------------------------------------------------------------------------------
//UTILISATEUR READ AND WRITE
function readUsers()  
{     
    find_into_Logins({ }).then(         Result => { LoginList       = Result; console.log("Login Count = "       + LoginList.length);           } );
    find_into_Adresses({ }).then(       Result => { AdresseList     = Result; console.log("Adresse Count = "     + AdresseList.length);         } );
    find_into_Utilisateurs({ }).then(   Result => { UtilisateurList = Result; console.log("Utilisateur Count = " + UtilisateurList.length);     } );
}
function writeUsers()  
{     
    
}
//?------------------------------------------------------------------------------------------------------------------------------------------------

//?-------------------------------/* TESTS: OKAY */---------------------------------------
async function find_into_Logins(params)           {   return logins.find(params);       }
async function find_into_Adresses(params)         {   return adresses.find(params);     }
async function find_into_Utilisateurs(params)     {   return utilisateurs.find(params); }
//?---------------------------------------------------------------------------------------

//?---------------------------/* TESTS: OKAY */----------------------------------
//GETTER LIST
function getLoginList()           {   return LoginList;                     }
function getAdresseList()         {   return AdresseList;                   }
function getUtilisateurList()     {   return UtilisateurList;               }
function getProductList()         {   return ProductList;                   }
//?------------------------------------------------------------------------------
//GETTER COUNT
function getLoginCount()           {  return getLoginList().length;         }
function getAdresseCount()         {  return getAdresseList().length;       }
function getUsersCount()           {  return getUtilisateurList().length;   }
function getProductCount()         {  return getProductList().length;       }
//?------------------------------------------------------------------------------




 //?------------------------------------------------------------------------------------------------------------------------------
 //PRODUCTS READ AND WRITE
 function readProducts()
 { 		
    if (LOG_TRACE) console.log("[readProducts()] STARTED...");
    ProductsList = toJSON(readFileContent(JSON_FOLDER + PRODUCTS_FILENAME));
    if (ProductsList.length > 0) return true;
    return false;
 }
 function writeProducts()
 { 		
    if (LOG_TRACE) console.log("[writeProducts()] STARTED...");
    if (ProductsList.length === 0) return false;
    
    writeFileContent(JSON_FOLDER + PRODUCTS_FILENAME, toString(getProductsList()) );
    return true;
 }
//?------------------------------------------------------------------------------------------------------------------------------
//PRODUCTS GETTERS
function getProductList()   { return ProductsList; }
function getProductByID(id)
{
	if (LOG_TRACE) console.log("[getProductByID(id)] STARTED...\tid = " + id);

	if (ProductList.length < 1 || ProductList.length <= id) readProducts();

	for (var i=0; i < ProductList.length; i++)
		if (ProductList[i].id == id) return ProductList[i];		
		
    return null;
}

//?------------------------------------------------------------------------------------------------------------------------------

//?------------------------------------------------------------------------------------------------------------------------------




/*
 app.get("/users", (req, res) => res.send("All users"))
 app.post("/addUser", (req, res) => res.send("Created user"))

 app.route("/users/:id")
     .get((req, res) => res.send("Get user: " + req.params.id))
     .post((req, res) => res.send("Post user: " + req.params.id))
     .put((req, res) => res.send("Put user: " + req.params.id))
     .patch((req, res) => res.send("Patch user: " + req.params.id))
     .delete((req, res) => res.send("Delete user: " + req.params.id))



*/




//?-------------------------------------------------/* TESTS: OKAY */-----------------------------------------------------------------------------------------------------------------------
//ROUTES -> GET /
app.get('/',cors(), (req, res) => 
{
        if (getLoginCount() == 0 )
        {
            //Creation compte sdmin, si aucun compte present (defaultLogin fourni dans le manual)
            
                console.log("[GET: '/'] - Aucun compte trouver -> Creation du compte admin par defaut");
                var newLogin        = new logins(       {     identifiant: "admin",    motdepasse: "12345678",    isadmin: "true" });
                if (newLogin       != undefined)            {     LoginList[LoginList.length] = newLogin;
                                                                newLogin.save();          console.log("LoginList.length = " + LoginList.length);}
    
                var newAdresse      = new adresses(     {     id: "00000000",    numero: "",    rue: "",      ville: "",    codepostal: "",    province: "",   pays: "" });
                if (newAdresse     != undefined )           {     AdresseList[AdresseList.length] = newAdresse;     
                                                                newAdresse.save();      console.log("AdresseList.length = " + AdresseList.length);              }
    
                var newUtilisateur  = new utilisateurs( {     login: "admin",  adresse: "00000000",  prenom: "",    nom: "", courriel: "",    telephone: "",  datedenaissance: "",    profession: "" });
                if (newUtilisateur != undefined)            {     UtilisateurList[UtilisateurList.length] = newUtilisateur;  
                                                                newUtilisateur.save();   console.log("Utilisateurs Count = " + UtilisateurList.length);}
    
                console.log("\tidentifiant = admin,\n\tmotdepasse = 12345678 ");
                
        }        

        let page = "index";      console.log("[GET: '/'] - RENDERING -> pages/" + page + ".html"); 
        res.render("pages/" + page, { page: "Index" } );
        
           
});

app.get('/',cors(), (req, res) => {	res.sendFile( __dirname + "/index.html" );});

//?-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ROUTES -> GET /products
app.get('/products',cors(), (req, res) => 
{	
    let filename = "products.json";       console.log("[GET: '/products'] - SENDING : " + filename); 	
    res.sendFile( JSON_FOLDER + filename );    
});
//?-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ROUTES -> GET /ProductDetails
app.get('/ProductDetails', (req, res) => 
{
    let filename = "ProductDetails.html";       console.log("[GET: '/ProductDetails'] - SENDING : " + filename); 	
    res.sendFile( ROOT_FOLDER + filename );    
})
//?-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//?-------------------------------------------------/* TESTS: OKAY */-----------------------------------------------------------------------------------------------------------------------
//ROUTES -> GET /loginlist,         GET /adresselist,       GET /utilisateurlist
app.get('/loginlist',          (req, res) => {  console.log("[GET: '/loginlist']       \nSENDING : logins = [\n"        + getLoginList()       );  res.send(getLoginList())        })
app.get('/adresselist',        (req, res) => {  console.log("[GET: '/adresselist']     \nSENDING : adresses = [\n"      + getAdresseList()     );  res.send(getAdresseList())      })
app.get('/utilisateurlist',    (req, res) => {  console.log("[GET: '/utilisateurlist'] \nSENDING : utilisateurs = [\n"  + getUtilisateurList() );  res.send(getUtilisateurList())  })
//?-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




//?-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//POST /products/:id   -> PRODUITS DETAILLER
app.post('/products/:id', (req, res) => 
{    
    if (LOG_TRACE) console.log("[POST /products/:id] STARTED...\treq.body.id = " + req.body.id)
	
	let newProduct = getProduct(req.body.id);

		console.log("Requesting : ProductDetails -> " + newProduct.name);
				
		//var PageUrl  = __dirname + "/client/";	PageUrl += newProduct.categorie + ".html";
		var PageUrl  =  __dirname + "/client/"; PageUrl +=  "ProductDetails.html";
		
		let ProductDetails_HTML = fs.readFileSync(PageUrl, 'utf8');
		if(ProductDetails_HTML)
		{
			
			ProductDetails_HTML 	= ProductDetails_HTML.replace('param1_videoUrl',newProduct.videoUrl);
			let videoUrl 		= newProduct.videoUrl.replace('watch?v=', 'embed/')
			ProductDetails_HTML = ProductDetails_HTML.replace('param2_videoUrl',videoUrl);
			
			
			res.send(ProductDetails_HTML);
		}

	
   
})
//----------------------------------------------------------------------------------------------------------------------------------------

//?------------------------------------------------------------------------------------------------------------------------------.
//app.post('/connexion', (req, res) => {          });
 //app.post('/inscription', (req, res) => {        });
//?------------------------------------------------------------------------------------------------------------------------------.



//?------------------------------------------------------------------------------------------------------------------------------.
 //POST /cart
app.post('/cart', (req, res) => 
{
    
    const productId = req.body.productId;    if (!req.session.cart)   req.session.cart = [];   
    req.session.cart.push(productId);    res.redirect('/cart');
 });
//?------------------------------------------------------------------------------------------------------------------------------.
app.get('/cart', (req, res) => 
    {
        if (LOG_TRACE) console.log("[GET /cart] STARTED...\req.session.cart = " + req.session.cart);

        const cartItems = req.session.cart || [];
        const productIds = cartItems.map(productId => parseInt(productId, 10));
        const sqlQuery = `SELECT * FROM produits WHERE Produit_ID IN (${productIds.join(',')})`;
        const query = connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        const cartProducts = JSON.parse(apiResponse(results)).response;
    
        // Calculate total amount
        let totalAmount = 0;
        cartProducts.forEach(product => {
            const price = parseFloat(product.Produit_Prix);
            const quantity = parseInt(product.Produit_Qte);
            totalAmount += price;
        });
    
        // Round totalAmount to 2 decimal places
        totalAmount = totalAmount.toFixed(2);
    
        res.render('pages/cart', { page: 'Cart', products: cartProducts, totalAmount });
        });
});
//?------------------------------------------------------------------------------------------------------------------------------





//?------------------------------------------------------------------------------------------------------------------------------}
app.post('/enregistrer',cors(), (req, res) =>
{	
    if (LOG_TRACE) console.log("[POST /enregistrer] STARTED...");


	let videoUrl = req.body.videoUrl.replace('watch?v=', 'embed/');

	newProduct =
	{
		id:             req.body.id,
		name:           req.body.name,
		provider:       req.body.provider,
		categorie:      req.body.categorie,
		description:    req.body.description,
		image:          req.body.image,
		rating:         req.body.rating
	};

	let jsonData =  load_JSON("products.json");	
					jsonData.push(newProduct);
					save_JSON("products.json", jsonData );

					res.sendStatus(200);		
					
	
	var Abonnements = load_JSON("abonnements.json");	
	
	webpush.setVapidDetails('mailto:aaaa@gmail.com', 
						    'BGgq3HS_dZzJYqLm9r3gqwGSoXnFV94sqiiNf1MjQ1qSd1COMITQb1DHq5iIx7-z8QTpoLZOQ0_EbLSwGqNIbAU',
							'sixJ1OigM0co8AJn3dWFSvlw8zr7axo-Ypk7mA_9PTo');

	Abonnements.forEach((abo) => 
	{
		var pushConfig = { endpoint: abo.endpoint,	  keys: {auth: abo.keys.auth,	p256dh: abo.keys.p256dh	  }		};
		webpush.sendNotification(pushConfig, JSON.stringify(
		{ 
				title: 'Nouveau Produits', 
				content: 'Le produits ' + newProduct.name + ' a ete ajouter',
				url: 'http://collections.cinematheque.qc.ca/'
		}))
        .catch((err) => {   console.log(err);})
		});
});
//?------------------------------------------------------------------------------------------------------------------------------}
app.post('/push-abonnements',cors(),(req, res) => 
{
    if (LOG_TRACE) console.log("[POST /push-abonnements] STARTED...\treq.body = " + req.body);
	
	const unAbonnement=req.body;
	if(!lodash.isEmpty(unAbonnement))
	{
		let jsonData =  load_JSON("abonnements.json");
						jsonData.push(unAbonnement);
						save_JSON("abonnements.json",jsonData);
	res.end();
	}
});
//?------------------------------------------------------------------------------------------------------------------------------}



app.post('/payment', (req, res) => {
    // Retrieve the total amount from the form submission
    const totalAmount = req.body.totalAmount;
    const { productId } = req.body;
  
    // Check if user is logged in
    if (!req.session.userId) {
      res.status(401).send('Utilisateur non connecté');
      return;
    }
  
    // Perform necessary operations to save the purchase information in your database
    // For example, execute an SQL query to insert the data into the purchases table
  
    // Sample SQL insertion query with join:
    const sqlQuery = 'INSERT INTO achats (user_id, produit_id) VALUES (?, ?)';
    const values = [req.session.userId, productId];
  
    connection.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Une erreur s'est produite lors de l'enregistrement de l'achat");
      }
  
      // Purchase has been successfully saved in the database
  
      // Continue with the payment process (PayPal integration)
  
      // Create a payment request
      const createPaymentJson = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: 'http://localhost:3000/payment-success', // Replace with your return URL
          cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL
        },
        transactions: [
          {
            amount: {
              total: totalAmount, // Use the totalAmount without any adjustments
              currency: 'CAD', // Replace with the currency of your choice
            },
            description: 'Payment for products', // Replace with your payment description
          },
        ],
      };
  
      // Create the payment request with PayPal
      paypal.payment.create(createPaymentJson, function (error, payment) {
        if (error) {
          console.error(error);
          // Handle error response
          res.redirect('/error');
        } else {
          // Redirect the user to PayPal for payment
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              res.redirect(payment.links[i].href);
              break;
            }
          }
        }
      });
    });
  });
  
  
  app.get('/success', (req, res) => {
    // Payment was successful, process the payment
    const paymentId = req.query.paymentId;
    const payerId = req.query.PayerID;
  
    // Execute the PayPal payment
    const executePaymentJson = {
      payer_id: payerId,
    };
  
    paypal.payment.execute(paymentId, executePaymentJson, function (error, payment) {
      if (error) {
        console.error(error);
        // Handle error response
        res.redirect('/error');
      } else {
        // Payment was successful, redirect to a success page
        res.redirect('/payment-success');
      }
    });
  });
  
  app.get('/cancel', (req, res) => {
    // Payment was cancelled, redirect to a cancel page
    res.redirect('/payment-cancel');
  });
  
  app.get('/payment-success', (req, res) => {
    res.render('pages/payment-success', { page: 'Payment Success' });
  });
  
  app.get('/payment-cancel', (req, res) => {
    res.render('pages/payment-cancel', { page: 'Payment Cancel' });
  });
  
  app.post('/signup', (req, res) => {
    const { courriel, mpass, cpass } = req.body;
  
    // Perform data validation checks, if necessary
  
    // Check if the password and confirm password match
    if (mpass !== cpass) {
      res.status(400).send('Les mots de passe ne correspondent pas');
      return;
    }
  
    // Create a prepared SQL query to insert data into the users table
    const sqlQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const values = [courriel, mpass];
  
    // Execute the prepared SQL query
    connection.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        // Handle the error when inserting data
        res.status(500).send("Une erreur s'est produite lors de l'inscription");
      } else {
        // The data has been successfully inserted into the database
        // You can perform other actions here, such as sending a confirmation email, etc.
        res.redirect('/');
      }
    });
  });
  
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Perform data validation checks, if necessary
  
    // SQL query to retrieve the user matching the provided credentials
    const sqlQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];
  
    connection.query(sqlQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Une erreur s'est produite lors de la connexion");
      }
  
      // Check if any results were returned
      if (results.length > 0) {
        // User is successfully logged in
        // You can perform additional actions here, such as setting a user session
        req.session.userId = results[0].id;
        res.redirect('/');
        //console.log(userId)
      } else {
        // Invalid credentials
        res.status(401).send("Informations d'identification invalides");
      }
    });
  });
  app.get('/user-purchases/:userId', (req, res) => {
    const userId = req.params.userId;
  
    // Requête SQL pour récupérer les achats de l'utilisateur spécifié
    const sqlQuery = `
      SELECT achats.*, produits.Produit_Name, produits.Produit_Prix
      FROM achats
      JOIN produits ON achats.produit_id = produits.Produit_ID
      WHERE achats.user_id = ?
    `;
    const values = [userId];
  
    connection.query(sqlQuery, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Une erreur s'est produite lors de la récupération des achats de l'utilisateur");
      }
  
      // Récupérer les résultats de la requête SQL et les envoyer à la page C
      const userPurchases = results;
  
      res.render('pages/user-purchases', { userPurchases });
    });
  });


//?------------------------------------------------------------------------------------------------------------------------------
function readFileContent(filename)
{ 
    if (LOG_TRACE) console.log("[readFileContent(filename)] STARTED...\tfilename = " + filename);
    let stringData = fs.readFileSync( filename, 'utf8');	
    return stringData;
}
//?------------------------------------------------------------------------------------------------------------------------------}
function writeFileContent(filename, stringData)
{ 
    if (LOG_TRACE) console.log("[writeFileContent(filename)] STARTED...\tfilename = " + filename);
    fs.writeFileSync(filename, stringData); 
}
//?------------------------------------------------------------------------------------------------------------------------------}
function toJSON(stringData)    { return JSON.parse(stringData);   }
function toString(jsonData)    { return JSON.stringify(jsonData); }
//?------------------------------------------------------------------------------------------------------------------------------}
