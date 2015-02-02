
function getAllRutasFijas()
{
    
   var webServiceURL = 'http://148.220.23.106/rtuaq/web/servicio/rutas.php?wsdl';
    var soapMessage = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getRutaFija xmlns="urn:rutas"><id>'++'</id></getRutaFija></soap:Body></soap:Envelope>';
     $.ajax({
        url: webServiceURL,
        type: "POST",
        cache: false,
        data: soapMessage,
        contentType: "text/xml",
        success: function (data, status) {
                 
        },
        error: onError
    });

  
}
//Función que se ejecuta si realizó completa la petición
function OnSuccess(data, status)
{
     
}
function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
{
    alert(status);
}
$(function() {
    //Evita problemas de cross-domain con JQuery
    jQuery.support.cors = true;
});