/* eslint-disable no-undef */
class ApiFeatures {
  constructor(model, query) {
    this.model = model;
    this.query = query;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ["sort", "page", "limit", "select"];
    excludedFields.forEach((ele) => delete queryObj[ele]);
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    this.model = this.model.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.replace(/,/g, " ");
      this.model = this.model.sort(sortBy);
    }
    return this;
  }
  select() {
    if (this.query.select) {
      const selectBy = this.query.select.replace(/,/g, " ");
      this.model = this.model.select(selectBy);
    }
    return this;
  }
  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 2;
    const skip = (page - 1) * limit;
    this.model = this.model.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
