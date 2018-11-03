var request = require('request-promise-native');
var AssistantIfttt = function(configuration) {
  this.key = configuration.key;
}
AssistantIfttt.prototype.init = function(plugins) {
  this.plugins = plugins;
  if (!this.key) return Promise.reject("[assistant-ifttt] Erreur : vous devez configurer ce plugin !");
  return Promise.resolve(this);
};

/**
 * Fonction appelée par le système central
 *
 * @param {String} commande Le nom du event WebHook créé sur IFTTT
 * @param {Object} [params] Peut contenir 'value1', 'value2' et 'value3'
 */
AssistantIfttt.prototype.action = function(commande, params) {
  // si on détecte un '#' dans la commande, alors on suppose qu'il y a les paramètres supplémentaires
  if (!params && commande.indexOf('#') > -1) {
    commande = commande.split('#');
    params = {};
    commande.forEach(function(cmd, i) {
      if (i>0) params['value'+i] = cmd
    });
    commande = commande[0];
  }
  var req = {
    method:(params ? 'POST' : 'GET'),
    url:'https://maker.ifttt.com/trigger/'+commande+'/with/key/'+this.key
  }
  if (params) {
    req.body = {};
    req.json = true;
    ['value1','value2','value3'].forEach(function(val) {
      if (params[val]) req.body[val]=params[val];
    })
  }

  return request(req)
};

/**
 * Initialisation du plugin
 *
 * @param  {Object} configuration La configuration
 * @param  {Object} plugins Un objet qui contient tous les plugins chargés
 * @return {Promise} resolve(this)
 */
exports.init=function(configuration, plugins) {
  return new AssistantIfttt(configuration).init(plugins)
  .then(function(resource) {
    console.log("[assistant-ifttt] Plugin chargé et prêt.");
    return resource;
  })
}

