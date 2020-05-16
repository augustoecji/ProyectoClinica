function vaciarcasillasMensaje() {


        document.getElementById("name").innerHTML = "";
        document.getElementById("email").innerHTML = " ";
        document.getElementById("phone").innerHTML = " ";
        document.getElementById("message").innerHTML = "";
}

function vaciarcasillasCita() {

        var vacio = " ";


        document.getElementById("nom").innerHTML = vacio;
        document.getElementById("ema").innerHTML = vacio;
        document.getElementById("cedu").innerHTML = vacio;
        document.getElementById("tipo").innerHTML = vacio;
}


//creación array
var registroCitas = [];


function addCita() {
        //captura de valores de los input
        var cedula = document.getElementById("cedu").value;
        var nombre = document.getElementById("nom").value;
        var email = document.getElementById("ema").value;
        var tipoCita = document.getElementById("tipo").value;
        var horaCita = document.getElementById("hora").value;
        var medicos = ["Medico1", "Medico2", "Medico3", "Medico4"];
        var medico = medicos[Math.floor(Math.random() * medicos.length)];
        //creación de objeto para ser ingresados al array registroCitas
        var cita = {
                cedula: cedula,
                nombre: nombre,
                email: email,
                tipoCita: tipoCita,
                hora: horaCita,
                medico: medico
        }
        //validación para no cruzar horarios de citas con la misma cedula
        if (isAvailableCita(horaCita, cedula)) {
                registroCitas.push(cita)
                alert("Se creo correctamente la cita");
        } else {
                alert("Ya existe una cita en esa hora, vuelva a intentarlo");
        }
                vaciarcasillasCita();

}
//función para la validación de no cruzar horarios de citas con la misma cedula
function isAvailableCita(hora, cedula) {
        var isAvailable = true;
        registroCitas.map((cita) => {
                if (cita.hora === hora && cita.cedula === cedula) {
                        isAvailable = false;
                }
        });
        return isAvailable;
}

function searchCitaByCedula() {
        //declaración de variables para generar la tabla.
        var tableCitas = document.getElementById("tableCitas");
        var tableBodyCitas = document.getElementById("tableBody");
        var cedulaBusqueda = document.getElementById("numcedu").value;
        //variables para la validacion de evitar repetir la generacion de tabla al buscar por una segunda vez
        var deleteTable = false;
        var foundData = false;
        //El uso de la funcion MAP nos permite recorrer un array para que luego nos devuelve un array
        registroCitas.map((cita) => {

                var tableRow = document.createElement("TR");
                if (cita.cedula === cedulaBusqueda) {
                        foundData = true;
                        // la funcion in nos permite agilizar el uso del for. cpaturar los valores dentro del objeto cita
                        for (citaInfo in cita) {
                                var tableData = document.createElement("TD");
                                //aca empezamos a juntar los nodos hijos a los padres para la creacion de la tabla
                                //de cierta manera va subiendo la estructura del arbol hasta llegar al nodo padre que es tableBodyCitas
                                tableData.appendChild(document.createTextNode(cita[citaInfo]));
                                tableRow.appendChild(tableData);
                                tableBodyCitas.appendChild(tableRow);
                        }

                } else {
                        deleteTable = true;
                }

        })
        //si el deletetable es falso y founData verdadero, entonces va borrar las filas asociados a la cedula buscado
        if (deleteTable && !foundData) {
                tableCitas.removeChild(tableBodyCitas);
                tableBodyCitas = document.createElement("tbody");
                tableBodyCitas.setAttribute("id", "tableBody");
                tableCitas.appendChild(tableBodyCitas)
        }

}

// funcion para validar que al cerrar el modal, evita volver a realizar la funcion al buscar de nuevo la misma cedula
function deleteTableData() {
        var tableCitas = document.getElementById("tableCitas");
        var tableBodyCitas = document.getElementById("tableBody");
        tableCitas.removeChild(tableBodyCitas);
        tableBodyCitas = document.createElement("tbody");
        tableBodyCitas.setAttribute("id", "tableBody");
        tableCitas.appendChild(tableBodyCitas)
}

//esta funcion funciona de cierta manera igual que la de buscar cedula
// no solo compara si las cedulas ingresas son iguales sino tambien que la hora sea igual para ser borrado

function eliminarCita() {
        var cedulaBusqueda = document.getElementById("deleteCedula").value;
        var horaBuscada = document.getElementById("deleteHora").value;
        var tableBodyCitas = document.getElementById("tableBody");


        //El uso de la funcion MAP nos permite recorrer un array para que luego nos devuelve un array
        registroCitas.map((cita) => {

                console.log("cedula buscada es" + cita.cedula);
                console.log("cedula ingresada es" + cedulaBusqueda);
                console.log("hora buscada es" + cita.hora);
                console.log("hora ingresado es" + horaBuscada);
          
                if (cita.cedula === cedulaBusqueda && cita.hora === horaBuscada) {


                        // la funcion in nos permite agilizar el uso del for para capaturar los valores dentro del objeto cita
                       
                        tableBodyCitas.removeChild(tablerow);
                            
                        console.log("se borro")



                } else {
                        console.log("no se borro nada")
                       // alert("no se encontro una cita registrada con el numero de cedula ingresado");

                }
        })
}
/*!
    * Start Bootstrap - Freelancer v6.0.1 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
    */
   (function($) {
        "use strict"; // Start of use strict
      
        // Smooth scrolling using jQuery easing
        $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: (target.offset().top - 71)
              }, 1000, "easeInOutExpo");
              return false;
            }
          }
        });
      
        // Scroll to top button appear
        $(document).scroll(function() {
          var scrollDistance = $(this).scrollTop();
          if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
          } else {
            $('.scroll-to-top').fadeOut();
          }
        });
      
        // Closes responsive menu when a scroll trigger link is clicked
        $('.js-scroll-trigger').click(function() {
          $('.navbar-collapse').collapse('hide');
        });
      
        // Activate scrollspy to add active class to navbar items on scroll
        $('body').scrollspy({
          target: '#mainNav',
          offset: 80
        });
      
        // Collapse Navbar
        var navbarCollapse = function() {
          if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
          } else {
            $("#mainNav").removeClass("navbar-shrink");
          }
        };
        // Collapse now if page is not at top
        navbarCollapse();
        // Collapse the navbar when page is scrolled
        $(window).scroll(navbarCollapse);
      
        // Floating label headings for the contact form
        $(function() {
          $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
          }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
          }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
          });
        });
      
      })(jQuery); // End of use strict
  
