const Product = require("../models/product.model");

async function createProduct(reqData) {
  let topLevel = await Category.findOne({ name: reqData, topLevelCategory });

  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      lavel: 1,
    });
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCateory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCateory,
      parentCategory: topLevel._id,
      level: 2,
    });
  }

  let thirdLevel = await category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountedPersent: reqData.discountedPersent,
    imageUrl: reqData.imageUrl,
    brand: reqdata.brand,
    price: reqData.price,
    sizes: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });

  return await product.save();
}

async function deleteProduct(productId) {
  const product = await findProductById(productId);

  await Product.findByIdAndDelete(productId);
  return "Product deleted Sucessfully";
}

async function updateProduct(productId, reqData) {
  return await Product.findByIdAndDelete(productId, reqData);
}

async function findProductById(id) {
  const product = await Prduct.findById(id).populate("category").exec();

  if (!product) {
    throw new Error("product not found with id" + id);
  }
  return product;
}

async function getAllProduct(reqQuery) {
  let {
    category,
    color,
    size,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pagesize,
  } = reqQuery;

  pagesize = pagesize || 10;

  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (!existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }
  //white , black, orange
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    const colourRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

    query = query.where("color").regex(colourRegex);
  }
  if (sizes) {
    const sizesSet = new Set(sizes);
    query.query.where("sizes.name").in([...sizesSet]);
  }
  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountedPresent").gt(minDiscount);
  }

  if (stock) {
    if (stock == "in_stock") {
      query = (await query.where("quantity")).gt(0);
    } else if (stock == "out_of_stock") {
      query = (await query.where("quantity")).gt(1);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProduct = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pagesize;

  query = query.skip(skip).limit(pagesize);
  const products = await query.exec();

  const totalPages = Math.ceil(totalProduct / pagesize);

  return { content: products, currentPage: pageNumber, totalPages };
}

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  findProductById,
  createMultipleProduct,
};
