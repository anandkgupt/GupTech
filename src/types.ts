export interface Service {
  name: string;
  basePrice: number;
  durationDays: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  services: Service[];
}

export interface Pillar {
  id: string;
  num: string;
  name: string;
  colorName: string;
  colorHex: string;
  accentClass: string;
  hoverBorderClass: string;
  badgeBgClass: string;
  description: string;
  categories: Category[];
}

export interface SelectedService {
  pillarId: string;
  categoryId: string;
  service: Service;
}
