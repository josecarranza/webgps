var base_url="http://repuestosautoweb.com/";

function getSolicitudes(id_venta_repuesto){


  var dataString = base_url + "sistema/API/ObtenerDashboard/"+id_venta_repuesto;



  $.ajax({
    type: "POST",
    url: dataString,
    beforeSend: function(){ $("#loginMsg").html('Conectando...');},
    success: function(data){
      var dataArray = JSON.parse(data);




      if(dataArray.success==true )
      {
        $("#cantSolcitudes").html(dataArray.solicitudes_nuevas[0].total_solicitudes);
      }
      else
      {
        $("#cantSolcitudes").html(dataArray["-"]);
      }
    }
  });

};

document.addEventListener("deviceready", onDeviceReady, false);

function get_totals(id_venta_repuesto){
  total_ventas=0;
  total_solicitudes=0;
  var dataString = base_url + "sistema/API/ventas_ventarepuestos_get/"+id_venta_repuesto;
  $.ajax({
    type: "POST",
    url: dataString,
    beforeSend: function(){ $("#loginMsg").html('ObteniendoDatos');},
    success: function(data){
      var dataArray = JSON.parse(data);
      total_ventas=dataArray.ventas.length;
 $(".cont-ventas").html(total_ventas);

    }
  });


  var dataString = base_url + "sistema/API/getSolicitudesxventa/"+id_venta_repuesto;
  $.ajax({
    type: "POST",
    url: dataString,
    beforeSend: function(){ $("#loginMsg").html('ObteniendoDatos');},
    success: function(data){
      var dataArray = JSON.parse(data);
     total_solicitudes=dataArray.solicitudes_nuevas.length;
  
             $(".cont-sol").html(total_solicitudes);
   }
 });


 
}





   // device APIs are available
   //
   function onDeviceReady() {
     //alert(window.localStorage.getItem("id_venta_repuesto"));
     getSolicitudes(window.localStorage.getItem("id_venta_repuesto"));
    //  $("a").attr("href", "DETAL")
     //getSolicitudes(window.localStorage.getItem("id_venta_repuesto"))
     get_totals(window.localStorage.getItem("id_venta_repuesto"));

   }

$(document).ready(function($) {
 // get_totals(window.localStorage.getItem("id_venta_repuesto"));
});