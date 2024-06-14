import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const fetchProducts = async () => {
  "use server";
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select()
    .order("product_id", { ascending: true });
  return products;
};

const deleteProduct = async (formData: FormData) => {
  "use server";
  const product_id = formData.get("product_id");

  const supabase = createClient();

  await supabase.from("products").delete().eq("product_id", product_id);

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
    .update({ name: name, status: status, price: price })
    .eq("product_id", product_id)
    .select();

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
    .insert([{ name: name, status: status, price: price, in_stock: 0 }]);
  fetchProducts();
  revalidatePath("/products");
};

export { deleteProduct, editProduct, addProduct, fetchProducts };
