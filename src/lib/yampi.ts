
export interface YampiProduct {
  id: number;
  name: string;
  sku: string;
  price_formated: string;
  price_selling: number;
  description: string;
  images: {
    data: {
      url: string;
    }[];
  };
  url: string;
}

const YAMPI_ALIAS = process.env.NEXT_PUBLIC_YAMPI_ALIAS;
const YAMPI_TOKEN = process.env.YAMPI_TOKEN;
const YAMPI_SECRET_KEY = process.env.YAMPI_SECRET_KEY;

const headers = {
  'User-Token': YAMPI_TOKEN || '',
  'User-Secret-Key': YAMPI_SECRET_KEY || '',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export async function getYampiProducts() {
  try {
    // A API da Yampi retorna apenas 10 produtos por padrão.
    // Usamos o parâmetro `limit` (máx. permitido) e percorremos todas as páginas
    // para garantir que TODOS os produtos cadastrados apareçam no site.
    const PER_PAGE = 100; // limite alto para buscar o máximo por requisição
    const baseUrl = `https://api.dooki.com.br/v2/${YAMPI_ALIAS}/catalog/products?include=images,prices,skus,variations,texts,videos&limit=${PER_PAGE}`;

    // Primeira requisição para obter os dados iniciais + metadata de paginação
    const firstResponse = await fetch(`${baseUrl}&page=1`, {
      headers,
      next: { revalidate: 3600 }
    });

    if (!firstResponse.ok) {
      throw new Error(`Yampi API error: ${firstResponse.statusText}`);
    }

    const firstJson = await firstResponse.json();
    const allRawProducts: any[] = [...(firstJson.data || [])];

    // Verifica se existem mais páginas através do meta.pagination
    const totalPages: number = firstJson?.meta?.pagination?.total_pages || 1;

    if (totalPages > 1) {
      // Faz requisições paralelas para as páginas restantes
      const pagePromises: Promise<any>[] = [];
      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          fetch(`${baseUrl}&page=${page}`, {
            headers,
            next: { revalidate: 3600 }
          })
            .then((r) => (r.ok ? r.json() : { data: [] }))
            .catch(() => ({ data: [] }))
        );
      }

      const additionalPages = await Promise.all(pagePromises);
      for (const pageJson of additionalPages) {
        if (pageJson?.data?.length) {
          allRawProducts.push(...pageJson.data);
        }
      }
    }

    return allRawProducts.map((p: any) => mapYampiProduct(p));
  } catch (error) {
    console.error('Error fetching Yampi products:', error);
    return [];
  }
}

export async function getYampiProductById(id: string) {
  try {
    const response = await fetch(`https://api.dooki.com.br/v2/${YAMPI_ALIAS}/catalog/products/${id}?include=images,prices,skus,variations,texts,brand,categories,videos`, {
      headers,
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const { data: p } = await response.json();
    return mapYampiProduct(p);
  } catch (error) {
    console.error(`Error fetching Yampi product ${id}:`, error);
    return null;
  }
}

function mapYampiProduct(p: any) {
  const prices = p.prices?.data || {};
  const skus = p.skus?.data || [];
  const variations = p.variations?.data || [];
  
  // Extra guard: filter by type to avoid [object Object] in src
  const images = (p.images?.data || [])
    .map((img: any) => {
      const url = img.url || img.large?.url || img.medium?.url || img.small?.url;
      return typeof url === 'string' ? url : null;
    })
    .filter(Boolean) as string[];
  
  const description = p.texts?.data?.description || p.description || '';
  
  // Encontrar o SKU principal ou o primeiro disponível
  const mainSku = skus[0] || {};

  // Preço que a Yampi realmente cobra (já considera se tem promoção ou não)
  const currentPrice = Number(prices.price_selling) || Number(prices.price) || 0;
  // Preço "de" (riscado) só aparece se houver promoção ativa
  const oldPrice = prices.has_promotion ? (Number(prices.price) || 0) : 0;

  return {
    id: p.id.toString(),
    name: p.name,
    description: description,
    slug: p.slug,
    price: currentPrice,
    originalPrice: oldPrice,
    discountPercent: prices.percent_discount || 0,
    hasPromotion: prices.has_promotion || false,
    images: images,
    brand: p.brand?.data?.name || 'Alora',
    categories: p.categories?.data?.map((c: any) => c.name) || [],
    videos: (p.videos?.data || []).map((v: any) => v.url || v.video_url).filter(Boolean),
    skus: skus.map((s: any) => {
      // Para cada SKU, também usamos o preço final de venda
      const skuPrice = Number(s.price_sale && s.has_promotion ? s.price_sale : s.price_list) || 0;
      const skuOldPrice = s.has_promotion ? Number(s.price_list) : 0;
      
      return {
        id: s.id.toString(),
        token: s.token,
        price: skuPrice,
        oldPrice: skuOldPrice,
        stock: s.quantity_managed ? s.total_in_stock : 999,
        managed: s.quantity_managed,
        title: s.title,
        variations: s.variations?.data || []
      };
    }),
    variations: variations.map((v: any) => ({
      id: v.id,
      name: v.name,
      options: v.options?.data?.map((o: any) => o.name) || []
    })),
    directCheckoutLink: mainSku.token ? `https://${YAMPI_ALIAS}.pay.yampi.com.br/r/${mainSku.token}` : null,
    personalizationEnabled: true,
  };
}
