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
    },
    SubscriptionPlans: {
        planExist: {
            sp: 'El plan que intenta registrar ya existe, por favor trate con uno diferente.',
            en: "The plan you're trying to create is already exists, please try with a different one."
        },
        created: {
            sp: "El plan ha sido registrado con éxito.",
            en: "The subscription plan was successfully created."
        },
        update: {
            sp: 'El plan por id ha sido actualizado con éxito.',
            en: 'The specific plan has been successfully updated.'
        },
        getById: {
            success: {
                sp: 'Plan de suscripción mostrado con éxito.',
                en: 'Subscription plan successfully displayed.'
            },
            notFound: {
                sp: 'El plan específico no existe.',
                en: 'The specific plan does not exist.'
            }
        }
    },
    Locations: {
        Municipalities: {
            get: {
                all: {
                    sp: "Municipios mostrados con éxito.",
                    en: "Municipalities displayed sucessfully."
                },
                byId: {
                    notFound: {
                        sp: "Municipio específico no existe.",
                        en: "The specific municipality  does not exists."
                    },
                    success: {
                        sp: " específico mostrado con éxito.",
                        en: "The specific municipality displayed successfully."
                    }
                }
            }
        },
        States: {
            get: {
                all: {
                    sp: "Estados por país mostrados con éxito.",
                    en: "States by country displayed sucessfully."
                },
                byId: {
                    notFound: {
                        sp: "El estado específico no existe.",
                        en: "The specific state does not exists."
                    },
                    success: {
                        sp: " específico mostrado con éxito.",
                        en: "The specific state displayed successfully."
                    }
                }
            }
        },
        Countries: {
            get: {
                all: {
                    sp: "Países mostrados con éxito.",
                    en: "Countries sucessfully displayed."
                },
                byId: {
                    notFound: {
                        sp: "País específico no existe.",
                        en: "The specific country does not exists."
                    },
                    success: {
                        sp: "País específico mostrado con éxito.",
                        en: "The specific country displayed successfully."
                    }
                }
            }
        }
    },
    Institutions: {
        get: {
            success: {
                sp: "Instituciones por principal mostradas con éxito.",
                en: "Institutions by principal displayed successfully."
            },
            notFound: {
                sp: "El principal específico no existe.",
                en: "The specific principal does not exists."
            },
            byId: {
                notFound: {
                    sp: "La institución específica no existe.",
                    en: "The specific institution does not exists."
                },
                success: {
                    sp: "Institución específica mostrada con éxito.",
                    en: "The specific institution displayed successfully."
                }
            }
        },
        update: {
            success: {
                sp: "Institución actualizada con éxito.",
                en: "Institution updated successfully."
            }
        },
        delete: {
            success: {
                sp: "Institución eliminada con éxito.",
                en: "Institution removed successfully."
            }
        }
    },
    Branches: {
        limit: (BranchLimit: number, Lang: 'sp' | 'en'): string => {
            const Translations = {
                sp: `Has alcanzado el límite máximo de sucursales permitidas. Tu plan actual te permite tener ${BranchLimit} sucursales.`,
                en: `You have reached the branch limit. Your current plan allows you to have ${BranchLimit} branches.`
            }
            return Translations[Lang];
        },
        created: {
            sp: "La sucursal ha sido registrada con éxito.",
            en: "The branch was successfully created."
        }
    }
};