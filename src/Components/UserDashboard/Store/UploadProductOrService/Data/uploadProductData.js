

let data = {
     categoryDataSet: [
        {
            category:"Electronics",
            type:[{name:"phones"}, {name:"laptop"}, {name:"appliances"}]
        },
        {
            category:"Furniture",
            type:[{name:"chairs"}, {name:"table"}, {name:"stool"}]
        },
        {
            category:"Clothes",
            type:[]
        },
        {
            category:"Books",
            type:[]
        }
    ],

}


function UploadProductData() { }
UploadProductData.prototype.data = data;

UploadProductData.prototype.getCategoryData = function() {
    return this.data.categoryDataSet
}

export default new UploadProductData();