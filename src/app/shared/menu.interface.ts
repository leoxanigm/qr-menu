export interface MenuItem {
  id?: string;
  order?: number;
  name?: string;
  imgSrc?: string;
  description?: string;
  price?: string;
}

export interface MenuGroup {
  id?: string;
  order?: number;
  name?: string;
  imgSrc?: string;
  menuItems?: MenuItem[];
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
