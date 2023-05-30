class ApiFeatures {

    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i',       // "i" means = case insensitive(by default is sensitive)

            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        // Removing some fields for category
        const removeFields = ['keyword', 'page', "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        // Filter For Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)   // apply '$' to use query mongodb eg.($gt || $lt)

        this.query = this.query.find(JSON.parse(queryStr));
        
        return this

    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        // How much skip result
        const skip = resultPerPage * (currentPage - 1);

        // How much per Page result
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;