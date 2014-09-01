/**
 * Created by Heta on 27-08-2014.
 */
$(document).ready(function(){

$(window).load(function(event){
    event.preventDefault();
    url="/emp/department/"
         $.ajax({
                     url: url,
                     type: "GET",
                     dataType: "json",
                     contentType:"application/json",
                     success: function (data) {
                         if(data.length==0) {
                             $("#department_list").append( "<tr id=\"nodata1\">"+ "<td class='alert-info' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");

                         }
                         else
                         {

                         $.each(data,function(key,value){

                             //var obj = $.parseJSON( value );
                             $("#department_list").append( "<tr id="+value.department_id+">"+
                                 "<td>"+ value.department_name +"</td>"+
                                 "<td>"+ "<a class=\"view\" id="+value.department_id+" name="+value.department_name+" href=\"#\">View Details</a>" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"edit btn\" id="+value.department_id+" name="+value.department_name+" value=\"Edit\">" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"delete btn\" id="+value.department_id+" name="+value.department_name+" value=\"Delete\">" +"</td>"+
                                 "</tr>");
                         });
                         }


                     },
                     error: function(xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }

            });



     });
    $('#department_list').on("click",'.view' ,function(event){
        event.preventDefault();
        var pk=$(this).attr("id");

        var name=$(this).attr("name");
       $.ajax({
            url: "/emp/employee/",
            type: "GET",
            dataType: "json",
            success: function(data){
                $("#listdepartment").hide();
                $("#emp_list tr td").remove();
                $("#viewdetails").show();
                $("#viewdet").html("Employees of "+name+" department")

                $.each(data,function(key,value){
                            if(value.department==pk) {

                              $("#emp_list").append("<tr>" +
                                    "<td>" + value.ename + "</td>" +
                                     "<td>" + value.age + "</td>" +
                                     "<td>" + value.emailid + "</td>" +
                                    "<td>" + value.mobno + "</td>" +
                                    "<td>" + value.designation + "</td>" +
                                    "</tr>");
                            } });

            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });
    });
    $("#department_list").on("click",".edit",function (event) {
        event.preventDefault();
        var pk = $(this).attr("id");
        var name = $(this).attr("name");
        $("#listdepartment").hide();
        $("#updatedepartment").show();
        $("#id_department1").val(name);
        $(".update").attr("id", "" + pk + "");

    });
    $(".update").click(function(event){
         event.preventDefault();
        var department=$("#id_department1").val();
       // alert(department)
        var pk=$(".update").attr("id");

         if (department.length == 0) {
             $("#error2").show();
             $("#error2").html("*Empty department field is not allowed!! Please try again");
             $("#error2").css("color", "red");
             return false;
         }
         else {
            $.ajax({
                url:  "/emp/department/",
                type: "GET",
                success: function (data) {
                    var flag = false;
                    $.each(data, function (key, value) {
                        if (department == value.department_name) {
                        flag = true;
                        }
                    });
                    if (flag == true) {
                        $("#error2").html("*This department already exists. Please try again.");
                        $("#error2").css("color", "red");
                    }
                    else {
                        $.ajax({
                            url: "/emp/department/" + pk + "/",
                            type: "PUT",
                            data: { "department_name": "" + department + "" },
                            dataType: "json",
                            success: function () {
                               $("#updatedepartment").hide();
                                $("#listdepartment").show();
                                $("tr#"+pk+" td:first").text(department);
                                $("a[id=" + pk + "]").attr("name", "" + department + "");
                                $("input[id=" + pk + "]").attr("name", "" + department + "");
                            },
                            error: function (xhr, status, errorThrown) {
                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                            }
                        });
                    }
                },
         error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }
        });  }
        });
    $("#back2").click(function (event) {
            event.preventDefault();
            $('#updatedepartment').hide();
            $("#error2").hide();
            $('#listdepartment').show();

        });
    $("#department_list").on("click",".delete",function (event) {

        event.preventDefault();
        var pk=$(this).attr("id");
        var name=$(this).attr("name");

        var delValue=confirm("Do you really want to delete  "+ name + " department?");
        if(delValue==true) {
            url = "/emp/department/"+pk+"/";

            $.ajax({
                url: url,
                type: "DELETE",
                dataType: "json",
                contentType:"application/json",
                success: function () {
                    $("#department_list tr#"+pk).remove();
                    $.ajax({
                     url: "/emp/department/",
                     type: "GET",
                     dataType: "json",
                     success: function (data) {
                         if(data.length==0) {
                             $("#department_list").append( "<tr id=\"nodata1\">"+ "<td class='alert-info' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");

                         } },
                     error: function (xhr, status, errorThrown) {  console.log("Error: " + errorThrown); }  });

                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });
        }
        });
    $("#back").click(function (event) {
        event.preventDefault();
        $.ajax({
            type:"GET",
            success: function(){

                window.location.href="/emp/"
            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });
        });
        $("#new").click(function (event) {
        event.preventDefault();
           // alert("Hello")
        $('#listdepartment').hide();
        $('#adddepartment').show();
        $('#id_department').val(null);
        $('#error1').html("");
        });
        $("#add").click(function (event) {
            event.preventDefault();
            if ($("#id_department").val().length == 0) {
                $("#error1").html("*Empty department field is not allowed.");
                $("#error1").css("color", "red");
                // event.preventDefault();
                return false;
            }
            else {
                url = "/emp/department/";

                var department = $("#id_department").val();

                $.ajax({
                    url: url,
                    type: "GET",
                    success: function (data) {
                        var flag = false;

                        $.each(data, function (key, value) {
                            if (department == value.department_name) {

                                flag = true;
                            }
                        });

                        if (flag==true) {
                            $("#error1").html("*This department already exists. Please try again.");
                            $("#error1").css("color", "red");

                        }
                        else {
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: { "department_name": "" + department + "" },
                                dataType: "json",
                                success: function (data) {
                                    $('#adddepartment').hide();
                                    $('#listdepartment').show();
                                    $('table tr#nodata1').hide();
                                    $("#listdepartment #department_list").append( "<tr  id="+data.department_id+">"+
                                 "<td id=\"1\">"+ data.department_name +"</td>"+
                                 "<td>"+ "<a class=\"view\" id="+data.department_id+" name="+data.department_name+" href=\"#\">View Details</a>" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"edit btn\" id="+data.department_id+" name="+data.department_name+" value=\"Edit\">" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"delete btn\" id="+data.department_id+" name="+data.department_name+" value=\"Delete\">" +"</td>"+
                                 "</tr>");

                                },
                                error: function (xhr, status, errorThrown) {
                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                            });
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                    }

                });


            }
        });
        $("#back1").click(function (event) {
            event.preventDefault();
            $('#adddepartment').hide();
                    $('#listdepartment').show();

        });
        $("#reset_dept").click(function (event) {
            event.preventDefault();
            $('#id_department').val(null);
            $('#error1').html("");

        });
    $("#back3").click(function (event) {
            event.preventDefault();
            $('#viewdetails').hide();
                    $('#listdepartment').show();

        });
});


