myApp.service('sharedProperties', function () {
        var property = [];
        property.email='Email:freshfruits@gmail.com';
        property.phone='987654321';
        property.content="A fruit is usually any sweet-tasting plant product, especially those associated with seeds.Nothing tastes quite as good as the sensuous flavour in the freshest fruits.";
       
        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });