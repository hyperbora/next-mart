import { createClient } from "@/lib/supabaseClient";

export interface Product {
  id: number;
  title: string;
  price: number;
  image_url?: string;
  description?: string;
  inserted_at?: string;
  updated_at?: string;
}

// 전체 상품 조회
export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase getAllProducts error:", error.message);
    return [];
  }

  return data as Product[];
}

// ID로 상품 조회
export async function getProductById(id: number): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getProductById error:", error.message);
    return null;
  }

  return data as Product;
}
