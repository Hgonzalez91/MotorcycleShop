import Handlebars from "handlebars";

// Define un helper personalizado en Handlebars para acceder al rol del usuario
handlebars.registerHelper('userRole', function(user) {
    return user ? user.role : '';
});

export default handlebars;
