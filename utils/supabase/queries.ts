import { createClient } from "@/utils/supabase/server";

export async function getProducts() {
  const supabase = createClient();
  const { data: products } = await supabase.from("products").select();

  return products;
}
