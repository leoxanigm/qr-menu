export interface MenuItem {
  id?: string;
  order?: number;
  name?: string;
  imgSrc?: string;
  description?: string;
  price?: string;

  imgRef?: string | null;
}

export interface MenuGroup {
  id?: string;
  order?: number;
  name?: string;
  imgSrc?: string;
  menuItems?: MenuItem[];

  imgRef?: string | null;
}

export interface Menu {
  id?: string;
  options?: MenuOptions;
  menuGroups?: MenuGroup[];
}

export interface MenuOptions {
  [key: string]: any;
  styles?: {
    [key: string]: any;
  };
}