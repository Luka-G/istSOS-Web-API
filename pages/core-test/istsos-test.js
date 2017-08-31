/** ==================================================================================================== */

var ist = new istsos.ServerContainer();
var default_db = new istsos.Database({
   dbname: 'istsos',
   host: 'localhost',
   user: 'postgres',
   password: 'postgres',
   port: 5432
});
var server = new istsos.Server({
   name: 'test',
   url: 'https://geoservice.ist.supsi.ch/istsos/',
   defaultDb: default_db
});

ist.addServer(server);

var default_conf = new istsos.Configuration({
   serviceName: "default",
   server: server
});
var service = new istsos.Service({
   name: "demo",
   server: server,
   opt_db: default_db
});

var procedure1 = new istsos.Procedure({
   service: service,
   name: "BELLINZONA",
   description: "",
   keywords: "",
   foi_name: "foi",
   epsg: 3857,
   x: 25,
   y: 35,
   z: 45,
   outputs: [],
   systemType: "insitu-fixed-point",
   sensorType: ""
});
var v_procedure = new istsos.VirtualProcedure({
   service: service,
   name: "V_GNOSCA",
   description: "",
   keywords: "",
   foi_name: "foi",
   epsg: 3857,
   x: 26,
   y: 36,
   z: 46,
   outputs: [],
   systemType: "virtual",
   sensorType: ""
});
var observed_prop = new istsos.ObservedProperty({
   service: service,
   observedName: "air-temperature",
   definitionUrn: "urn:ogc:def:parameter:x-istsos:1.0:meteo:air:temperature",
   observedDescr: "",
   constraintType: "between",
   value: [0, 1]
});

var dataQuality = new istsos.DataQuality({
   service: service,
   codeDQ: 100,
   nameDQ: "raw",
   descrDQ: "format is correct"
});
var uom = new istsos.UnitOfMeasure({
   service: service,
   uom: "mm",
   description: "milimeter"
});
var offeringB = new istsos.Offering({
   offeringName: "BELLINZONA",
   offeringDescription: "",
   active: true,
   expirationDate: null,
   service: service
});
var v_offeringG = new istsos.Offering({
   offeringName: "V_GNOSCA",
   offeringDescription: "",
   active: true,
   expirationDate: null,
   service: service
});
var beginTime = new istsos.Date({
   year: 2014,
   month: 05,
   day: 27,
   hours: 00,
   minutes: 00,
   seconds: 00,
   gmt: 2,
   description: ""
});
var endTime = new istsos.Date({
   year: 2014,
   month: 06,
   day: 5,
   hours: 00,
   minutes: 00,
   seconds: 00,
   gmt: 2,
   description: ""
});
/** GET REQUEST TESTS */
//server methods
function getServiceReq() {
   server.getService(service.name)
      .then(function(result) {
         log(result.data, 'SERVICE')
      });
}

function getStatusReq() {
   server.getStatus()
      .then(function(result) {
         log(result.data, 'STATUS')
      })
}

function getAbout() {
   server.getAboutInfo()
      .then(function(result) {
         log(result.data, 'ABOUT')
      })
}

function getConf() {
   server.getConfig()
      .then(function(result) {
         log(result.data, 'CONFIGRUATION')
      })
}

function getDb() {
   server.getDefaultDb()
      .then(function(result) {
         log(result.data, 'DATABASE')
      })
}

function getList() {
   server.getServices()
      .then(function(result) {
         log(result.data, 'SERVICES')
      })
}

//configuration methods
function getConfigurationReq() {
   var resp = prompt("Service name or default?", "default")
   if (resp === "default") {
      default_conf.getConf()
         .then(function(result) {
            log(result.data, 'DEFAULT CONFIGURATION')
         })
   } else {
      var service_conf = new istsos.Configuration({
         name: resp,
         server: server
      });
      service_conf.getConf()
         .then(function(result) {
            log(result.data, 'SERVICE CONFIGURATION')
         })
   }
}

function getProviderReq() {
   var resp = prompt("Service name or default?", "default")
   if (resp === "default") {
      default_conf.getProvider()
         .then(function(result) {
            log(result.data, 'CONFIGURATION')
         })
   } else {
      var service_conf = new istsos.Configuration({
         name: resp,
         server: server
      });
      service_conf.getProvider()
         .then(function(result) {
            log(result.data, 'CONFIGURATION')
         })
   }
}


function getIdentReq() {
   var resp = prompt("Service name or default?", "default")
   if (resp === "default") {
      default_conf.getIdentification()
         .then(function(result) {
            log(result.data, 'IDENTIFICATION')
         })
   } else {
      var service_conf = new istsos.Configuration({
         name: resp,
         server: server
      });
      service_conf.getIdentification()
         .then(function(result) {
            log(result.data, 'IDENTIFICATION')
         })
   }
}

function getCoordSysReq() {
   var resp = prompt("Service name or default?", "default")
   if (resp === "default") {
      default_conf.getCrs()
         .then(function(result) {
            log(result.data, 'CRS')
         })
   } else {
      var service_conf = new istsos.Configuration({
         name: resp,
         server: server
      });
      service_conf.getCrs()
         .then(function(result) {
            log(result.data, 'CRS')
         })
   }
}

function mqtt() {
   var resp = prompt("Service name or default?", "default")
   if (resp === "default") {
      default_conf.getMqtt()
         .then(function(result) {
            log(result.data, 'MQTT')
         })
   } else {
      var service_conf = new istsos.Configuration({
         name: resp,
         server: server
      });
      service_conf.getMqtt()
         .then(function(result) {
            log(result.data, 'MQTT')
         })
   }
}

function getOC() {
   var resp = prompt("Service name or default?", "default")
   if (resp === "default") {
      default_conf.getObservationConf()
         .then(function(result) {
            log(result.data, 'OBSERVATION CONFIG')
         })
   } else {
      var service_conf = new istsos.Configuration({
         name: resp,
         server: server
      });
      service_conf.getObservationConf()
         .then(function(result) {
            log(result.data, 'OBSERVATION CONFIG')
         })
   }
}

function getProxyReq() {
   var resp = prompt("Service name or default?", "default")
   if (resp === "default") {
      default_conf.getProxy()
         .then(function(result) {
            log(result.data, 'PROXY')
         })
   } else {
      var service_conf = new istsos.Configuration({
         name: resp,
         server: server
      });
      service_conf.getProxy()
         .then(function(result) {
            log(result.data, 'PROXY')
         })
   }
}

function getEPSGS() {
   var resp = prompt("Service name or default?", "default")
   if (resp === "default") {
      default_conf.getEpsgCodes()
         .then(function(result) {
            log(result.data, 'EPSG')
         })
   } else {
      var service_conf = new istsos.Configuration({
         name: resp,
         server: server
      });
      service_conf.getEpsgCodes()
         .then(function(result) {
            log(result.data, 'EPSG')
         })
   }
}

//Service methods
function getOffNames() {
   service.getOfferingNames()
      .then(function(result) {
         log(result.data, 'OFFERING NAMES')
      })
}

function getOffs() {
   service.getOfferings()
      .then(function(result) {
         log(result.data, 'OFFERINGS')
      })
}

function getProcs() {
   service.getProcedures()
      .then(function(result) {
         log(result.data, 'PROCEDURES')
      })
}

function getProc() {
   service.getProcedure(procedure1)
      .then(function(result) {
         log(result.data, 'PROCEDURE')
      })
}

function getVProcs() {
   service.getVirtualProcedures()
      .then(function(result) {
         log(result.data, 'VIRTUAL PROCEDURES')
      })
}

function getVProc() {
   service.getVirtualProcedure(v_procedure)
      .then(function(result) {
         log(result.data, 'VIRTUAL PROCEDURE')
      })
}

function getOPS() {
   service.getObservedProperties()
      .then(function(result) {
         log(result.data, 'OBSERVED PROPERTIES')
      })
}

function getOP() {
   service.getObservedProperty(observed_prop)
      .then(function(result) {
         log(result.data, 'OBSERVED PROPERTY')
      })
}

function getDQs() {
   service.getDataQualities()
      .then(function(result) {
         log(result.data, 'DATA QUALITIES')
      })
}

function getDQ() {
   service.getDataQuality(dataQuality)
      .then(function(result) {
         log(result.data, 'DATA QUAILITY')
      })
}

function getUOMs() {
   service.getUoms()
      .then(function(result) {
         log(result.data, 'UNITS OF MEASURES')
      })
}

function getUOM() {
   service.getUom(uom)
      .then(function(result) {
         log(result.data, 'UNIT OF MEASURE')
      })
}

function getSysTypes() {
   service.getSystemTypes()
      .then(function(result) {
         log(result.data, 'SYSTEM TYPES')
      })
}

function getServiceDatabase() {
   service.getDatabase()
      .then(function(result) {
         log(result.data, 'DATABASE')
      })
}

function getMembers() {
   offeringB.getMemberProcedures()
      .then(function(result) {
         log(result.data, 'MEMBER PROCEDURES')
      })
}

function getNonMembers() {
   offeringB.getNonMemberProcedures()
      .then(function(result) {
         log(result.data, 'NON MEMBER PROCEDURES')
      })
}

function getRCurve() {
   v_procedure.getRatingCurve()
      .then(function(result) {
         log(result.data, 'RATING CURVE')
      })
}

function getCodeReq() {
   v_procedure.getCode()
      .then(function(result) {
         log(result.data, 'CODE')
      })
}

function getGEOJSON() {
   //TRY WITH
   //service.getFeatureCollection(3857)
   //service.getFeatureCollection(3857, offering)
   service.getFeatureCollection({opt_epsg: 3857})
      .then(function(result) {
         console.log(result)
         log(result, 'GEOJSON')
      })
      //service.getFeatureCollection(3857, null, v_procedure)
      //service.getFeatureCollection(3857, offering, procedure)
      //service.getFeatureCollection(3857, offering, v_procedure)
      //service.getFeatureCollection(3857, offering);
}
var air_rainfall = new istsos.ObservedProperty({
   service: service,
   observedName: "air-rainfall",
   definitionUrn: "urn:ogc:def:parameter:x-istsos:1.0:meteo:air:rainfall",
   observedDescr: "",
   constraintType: "lessThan",
   value: 10
});
var air_temperature = new istsos.ObservedProperty({
   service: service,
   observedName: "air-temperature",
   definitionUrn: "urn:ogc:def:parameter:x-istsos:1.0:meteo:air:temperature",
   observedDescr: "",
   constraintType: "lessThan",
   value: 10
});
var air_relative_humidity = new istsos.ObservedProperty({
   service: service,
   observedName: "air-relative-humidity",
   definitionUrn: "urn:ogc:def:parameter:x-istsos:1.0:meteo:air:relative:humidity",
   observedDescr: "",
   constraintType: "lessThan",
   value: 10
});
var air_wind_velocity = new istsos.ObservedProperty({
   service: service,
   observedName: "air-wind-velocity",
   definitionUrn: "urn:ogc:def:parameter:x-istsos:1.0:meteo:air:wind:velocity",
   observedDescr: "",
   constraintType: "lessThan",
   value: 10
});

var procedure2 = new istsos.Procedure({
   service: service,
   name: "LOCARNO",
   description: "",
   keywords: "",
   foi_name: "foi",
   epsg: 3857,
   x: 25,
   y: 35,
   z: 45,
   outputs: [],
   systemType: "insitu-fixed-point",
   sensorType: ""
});

var offeringTemp = new istsos.Offering({
   offeringName: "temporary",
   offeringDescription: "",
   active: true,
   expirationDate: "",
   service: service
});

function getOBSERVATIONS() {
   //TRY WITH
   //service.getObservations(v_offeringG, v_procedure, [], beginTime, endTime);
   /*air-rainfall (mm)
    air-temperature (°C)
    air-relative-humidity (%)
    air-wind-velocity (m/s)*/
   service.getObservations({
      offering: offeringTemp,
      procedures: [procedure1, procedure2],
      observedProperties: [air_temperature, air_rainfall],
      begin: beginTime,
      end: endTime
   }).then(function(result) {
      log(result.data, 'GET OBSERVATIONS')
   })
}

function getOBSERVATIONDATA_AGG() {
   service.getObservationsWithAggregation({
      offering: offeringTemp,
      procedures: [procedure1],
      observedProperties: [air_temperature, air_rainfall],
      begin: beginTime,
      end: endTime
   }, {
      aggFunc: "AVG",
      aggInterval: "P2DT"
   }).then(function(result) {
      log(result.data, 'GET OBSERVATIONS (AGGREGATIONS)')
   })
}

function getOBSERVATIONDATA() {
   service.getObservationsSimplified({
      offering: offeringB,
      procedures: [procedure1],
      observedProperties: [air_rainfall],
      begin: beginTime,
      end: endTime
   }).then(function(result) {
      log(result, 'GET OBSERVATIONS (SIMPLIFIED)')
   })
}

function getOBSERVATIONS_QI() {
   service.getObservationsByQualityIndexConstraint({
      offering: offeringB,
      procedures: [procedure1],
      observedProperties: [air_rainfall],
      begin: beginTime,
      end: endTime
   }, {
      type: 'between',
      quaility: [200, 300]
   }).then(function(result) {
      log(result.data, 'GET OBSERVATIONS (QUALITY INDEX)')
   })
}

//DATABASE
function getDatabase() {
   var resp = prompt("Default or not?", "default");
   if (resp === "default") {
      var defaultdb = new istsos.Database("istsos", "localhost", "postgres", "postgres", 5432);
      defaultdb.getDb("default", server)
         .then(function(result) {
            log(result.data, 'DATABASE')
         })
   } else {
      db.getDb("test_post", server)
         .then(function(result) {
            log(result.data, 'DATABASE')
         })
   }
}