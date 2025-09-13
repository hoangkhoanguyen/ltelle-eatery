"use server";
import { createProduct } from "@/services/products";
import { NewProductDB, UpdateProductDB } from "@/types/products";

export async function createProductAction(data: NewProductDB) {
  // Process form data and create product
  console.log("Creating product with data:", data);
  createProduct(data);
  // You can call your service function here to save the product to the database
  return { result: "success" };
}

export async function updateProductAction(data: UpdateProductDB) {}
