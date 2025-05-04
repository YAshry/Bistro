class APIFeatures {
    constructor(mongooseQuery, queryStringObject){
        this.mongooseQuery = mongooseQuery;
        this.queryStringObject = queryStringObject;
    }
    filter(){
        const excludedFields = ["sort", "page", "limit", "fields"]
        let filterData = {...this.queryStringObject}
        excludedFields.forEach(field => delete filterData[field]);
        
        // Advanced Filtering
        let queryStr = JSON.stringify(filterData);
        queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (matchedWord)=>`$${matchedWord}`)

        filterData = JSON.parse(queryStr);
        this.mongooseQuery = this.mongooseQuery.find(filterData);
    }
    sort(){
        if(this.queryStringObject.sort){
            const sortBy = this.queryStringObject.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy)
        }
    }
    select(){
        if(this.queryStringObject.fields){
            const selectedFields = this.queryStringObject.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(selectedFields);
        }else{
            this.mongooseQuery = this.mongooseQuery.select("-__v");
        }
    }
    paginate(){
        const page = this.queryStringObject.page || 1;
        const limit = this.queryStringObject.limit || 100;
        const skip = (page-1)*limit;
        this.mongooseQuery.skip(skip).limit(limit);
    }
}

module.exports = APIFeatures;