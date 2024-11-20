import { fetchProducts } from "@/services/fetchProducts";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const page = params.get("page");

  const p = page ? parseInt(page) : 1;

  try {
    const { products, count } = await fetchProducts(p);

    return Response.json(
      { success: true, data: { products, count } },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err.message);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
