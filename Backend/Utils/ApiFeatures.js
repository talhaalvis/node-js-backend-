class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyWord = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyWord });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // remove fields from query
    const removeField = ["keyword", "page", "limit"];
    removeField.forEach((key) => delete queryCopy[key]);

    // Filter for pricing and rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
