export interface Menu {
  id?: string;
  name?: string;
  imgSrc?: string;
  description?: string;
  price?: string;
}

export interface MenuGroup {
  id?: string;
  name?: string;
  menus?: Menu[];
}
