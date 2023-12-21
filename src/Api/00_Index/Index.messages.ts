export default {
    Auth: {
        login: {
            notFoundUser: {
                sp: "El usuario específico no existe.",
                en: "Could not find your account."
            },
            invalidCredentials: {
                sp: "Las credenciales ingresadas son incorrectas.",
                en: "The credentials entered are incorrect."
            },
            welcome: (sFullname: string, sLang: 'sp' | 'en'): string => {
                const Translations = {
                    sp: `Bienvenido a Artemisa ${sFullname}`
                }
                return Translations[sLang];
            },
            token: {
                sp: "Token generado con éxito."
            },
            invalidPlatformAccess: {
                sp: "Cuenta temporalmente desactivada, consulte a un administrador.",
                en: "Account temporally deactivated, talk to an administrator",
            }
        },
        session: {
            sessionKilled: {
                sp: "Esta sesión ha finalizado.",
                en: "This session has been finished."
            },
            success: {
                sp: "Sesión finalizada con éxito.",
                en: "Session ended successfully."
            },
            verifySession: {
                sp: "Por favor, inicie sesión.",
                en: "Please, login."
            },
            expired: {
                sp: "Por seguridad, se ha cerrado tu sesión.",
                en: "For security reasons, you have been logged out."
            }
        },
        matchPasswords: {
            dontMatch: {
                sp: "Las contraseñas no coinciden.",
                en: "Passwords do not match."
            }
        },
        signup: {
            userExist: {
                sp: "El correo electrónico de usuario está en uso. Por favor prueba con otro.",
                en: "That user email is already taken. Try another."
            },
            success: {
                sp: "Usuario registrado con éxito.",
                en: "User registered successfully."
            },
            typeNotExist: {
                sp: "Este tipo de usuario no existe",
                en: "This type of user does not exists"
            },
            platformAccessFalse: {
                sp: "Su cuenta se encuentra temporalmente suspendida.",
                en: "Your account is temporarily suspended."
            },
            platformAccessMinutes: {
                sp: "Su cuenta se encuentra temporalmente suspendida por",
                en: "Your account is temporarily suspended for"
            },
            sendPassword: {
                sp: "Su contraseña temporal es: ",
                en: "Your temporary password is: "
            },
            welcomeMessage: {
                sp: "¡Bienvenido a Proplat!",
                en: "Welcome to proplat!"
            }
        },
        verify: {
            sp: "Usuario verificado con éxito.",
            en: "Verified user successfully."
        }
    },
    UploadImages: {
        fileNotFound: {
            sp: "Por favor, selecciona un archivo correcto.",
            en: "Please, select a correct file."
        },
        fileNameNotFound: {
            sp: "Por favor, selecciona un nombre de archivo correcto.",
            en: "Please, select a correct file name."
        }
    },
    Users: {
        platformAccess: {
            true: {
                sp: "Actualmente el usuario cuenta con estado ACTIVO."
            },
            false: {
                sp: "Actualmente el usuario cuenta con estado BLOQUEADO."
            },
            success: {
                sp: "El acceso de usuario por id fue actualizado con éxito."
            }
        },
        getById: {
            success: {
                sp: "Usuario desplegado con éxito.",
                en: "User displayed successfully."
            },
            notFound: {
                sp: "Usuario especificado no existe.",
                en: "Specified user does not exists."
            }
        },
        get: {
            sp: "Usuarios mostrados con éxito.",
            en: "Users displayed successfully."
        },
        delete: {
            success: function (sLang: string, sFullName: string): string {
                const lang = {
                    sp: `Usuario ${sFullName} eliminado con éxito.`,
                    en: `User ${sFullName} succesfully removed.`
                }
                return lang[sLang]
            },
            sameUser: {
                sp: "No es posible llevar a cabo eliminación, el usuario se encuentra fuera del rango.",
                en: "Delete not possible, user is out of range."
            },
            superAdmin: {
                sp: "Falló al eliminar. No es posible eliminar un super usuario.",
                en: "Delete failed. Cannot delete super user."
            }
        },
        update: {
            sp: "Usuario actualizado con éxito.",
            en: "User displayed successfully."
        },
        created: {
            sp: "Registro exitoso, por favor revisa tu bandeja de entrada para confirmar tu registro.",
            en: "User displayed successfully."
        },
        profilePicture: {
            uploaded: {
                sp: "Imagen de perfil para usuario subida con éxito.",
                en: "User profile picture uploaded successfully."
            }
        }
    },
    Pagination: {
        invalidNumber: {
            sp: "El número de página debe de ser un número mayor a 0.",
            en: "The page number must be a number greater than 0"
        },
        maximumNumber: {
            sp: "El número de página ingresado excede el número total de páginas.",
            en: "The page number entered exceeds the total number of pages."
        }
    },
    RecoveryPasswords: {
        success: {
            sp: "Las instrucciones de recuperación han sido enviadas, revisa tu bandeja de entrada.",
            en: "Recovery instructions have been sent. Please check your inbox."
        },
        tokenExists: {
            sp: "Actualmente cuentas con un código de recuperación activo.",
            en: "You currently have an active recovery code."
        },
        tokenNotExists: {
            sp: "El token ingresado es inválido.",
            en: "This token is invalid."
        },
        expireToken: {
            sp: "El token ingresado ha expirado.",
            en: "Entered token has been expired."
        },
        passwordChanged: {
            sp: "Contraseña actualizada con éxito.",
            en: "Password updated successfully."
        },
        typeNotFound: {
            sp: "El tipo de usuario no existe.",
            en: "This user type does not exists."
        },
        bodyMessage: {
            sp: "Tu token de recuperación es: ",
            en: "Your recovery password token is: "
        },
        subjectMessage: {
            sp: "Token de verificación.",
            en: "Recovery token."
        }
    }
};