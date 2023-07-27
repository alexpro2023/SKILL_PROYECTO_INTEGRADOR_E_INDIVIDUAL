/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

var persistenceAdapter = getPersistenceAdapter();

// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');


// We import language strings object containing all of our strings. 
// The keys for each string will then be referenced in our code
// e.g. requestAttributes.t('WELCOME_MSG')
const languageStrings = require('./localisation');


const DOCUMENT_ID = "INICIO";
const DOCUMENT_ID1 = "CamisaHom";
const DOCUMENT_ID2 = "Blusa";
const DOCUMENT_ID3 = "FaldaManta";
const DOCUMENT_ID4 = "Tenis";
const DOCUMENT_ID5 = "VestidoXV";
const DOCUMENT_ID6 = "VestidoLargo";
const DOCUMENT_ID7 = "PlayeraNi";
const DOCUMENT_ID8 = "ChaquetasHombre";
const DOCUMENT_ID9 = "Pantalon";
const DOCUMENT_ID10 = "ConjuntoNi";
const DOCUMENT_ID11 = "PantalonMujer";
const DOCUMENT_ID12 = "VestidoCorto";
const DOCUMENT_ID13 = "MonederoAmano";
const DOCUMENT_ID14 = "Error";
const DOCUMENT_ID15 = "Bienveni";
const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};
const SELECTED_PRODUCTS_KEY = 'selectedProducts';

var name = '';

const datasource = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Blusa tradicional bordada",
        "detailImage": "https://www.mexicoartesanal.com/cdn/shop/products/603909_540x.jpg?v=1656435536",
        "textContent": {
            "countryOfOrigin": "Puntadas que se mantienen por la eternidad. Servicio verdaderamente personalizado.",
            "primaryText": "Blusa tradicional bordada Hecho en Mexico por nuestros artesanos 100% Algodón. No Incluye Accesorios. Color de bordado puede varear en tonos y diseno"
        },
        "logoUrl": ""
    }
};

const datasource1 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Vestido De Lino Con Bordado Cafe",
        "detailImage": "https://http2.mlstatic.com/D_NQ_NP_937542-MLM54958158550_042023-O.webp",
        "textContent": {
            "countryOfOrigin": "Puntadas que se mantienen por la eternidad. Servicio verdaderamente personalizado.",
            "primaryText": "Viste con diseños 100% mexicanos!!! 2 piezas corset y falda, Tela razo de seda, Bordado Artesanal, Bordado a máquina"
        },
        "logoUrl": ""
    }
};

const datasource2 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Chaquetas Bordada a Mano",
        "detailImage": "https://i.pinimg.com/550x/f3/e3/8e/f3e38e79c37a2cc229733529b319e6e4.jpg",
        "textContent": {
            "countryOfOrigin": "Ofrecemos tallas S, M, L, XL.",
            "primaryText": "Nuestras chaquetas para hombres están diseñadas para brindar estilo y protección contra el clima. Disponibles en diferentes materiales y estilos, como cuero, denim y cortavientos."
        },
        "logoUrl": ""
    }
};

const datasource3 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Pantalon Bordado a mano",
        "detailImage": "https://i.pinimg.com/236x/74/13/a1/7413a1a36d5383e4a1d5e2a28bd8bcc1.jpg",
        "textContent": {
            "countryOfOrigin": "Ofrecemos tallas 28,30,32,34",
            "primaryText": "Nuestros pantalones para mujeres son cómodos y están disponibles en diferentes estilos, como jeans, chinos."
        },
        "logoUrl": ""
    }
};

const datasource4 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Falda de manta bordada",
        "detailImage": "https://media.gotrendier.mx/media/p/2021/09/13/n_c2638284-14c1-11ec-a875-123389dc567f.jpeg",
        "textContent": {
            "countryOfOrigin": "Puntadas que se mantienen por la eternidad. Servicio verdaderamente personalizado.",
            "primaryText": "Nuestras faldas para mujeres están disponibles en diferentes cortes y longitudes."
        },
        "logoUrl": ""
    }
};

const datasource5 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Conjunto para niños Bordada a Mano",
        "detailImage": "https://i.etsystatic.com/21268390/r/il/956c13/2632504162/il_570xN.2632504162_f4nl.jpg",
        "textContent": {
            "countryOfOrigin": "Ofrecemos tallas, 2T', '3T', '4T', '5T",
            "primaryText": "Nuestros conjuntos para niños incluyen una camiseta y un pantalón a juego. Son perfectos para ocasiones especiales o para uso diario."
        },
        "logoUrl": ""
    }
};

const datasource6 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Tenis De Flores Colores Bordados Unisex",
        "detailImage": "https://http2.mlstatic.com/D_NQ_NP_802414-MLM53911287171_022023-O.webp",
        "textContent": {
            "countryOfOrigin": "Ofrecemos tallas 12', '13', '1', '2'  ",
            "primaryText": "Nuestros tenis para niños son cómodos y están diseñados para brindar soporte y resistencia. Disponibles en una variedad de estilos y tallas."
        },
        "logoUrl": ""
    }
};

const datasource7 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Vestido maxi bordado con aberturas laterales dobles",
        "detailImage": "https://m.media-amazon.com/images/I/81INL-ZL3BL._AC_SY741_.jpg",
        "textContent": {
            "countryOfOrigin": "Ofrecemos tallas 'S', 'M', 'L', 'XL' ",
            "primaryText": "Nuestros vestidos largos son elegantes y están diseñados para realzar tu belleza en esta ocasión especial."
        },
        "logoUrl": ""
    }
};

const datasource8 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Camisa para Hombre 3/4 Bordada a mano ",
        "detailImage": "https://i.pinimg.com/564x/2e/47/e0/2e47e05a9187b3f69ff27624aac2e299.jpg",
        "textContent": {
            "countryOfOrigin": "Ofrecemos tallas 'S', 'M', 'L', 'XL'",
            "primaryText": "Nuestras camisas para hombres están hechas de telas de alta calidad y están disponibles en diferentes cortes y colores. "
        },
        "logoUrl": ""
    }
};

const datasource9 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Pantalon Bordada a Mano",
        "detailImage": "https://i.pinimg.com/originals/22/7c/3b/227c3b16bc7a25aa0c68fb6f17d8ad88.jpg",
        "textContent": {
            "countryOfOrigin": "Ofrecemos las tallas '2T', '3T', '4T', '5T'",
            "primaryText": "Nuestros pantalones para niños son duraderos y están disponibles en diferentes estilos, como jeans, chinos y deportivos."
        },
        "logoUrl": ""
    }
};

const datasource10 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Playera para niños Bordada a Mano",
        "detailImage": "https://mexicoarteymoda.com/cdn/shop/products/Playerabordadoamano41.png?v=1614548964",
        "textContent": {
            "countryOfOrigin": "Ofrecemos tallas '2T', '3T', '4T', '5T",
            "primaryText": "Nuestras playeras para niños son cómodas y están disponibles en una amplia variedad de estampados y colores divertidos. "
        },
        "logoUrl": ""
    }
};
const datasource11 = {
    "alexaDetailData": {
        "backgroundImage": "https://i.pinimg.com/564x/43/bd/f9/43bdf931ee45ef5eaa65b15c73dc262b.jpg",
        "title": "Monedero Bordado a mano",
        "detailImage": "https://i.pinimg.com/236x/80/b8/b8/80b8b8acd81fc5fcda3534678200df72.jpg",
        "textContent": {
            "countryOfOrigin": "Ofrecemos diferentes diseños 'florales', 'tricolores'",
            "primaryText": "Nuestros monederos son encantadores y te harán lucir muy bien.Monedero bordado tricolores. "
        },
        "logoUrl": ""
    }
};

const datasource12 = {
    "alexaDetailData": {
        "backgroundImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBwgSFhUVGBUVFhcXGRUWHBshFhUWFhsZFRkkHC4gGh0pHRcTLTEhJSkrLy4uFx8zODM4NygtOi4BCgoKDg0OGxAQGzIhICUvLTU3NjI3Ly8uNy0rLy8tNy0rLSstNzgtNS0tLS0tLS0tLSstLS0tLS8tLS0tLSsrLf/AABEIAOAA4QMBEQACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAwIBBAf/xAAyEAEAAgEDAgIFDAMAAAAAAAAAAQIDBBESITFRkRRhcYGhEyIjQVNUZLHR4fDxBTIz/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAJBEBAAIBBAICAgMAAAAAAAAAAAERAhIhMVFBYZGhMnEiYvD/2gAMAwEAAhEDEQA/APhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPVoK1tn+dET/STFr4l30z8Pj8l04dT8oae8Z9VE2x1jp2iOhMRxBG0SW1ccuM6enkacOp+TnlzNjpPHJWO6SuMVlSuo1MYs00jBTy9S6cPfykSlkrTLg+VpTaY2329fQ/RVVXl3bHpaRypE2nr17R7iIveeCeadrlx6ieOSkRPjBpjwaYnjk0uOKZ5resTt4pVl/wAbc9LieltPT3QunDqfk28p6rHWlotXtPUSqmkBQAAAAAAAAAAAAAAAHr/x3/fz/KRY4k9Kxfda/E0Ydz9JWPv5NHblq94iI7m3giNpajFpr5NoyW339ROOfcEY+2M9/poxxXaK7xEE8UuG82rqaae2onned/Vt4LpyneKSMepYzzGKIw0jp0nfx/ZKqJ7XGbyj0xron5fn9U9YGY2uEcUTbJEVhJ4bx5e+s1trbbT4dWvLEfjP+7SxYdNe21b2+CaM+4Wq3u0NTknJk/1226bexdvCe0UUAAAAAAAAAAAAAAABfS5ow5OVo/mxHKxVTEqc9H9jbzNH9/pKjufpmmbFjz88dJ227brpqebPExaHL5/KEI2WyZq5Ji0xO8d1mPKxUZXHDGoyRlzTeI7/AKEsw1bNF8HC0dY7SNTvNtY89ZpwzV3gq/RNTy7OfFjj6DHtPjPXyNMRvM2n6Y0+aMdptaNzmdyfxpKlppbeEWJpTUZK5bcq19qzCVEcIoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z",
        "title": "Lo sentimos, no hemos podido procesar tu solicitud en este momento.",
        "detailImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWI3nupsIswili0jG8rCiRRoOdUlnCWSVWA&usqp=CAU",
        "textContent": {
            "countryOfOrigin": "Lo sentimos, no hemos podido procesar tu solicitud en este momento.",
            "primaryText": "Lo siento, no Contamos con ese producto.¡SOLO Contamos lo antes mecionado!"
        },
        "logoUrl": ""
    }
};

const datasource13 = {
    "alexaDetailData": {
        "backgroundImage": "https://primerplanomagazine.mx/2020/08/01/los-colores-de-zinacantan/zinacantan-chiapas-colores-textiles-bordados-cultura-tradicion-ppmfotos-turismo-7/",
        "title": "BIENVENIDOS A LA TIENDA SASTRERIA 'LOS PAJARITOS' ",
        "detailImage": "https://l450v.alamy.com/450ves/2a8328g/una-mujer-maya-en-traje-tradicional-borda-una-blusa-huipil-tradicional-en-santiago-atitlan-guatemala-2a8328g.jpg",
        "textContent": {
            "countryOfOrigin": "No hay nada más peligroso que una aguja. Te puede sacar la emoción y hacerte ver muchas cosas que tienes pero no quieres ver",
            "primaryText": "Somos una empresa mexicana dedicada a la distribución de artículos para el bordado y el tejido con exclusividad   "
        },
        "logoUrl": ""
    }
};

// Handler para abrir la aplicación
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
      
    const {attributesManager} = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    const sessionAttributes = attributesManager.getSessionAttributes();
    
    const nameA = sessionAttributes['name'];
    let speechText;

    if(nameA){
            speechText = requestAttributes.t('WELCOME_MSG') + nameA + requestAttributes.t('WELCOME_MSG2');
            
        }
        else{
            speechText = requestAttributes.t('WELCOME_MSG3');
        }
    
   
   if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID15,datasource13);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        } 
   
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
  },
};

const GuardarNombreIntentHandler={
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GuardarNombreIntent';
    },
    handle(handlerInput) {
        
        const {attributesManager} = handlerInput;
       const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;

        const nombre = intent.slots.name.value;
        
        sessionAttributes['name'] = nombre;
        name = nombre;
        const speechText = nombre + ', puedes iniciar, diciendo "mostrar categoria"';
        ///const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
          
       ///const speechText = nombre ('WELCOME_MSG4');
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
}

// Handler para consultar las categorías disponibles
const CategoriesIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CategoriesIntent';
  },
  handle(handlerInput) {
    const { attributesManager, requestEnvelope } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    const locale = requestEnvelope.request.locale; // Obtiene el idioma preferido del usuario

    // Define las categorías en ambos idiomas
    const categories = {
      'es-MX': ['ropa para hombres', 'ropa para mujeres', 'ropa para niños', 'vestidos de 15 años'],
      'en-US': ['mens clothing', 'womens clothing', 'childrens clothing', 'quinceañera dresses']
    };

    // Selecciona las categorías según el idioma preferido del usuario
    const selectedCategories = categories[locale] || categories['en-US'];

    const speakOutput = requestAttributes.t('CATEGORIAS_MESSAGE')  + selectedCategories.join(', ') +  requestAttributes.t('CATEGORIAS_MESSAGE2');
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};





// Handler para consultar los productos disponibles
const ProductsIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ProductsIntent';
  },
  handle(handlerInput) {
    const { attributesManager, requestEnvelope } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    const locale = requestEnvelope.request.locale; // Obtiene el idioma preferido del usuario

    // Define los productos en ambos idiomas
    const products = {
      'es-MX': {
        'ropa para hombres': ['camisas', 'pantalones'],
        'ropa para mujeres': ['vestidos', 'blusas', 'faldas','pantalones'],
        'ropa para niños': ['playeras', 'pantalones'],
        'vestidos de 15 años': ['vestidos largos', 'vestidos cortos', 'vestidos estilo princesa']
      },
      'en-US': {
        'clothes for men': ['shirts', 'pants'],
        'clothes for women': ['dresses', 'blouses', 'skirts','pants'],
        'clothes for children': ['t-shirts', 'pants'],
        '15 year old dresses': ['long dresses', 'short dresses', 'princess-style dresses']
      }
    };

    // Obtiene la categoría seleccionada por el usuario
    const category = Alexa.getSlotValue(handlerInput.requestEnvelope, 'category');

    // Selecciona los productos según el idioma preferido del usuario
    const selectedProducts = products[locale] && products[locale][category] || products['en-US'][category] || [];

    const speakOutput = requestAttributes.t('CATEGORIAS_MESSAGE4') + category + ': ' + selectedProducts.join(', ') + requestAttributes.t('CATEGORIAS_MESSAGE5');
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};



// Handler para obtener detalles de un producto específico
const ProductDetailsIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ProductDetailsIntent';
  },
  handle(handlerInput) {
    const { attributesManager, requestEnvelope } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    
    const sessionAttributes = attributesManager.getSessionAttributes();
    const product = Alexa.getSlotValue(handlerInput.requestEnvelope, 'product');
    let speakOutput = '';

    if (product === 'camisas') {
      const sizes = ['S', 'M', 'L', 'XL'];
      const price = 29.99;
      speakOutput = `Nuestras camisas para hombres están hechas de telas de alta calidad y están disponibles en diferentes cortes y colores. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
       if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID1, datasource8);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    } else if (product === 'pantalones' || product === 'pants') {
      const sizes = ['28', '30', '32', '34'];
      const price = 950;
      speakOutput = requestAttributes.t('CATEGORIAS_MESSAGE7') +  sizes.join(', ')  + requestAttributes.t('CATEGORIAS_MESSAGE8') + (price) + requestAttributes.t('CATEGORIAS_MESSAGE9') ;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID11, datasource3);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
    } else if (product === 'chaquetas') {
      const sizes = ['S', 'M', 'L', 'XL'];
      const price = 59.99;
      speakOutput = `Nuestras chaquetas para hombres están diseñadas para brindar estilo y protección contra el clima. Disponibles en diferentes materiales y estilos, como cuero, denim y cortavientos. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID8, datasource2);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    } else if (product === 'vestidos') {
      const sizes = ['S', 'M', 'L', 'XL'];
      const price = 79.99;
      speakOutput = `Nuestros vestidos para mujeres son elegantes y están disponibles en una amplia variedad de estilos y diseños. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
    } else if (product === 'blusas') {
      const sizes = ['S', 'M', 'L', 'XL'];
      const price = 29.99;
      speakOutput = `Nuestras blusas para mujeres son versátiles y están disponibles en diferentes estilos y tejidos. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
       if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID2,datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        } 
        
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();

    } else if (product === 'faldas') {
      const sizes = ['S', 'M', 'L', 'XL'];
      const price = 39.99;
      speakOutput = `Nuestras faldas para mujeres están disponibles en diferentes cortes y longitudes. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID3, datasource4);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    } else if (product === 'playeras') {
      const sizes = ['2T', '3T', '4T', '5T'];
      const price = 19.99;
      speakOutput = `Nuestras playeras para niños son cómodas y están disponibles en una amplia variedad de estampados y colores divertidos. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID7, datasource10);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    } else if (product === 'pantalones') {
      const sizes = ['2T', '3T', '4T', '5T'];
      const price = 24.99;
      speakOutput = `Nuestros pantalones para niños son duraderos y están disponibles en diferentes estilos, como jeans, chinos y deportivos. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID9, datasource9);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    } else if (product === 'conjuntos') {
      const sizes = ['2T', '3T', '4T', '5T'];
      const price = 34.99;
      speakOutput = `Nuestros conjuntos para niños incluyen una camiseta y un pantalón a juego. Son perfectos para ocasiones especiales o para uso diario. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID10, datasource5);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    } else if (product === 'tenis') {
      const sizes = ['12', '13', '1', '2'];
      const price = 29.99;
      speakOutput = `Nuestros tenis para niños son cómodos y están diseñados para brindar soporte y resistencia. Disponibles en una variedad de estilos y tallas. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID4, datasource6);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    } else if (product === 'vestidos largos') {
      const sizes = ['S', 'M', 'L', 'XL'];
      const price = 39.99;
      speakOutput = `Nuestros vestidos largos de 15 años son elegantes y están diseñados para realzar tu belleza en esta ocasión especial. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID5, datasource7);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
         return handlerInput.responseBuilder.getResponse();
    } else if (product === 'vestidos cortos') {
      const sizes = ['S', 'M', 'L', 'XL'];
      const price = 79.99;
      speakOutput = `Nuestros vestidos cortos son modernos y juveniles. Perfectos para lucir radiante en tu fiesta. Ofrecemos tallas ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID12, datasource1);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
        
    } else if (product === 'monederos') {
      const sizes = ['florales', 'tricolores'];
      const price = 129.99;
      speakOutput = `Nuestros monederos son encantadores y te harán lucir muy bien. Monedero bordado tricolores. Ofrecemos diferentes diseños ${sizes.join(', ')} a un precio de ${price} dólares. ¿Hay algo más en lo que pueda ayudarte?`;
      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID13, datasource11);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    } else {
      speakOutput = 'Lo siento, no Contamos con ese producto.¡SOLO Contamos lo antes mecionado!';
       if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID14, datasource12);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    }
    
    // Verificar si el usuario tiene una lista de productos seleccionados
    const selectedProducts = sessionAttributes[SELECTED_PRODUCTS_KEY] || [];
    
    if (selectedProducts.length > 0) {
      const selectedProductsText = selectedProducts.join(', ');
      speakOutput += ` Tu lista de productos seleccionados es: ${selectedProductsText}.`;
    }
    
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
            
    },
};

const AddProductToCartIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddProductToCartIntent';
  },
  handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { intent } = handlerInput.requestEnvelope.request;
    
    const product = Alexa.getSlotValue(intent, 'product');
    
    // Obtener la lista de productos seleccionados actual o crear uno nuevo si no existe
    const selectedProducts = sessionAttributes[SELECTED_PRODUCTS_KEY] || [];
    
    // Agregar el producto a la lista de productos seleccionados
    selectedProducts.push(product);
    
    // Guardar la lista actualizada en las variables de sesión
    sessionAttributes[SELECTED_PRODUCTS_KEY] = selectedProducts;
    attributesManager.setSessionAttributes(sessionAttributes);
    
    const speechText = `¡Has agregado ${product} a tu lista de seleccionados! ¿Hay algo más en lo que pueda ayudarte?`;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};



function getPersistenceAdapter() {
    // This function is an indirect way to detect if this is part of an Alexa-Hosted skill
    function isAlexaHosted() {
        return process.env.S3_PERSISTENCE_BUCKET ? true : false;
    }
    const tableName = 'tablaPuntuacion';
    if(isAlexaHosted()) {
        const {S3PersistenceAdapter} = require('ask-sdk-s3-persistence-adapter');
        return new S3PersistenceAdapter({ 
            bucketName: process.env.S3_PERSISTENCE_BUCKET
        });
    } else {
        // IMPORTANT: don't forget to give DynamoDB access to the role you're to run this lambda (IAM)
        const {DynamoDbPersistenceAdapter} = require('ask-sdk-dynamodb-persistence-adapter');
        return new DynamoDbPersistenceAdapter({ 
            tableName: tableName,
            createTable: true
        });
    }
}


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('GOODBYE_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
process(handlerInput) {
    console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
}
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
process(handlerInput, response) {
  console.log(`Outgoing response: ${JSON.stringify(response)}`);
}
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationRequestInterceptor = {
process(handlerInput) {
const localizationClient = i18n.use(sprintf).init({
  lng: handlerInput.requestEnvelope.request.locale,
  overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
  resources: languageStrings,
  returnObjects: true
});
const attributes = handlerInput.attributesManager.getRequestAttributes();
attributes.t = function (...args) {
  return localizationClient.t(...args);
}
}
};

const LoadAttributesRequestInterceptor = {
async process(handlerInput) {
    if(handlerInput.requestEnvelope.session['new']){ //is this a new session?
        const {attributesManager} = handlerInput;
        const persistentAttributes = await attributesManager.getPersistentAttributes() || {};
        //copy persistent attribute to session attributes
        handlerInput.attributesManager.setSessionAttributes(persistentAttributes);
    }
}
};

const SaveAttributesResponseInterceptor = {
async process(handlerInput, response) {
    const {attributesManager} = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const shouldEndSession = (typeof response.shouldEndSession === "undefined" ? true : response.shouldEndSession);//is this a session end?
    if(shouldEndSession || handlerInput.requestEnvelope.request.type === 'SessionEndedRequest') { // skill was stopped or timed out            
        attributesManager.setPersistentAttributes(sessionAttributes);
        await attributesManager.savePersistentAttributes();
    }
}
};


// Exporta el handler de entrada principal
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GuardarNombreIntentHandler,
        CategoriesIntentHandler,
        ProductsIntentHandler,
        ProductDetailsIntentHandler,
        AddProductToCartIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
        .addRequestInterceptors(
        LocalizationRequestInterceptor,
        LoggingRequestInterceptor,
        LoadAttributesRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor,
        SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(persistenceAdapter)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
    