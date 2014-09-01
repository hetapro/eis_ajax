/**
 * Created by Heta on 27-08-2014.
 */

$(document).ready(function(){

$("#list1").click(function (event) {
        event.preventDefault();
             url="/emp/department/";

            $.ajax({
                     type: "GET",
                     success: function () {

                            window.location.href="/emp/list1/"
                     },
                     error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }

            });



     });
    $("#list").click(function (event) {
        event.preventDefault();
             url="/emp/employee/";

            $.ajax({
                     type: "GET",
                     success: function () {

                            window.location.href="/emp/list/"
                     },
                     error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }

            });



     });

});


