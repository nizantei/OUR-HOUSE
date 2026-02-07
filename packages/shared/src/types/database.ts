// Database types matching Supabase schema

export interface User {
  id: string;
  google_id: string;
  email: string;
  display_name: string;
  profile_picture?: string;
  is_admin: boolean;
  created_at: string;
  last_active: string;
}

export interface House {
  id: string;
  created_at: string;
  created_by: string;
  user_1: string;
  user_2: string | null;
  invitation_code: string | null;
  invitation_used: boolean;
}

// Living Room
export interface LivingRoom {
  id: string;
  house_id: string;
  featured_image_url?: string;
  featured_image_uploaded_by?: string;
  featured_image_uploaded_at?: string;
  created_at: string;
}

export interface Countdown {
  id: string;
  living_room_id: string;
  name: string;
  date: string;
  created_by: string;
  created_at: string;
}

// Kitchen
export interface Kitchen {
  id: string;
  house_id: string;
  created_at: string;
}

export type StickyNoteType = 'text' | 'checklist' | 'doodle';

export interface StickyNote {
  id: string;
  kitchen_id: string;
  type: StickyNoteType;
  content: StickyNoteContent;
  position_x: number;
  position_y: number;
  z_index: number;
  color: string;
  rotation: number;
  created_by: string;
  created_at: string;
  deleted_at?: string;
  deleted_by?: string;
}

export type StickyNoteContent =
  | { text: string }
  | { items: ChecklistItem[] }
  | { imageUrl: string };

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Magnet {
  id: string;
  kitchen_id: string;
  magnet_type: string;
  position_x: number;
  position_y: number;
  z_index: number;
  created_at: string;
}

// Garden
export interface Garden {
  id: string;
  house_id: string;
  plant_last_watered?: string;
  plant_growth_stage: number;
  created_at: string;
}

export interface Flower {
  id: string;
  garden_id: string;
  goal_name: string;
  completed_at: string;
  flower_type: string;
  position_x: number;
  position_y: number;
}

// Gallery
export interface Gallery {
  id: string;
  house_id: string;
  created_at: string;
}

export interface WallImage {
  id: string;
  gallery_id: string;
  url: string;
  uploaded_by: string;
  uploaded_at: string;
  position_x: number;
  position_y: number;
  deleted_at?: string;
  deleted_by?: string;
}

export interface Album {
  id: string;
  gallery_id: string;
  name: string;
  cover_image_url?: string;
  created_at: string;
}

export interface Photo {
  id: string;
  album_id: string;
  url: string;
  uploaded_by: string;
  uploaded_at: string;
  caption?: string;
  deleted_at?: string;
  deleted_by?: string;
}

// Bedroom
export interface Bedroom {
  id: string;
  house_id: string;
  created_at: string;
}

export type PresentType = 'letter' | 'flower' | 'gift' | 'thought';

export interface Present {
  id: string;
  bedroom_id: string;
  type: PresentType;
  content: string;
  gift_subtype?: string;
  given_by: string;
  given_at: string;
  opened: boolean;
  opened_at?: string;
  deleted_at?: string;
  deleted_by?: string;
}

// Private Rooms
export interface PrivateRoom {
  id: string;
  house_id: string;
  owner_id: string;
  visible_to_partner: boolean;
  created_at: string;
}

export type RoomElementType = 'furniture' | 'decoration' | 'text';

export interface RoomElement {
  id: string;
  private_room_id: string;
  type: RoomElementType;
  asset_id: string;
  position_x: number;
  position_y: number;
  scale: number;
  rotation: number;
  z_index: number;
  custom_text?: string;
  created_at: string;
}

// CMS Types
export interface Theme {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  colors: Record<string, string>;
  font_primary: string;
  font_decorative: string;
  font_handwriting: string;
  border_radius_base: string;
  shadow_style?: Record<string, any>;
  animation_duration_default: number;
  created_at: string;
  updated_at: string;
}

export type RoomType = 'living_room' | 'kitchen' | 'garden' | 'gallery' | 'bedroom' | 'private_room';

export interface RoomBackground {
  id: string;
  theme_id: string;
  room_type: RoomType;
  background_url?: string;
  background_color?: string;
  texture_overlay_url?: string;
  blur_amount: number;
  opacity: number;
  created_at: string;
}

export type FurnitureCategory = 'seating' | 'tables' | 'decoration' | 'plants' | 'lighting' | 'storage';

export interface FurnitureItem {
  id: string;
  name: string;
  category: FurnitureCategory;
  tags: string[];
  asset_url: string;
  thumbnail_url?: string;
  default_width?: number;
  default_height?: number;
  allows_color_customization: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface MagnetLibraryItem {
  id: string;
  name: string;
  asset_url: string;
  thumbnail_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export type PlantAssetType = 'plant_stage' | 'flower';

export interface PlantAsset {
  id: string;
  type: PlantAssetType;
  growth_stage?: number;
  flower_name?: string;
  flower_color?: string;
  asset_url: string;
  is_active: boolean;
  created_at: string;
}

export interface StickyNoteStyle {
  id: string;
  name: string;
  background_color: string;
  text_color: string;
  texture_url?: string;
  border_style?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface UIElement {
  id: string;
  element_type: string;
  variant_name: string;
  asset_url: string;
  is_active: boolean;
  created_at: string;
}

export interface DesignConfig {
  id: string;
  active_theme_id: string;
  custom_css?: Record<string, any>;
  updated_at: string;
}
