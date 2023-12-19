export default {
    JoiValidationError: {
        Locations: {
            StateId: {
                sp: "Por favor, ingresa un id de estado correcto.",
                en: "Please, enter a correct state id."
            },
            Name: {
                sp: "Por favor, ingresa un valor de tipo alfanumérico para el nombre de localidad.",
                en: "Please, input a correct text value for localization name."
            },
            Code: {
                sp: "Por favor, ingresa un valor de tipo alfanumérico para el código de localidad.",
                en: "Please, input a correct text value for localization code."
            },
            LocationId: {
                sp: "Por favor, ingresa un valor tipo UUID para el id de una localidad.",
                en: "Please, input a correct UUID value for location id."
            }
        },
        Login: {
            Password: {
                sp: "Por favor, ingrese una contraseña correcta. Debe tener como mínimo 6 caracteres.",
                en: "Please enter a correct password. It must be at least 6 characters long."
            },
            Email: {
                sp: "Por favor, ingresa un correo electrónico válido.",
                en: "Please, enter a correct email."
            },
            DeviceId: {
                sp: "Por favor, ingresa un id de dispositivo correcto.",
                en: "Please, enter a correct device id."
            },
            DeviceName: {
                sp: "Por favor, ingresa un nombre de dispositivo correcto.",
                en: "Please, enter a correct device name."
            },
            Token: {
                sp: "Por favor, ingresa un token de solicitud correcto.",
                en: "The session token is not correct."
            }
        },
        Filters: {
            MimeType: {
                sp: "Por favor, ingresa un valor correcto para el tipo de archivo.",
                en: "Please, enter a correct value for file type."
            },
            Search: {
                sp: "Por favor, ingresa un valor correcto para la búsqueda",
                en: "Please, enter a correct value for search"
            },
            PageNumber: {
                sp: "Por favor, ingresa un valor númerico mayor o igual a 1 para la paginación.",
                en: "Please, enter a numeric value bigger than or equal to 1 for pagination."
            },
            ItemsPerPage: {
                sp: "Por favor, ingresa un valor númerico mayor o igual a 1 para los elementos por página.",
                en: "Please, enter a numeric value bigger than or equal to 1 for items per page."
            },
            Total: {
                sp: "Por favor, ingresa un valor númerico para el total de elementos.",
                en: "Please, enter a numeric value for total items."
            },
            ImagesSizes: {
                sp: "Por favor, asegurese de usar un arreglo de tamaño de imagenes correcto.",
                en: "Please, enter a correct array of images sizes"
            },
            ImageLength: {
                sp: "Por favor, ingrese un valor númerico para la longitud del arreglo de imagenes.",
                en: "Please, enter a numeric value for array of images length"
            },
            Customer: {
                sp: "Por favor, ingrese un valor booleano.",
                en: "Please, enter a boolean value."
            },
            VendorEnterpriseId: {
                sp: "Por favor, ingresa un id de empresa proveedora correcta.",
                en: "Please, enter a correct vendor enterprise id."
            },
            Verified: {
                sp: "Por favor, ingresa un valor booleano para el filtro de status de usuario.",
                en: "Please, input a boolean value for status user filter."
            },
            Filter: {
                sp: "Por favor, ingresa un valor númerico para usar este filtro.",
                en: "Please, input a numeric value for use this filter."
            },
            Sort: {
                sp: "Por favor ingresa un valor entre 'asc' o 'desc' para ordenar los datos de forma correcta.",
                en: "Please, input a value between 'asc' or 'desc' to sort the data correctly."
            },
            TransactionType: {
                sp: "Por favor ingresa un valor entre 'in' o 'out' para ordenar los datos de forma correcta.",
                en: "Please, input a value between 'in' or 'out' to sort the data correctly."
            },
            Start: {
                sp: "La fecha de inicio ingresada no es válida, asegúrese de usar un formato YYYY-MM-DD.",
                en: "Entered start date is invalid, make sure to use a YYYY-MM-DD format."
            },
            End: {
                sp: "La fecha final ingresada no es válida, asegurese de que sea mayor a la inicial y que cumpla con el formato YYYY-MM-DD.",
                en: "End date entered is not valid, make sure it is greater than the initial one and that it complies with the YYYY-MM-DD format."
            },
            StatusId: {
                sp: "Por favor, ingresa un identificador para un estatus valido.",
                en: "Please, input a correct purchase order status id."
            }
        },
        RecoveryPassword: {
            Token: {
                sp: "Por favor, ingrese un token de recuperación de contraseña válido.",
                en: "Please, enter a valid recovery password token."
            },
            NewPassword: {
                sp: "Por favor, ingrese una contraseña con mas de 6 y menos de 13 caracteres.",
                en: "Please enter a password with more than 6 and less than 13 characters."
            },
            ConfirmNewPassword: {
                sp: "Por favor, ingrese una contraseña con mas de 6 y menos de 13 caracteres.",
                en: "Please enter a password with more than 6 and less than 13 characters."
            },
            Lang: {
                sp: "Por favor, ingresa un código de lenguage correcto.",
                en: "Please, enter a correct language code."
            },
            UserType: {
                sp: "Por favor, ingresa un tipo de usuario correcto.",
                en: "Please, enter a correct user type"
            },
            PrimaryKey: {
                sp: "Por favor, ingresa un identificador correcto para el tipo de usuario.",
                en: "Please, enter a correct id for the user type."
            },
        },
        Sessions: {
            Authorization: {
                sp: 'Por favor, ingresa un token de sesión correcto.'
            }
        },
        Users: {
            Name: {
                sp: "Por favor, ingresa un nombre correcto.",
                en: "Please, enter a valid name."
            },
            Lastname: {
                sp: "Por favor, ingresa un apellido correcto.",
                en: "Please, enter a valid last name."
            },
            Email: {
                sp: "Por favor, ingresa una dirección de correo válida.",
                en: "Please, enter a valid email."
            },
            PhoneNumber: {
                sp: "Por favor, ingresa un número de teléfono correcto.",
                en: "Please, enter a valid phone number."
            },
            UserId: {
                sp: "Por favor, ingresa un id de usuario correcto.",
                en: "Please, enter a valid user id."
            },
            Lang: {
                sp: "Por favor, ingresa un código lenguage correcto.",
                en: "Please, enter a valid language code."
            },
            Password: {
                sp: "Por favor, ingrese una contraseña correcta. Debe tener como mínimo 6 caracteres.",
                en: "Please enter a correct password. It must be at least 6 characters long."
            },
            PlatformAccess: {
                sp: "Por favor, ingresa un valor verdadero o falso para el estado de usuario.",
                en: "Please, input a true or false value for platform access user status."
            },
            Read: {
                sp: "Por favor, ingresa un valor verdadero o falso para el estado de una notificación.",
                en: "Please, input a true or false value for notification status."
            },
            CountryCallingCode: {
                sp: "Por favor, ingresa una número de clave de país correcto.",
                en: "Please, input a correct country number key."
            },
            AreaCallingCode: {
                sp: "Por favor, ingresa una número de clave de área correcto.",
                en: "Please, input a correct area calling code number."
            },
            PhoneExtension: {
                sp: "Por favor, ingresa un número de extensión para usuario correcto.",
                en: "Please, input a correct phone number."
            }
        }
    },
    Middleware: {
        undefinedToken: {
            sp: "Token de verificación no válido, verificar la información proporcionada.",
            en: "Invalid verification token, please verify the information provided."
        },
        invalidToken: {
            sp: "El token de sesión no es correcto.",
            en: "The session token is not correct."
        },
        accessDenied: {
            sp: "Accesso denegado.",
            en: "Access denied."
        },
        invalidFile: {
            sp: "Formato de documento no soportado.",
            en: "File format not supported.",
        }
    },
    Emails: {
        WelcomeEnterprise: {
            title: {
                sp: "Bienvenido a",
                en: "Welcome to"
            },
            follow: {
                sp: "Haz click en el siguiente botón para verificar tu cuenta.",
                en: "Click the button below to verify your email."
            },
            button: {
                sp: "Verificar",
                en: "Verify"
            }
        },
        WelcoleEmployee: {
            title: {
                sp: "Bienvenido a",
                en: "Welcome to"
            },
            follow: {
                sp: "Un usuario administrador te ha registrado en la plataforma, haz click en el siguiente botón para actualizar tu contraseña.",
                en: "An administrator user has registered you on the platform, click on the following button to update your password."
            },
            button: {
                sp: "Actualizar contraseña",
                en: "Update password"
            }
        },
        RecoveryPassword: {
            title: {
                sp: "Recuperación de contraseña",
                en: "Recovery password"
            },
            follow: {
                sp: "Haz click en el siguiente botón para actualizar tu contraseña.",
                en: "Click on the following button to update your password."
            },
            button: {
                sp: "Recuperar contraseña",
                en: "Recovery password"
            }
        }
    }
}