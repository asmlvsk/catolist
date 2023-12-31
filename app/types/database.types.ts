export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      anime: {
        Row: {
          created_at: string;
          image_url: string | null;
          title: string | null;
          title_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          image_url?: string | null;
          title?: string | null;
          title_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          image_url?: string | null;
          title?: string | null;
          title_id?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      manga: {
        Row: {
          created_at: string;
          image_url: string | null;
          title: string | null;
          title_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          image_url?: string | null;
          title?: string | null;
          title_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          image_url?: string | null;
          title?: string | null;
          title_id?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          nickname: string | null;
          private: boolean;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          nickname?: string | null;
          private?: boolean;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          nickname?: string | null;
          private?: boolean;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_anime: {
        Row: {
          anime_id: number | null;
          id: string;
          review_text: string | null;
          tier: Database["public"]["Enums"]["anime_tier"] | null;
          user_id: string | null;
        };
        Insert: {
          anime_id?: number | null;
          id?: string;
          review_text?: string | null;
          tier?: Database["public"]["Enums"]["anime_tier"] | null;
          user_id?: string | null;
        };
        Update: {
          anime_id?: number | null;
          id?: string;
          review_text?: string | null;
          tier?: Database["public"]["Enums"]["anime_tier"] | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_anime_anime_id_fkey";
            columns: ["anime_id"];
            isOneToOne: false;
            referencedRelation: "anime";
            referencedColumns: ["title_id"];
          },
          {
            foreignKeyName: "user_anime_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_anime_copy: {
        Row: {
          anime_id: number;
          review_id: string;
          user_id: string;
        };
        Insert: {
          anime_id: number;
          review_id: string;
          user_id: string;
        };
        Update: {
          anime_id?: number;
          review_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_manga: {
        Row: {
          id: string;
          manga_id: number;
          review_text: string | null;
          tier: Database["public"]["Enums"]["anime_tier"] | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          manga_id: number;
          review_text?: string | null;
          tier?: Database["public"]["Enums"]["anime_tier"] | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          manga_id?: number;
          review_text?: string | null;
          tier?: Database["public"]["Enums"]["anime_tier"] | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_manga_manga_id_fkey";
            columns: ["manga_id"];
            isOneToOne: false;
            referencedRelation: "manga";
            referencedColumns: ["title_id"];
          },
          {
            foreignKeyName: "user_manga_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_manga_copy: {
        Row: {
          manga_id: number;
          user_id: string;
        };
        Insert: {
          manga_id: number;
          user_id: string;
        };
        Update: {
          manga_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_manga_copy_manga_id_fkey";
            columns: ["manga_id"];
            isOneToOne: true;
            referencedRelation: "manga";
            referencedColumns: ["title_id"];
          },
          {
            foreignKeyName: "user_manga_copy_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      anime_tier: "D" | "C" | "B" | "A" | "S";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
