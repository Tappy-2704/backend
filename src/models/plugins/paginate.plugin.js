/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */

  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - sortField:(desc|asc), multiple criteria separated by commas
   * @param {string|Object} [options.populate] - Fields to populate
   * @param {string} [options.select] - Fields to include or exclude
   * @param {number} [options.limit=10] - Max results per page
   * @param {number} [options.page=1] - Current page
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options = {}) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    // Handle field selection
    if (typeof options.select === 'string') {
      docsPromise = docsPromise.select(options.select);
    } else if (this.defaultSelect) {
      docsPromise = docsPromise.select(this.defaultSelect);
    }

    // Handle population
    if (typeof options.populate === 'string') {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    } else if (typeof options.populate === 'object') {
      docsPromise = docsPromise.populate(options.populate);
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then(([totalResults, results]) => {
      const totalPages = Math.ceil(totalResults / limit);
      return {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
    });
  };
};

module.exports = paginate;
