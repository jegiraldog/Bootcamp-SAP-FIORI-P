sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper"
], (Controller, HomeHelper) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        
        onPress: async function(){
            let oDatos = await HomeHelper.getDataProducts();
            await HomeHelper.setProductModel(this, oDatos[0].results);
        },

        onItemPress: function(oEvent){
            let oSource = oEvent.getSource();

            let aDatos = oSource.getBindingContext("ProductCollection").getObject();

            this.oRouter.navTo("detail", {
                ProductID: aDatos.ProductID
            });

        }
    });
});