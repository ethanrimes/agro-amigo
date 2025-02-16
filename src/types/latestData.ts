export type CategoryType = 'Producto' | 'Mercado' | 'Insumo';

export interface Item {
  id: string;
  name: string;
  type: CategoryType;
  subCategory: string;
  prices: string;
  trendUp: boolean;
  market: string;
  timestamp: string;
}

export interface Category {
  name: string;
  icon: string; // Name of the icon from @expo/vector-icons
  items: Item[];
}
