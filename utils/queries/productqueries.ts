import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const fetchProducts = async () => {
  "use server";
  const supabase = createClient();
  const { data: products } = await supabase.from("products").select();
  return products;
};

const deleteProduct = async (product_id: string) => {
  "use server";

  console.log("Deleting product with ID:", product_id);
  console.log("Type of product_id:", typeof product_id);

  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("product_id", product_id);

  if (error) {
    console.error("Delete error:", error.message);
  } else if (data) {
    console.log("Delete successful:", data);
  } else {
    console.warn("No records deleted. Check if the product_id exists.");
  }
  revalidatePath("/products");
};

const editProduct = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  const name = formData.get("name");
  const status = formData.get("status");
  const price = formData.get("price");
  const product_id = formData.get("product_id");

  await supabase
    .from("products")
    .update({ name: name, status: status, price: price });

  revalidatePath("/products");
};

const addProduct = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  const name = formData.get("name");
  const status = formData.get("status");
  const price = formData.get("price");
  await supabase
    .from("products")
    .insert([{ name: name, status: status, price: price }]);
  revalidatePath("/products");
};

export { deleteProduct, editProduct, addProduct, fetchProducts };
