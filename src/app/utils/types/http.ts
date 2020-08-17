export interface Game {
  id: number;
  pic_id: number;
  price: number;
  platforms: string;
  title: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartHttp {
  id_user: number;
  items: CartItem[];
}

export interface User {
  id: number;
  login: string;
  name: string;
  password: string;
  token: string; // token (e.g. jwt) que seria gerado normalmente em um cenário real de produção
}
