


let GLOBALS = {  
        
        APP_NAME : 'WEED-STORE-PWA',
        APP_VERSION : '1.0.0',
        APP_DEBUG : true,

  
       SERVER_URL: '127.0.0.1',
        SERVER_PORT : '8080', 
        SERVER_HOSTNAME :  'http://' + self.SERVER_URL + ':' + self.SERVER_PORT,

        FILE_SERVICE_WORKER : 'service_worker.js',   
        FILE_HOMEPAGE : 'index.html',
        FILE_PRODUCTS : 'product.json',

        WEBPUSH_PUBLICKEY:  '',
        WEBPUSH_ENDPOINT :  '',

        NOTIFICATION_ENABLED : true,
        NOTIFICATION_TITLE : '',
        NOTIFICATION_BODY :'',
        NOTIFICATION_ICON : '',
        NOTIFICATION_VIBRATE : [100, 50, 100],
        NOTIFICATION_DATA : { dateOfArrival : Date.now(),  primaryKey : '1',  clickUrl : '', },

        
};

//--------------------------------------------------------------------------------------------------------------------

let CategoriesOptions = [  "Toutes", "Indica", "Sativa", "Hybrid"];

let ProductsList = [];
//--------------------------------------------------------------------------------------------------------------------





