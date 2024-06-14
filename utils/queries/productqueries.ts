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
  const product = {
    name: formData.get("name"),
    status: formData.get("status"),
    price: formData.get("price"),
    product_id: formData.get("product_id"),
  };

  await supabase
    .from("products")
    .update({
      name: product.name,
      status: product.status,
      price: product.price,
    })
    .eq("product_id", product.product_id)
    .select();

  revalidatePath("/products");
};

const addProduct = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  const product = {
    name: formData.get("name"),
    status: formData.get("status"),
    price: formData.get("price"),
  };
  await supabase.from("products").insert([
    {
      name: product.name,
      status: product.status,
      price: product.price,
      in_stock: 0,
    },
  ]);
  fetchProducts();
  revalidatePath("/products");
};

export { deleteProduct, editProduct, addProduct, fetchProducts };
