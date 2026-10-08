/**
 * Minimal hand-authored schema types. Replace with generated types once a
 * Supabase project exists:
 *   npx supabase gen types typescript --project-id <ref> > src/lib/types/database.ts
 */

export type PaymentStatus = "pending" | "completed" | "refunded" | "failed";

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          price_cents: number;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          price_cents: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          price_cents?: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      room_access: {
        Row: {
          id: string;
          room_id: string;
          user_id: string;
          granted_at: string;
          expires_at: string | null;
          revoked_at: string | null;
        };
        Insert: {
          id?: string;
          room_id: string;
          user_id: string;
          granted_at?: string;
          expires_at?: string | null;
          revoked_at?: string | null;
        };
        Update: {
          id?: string;
          room_id?: string;
          user_id?: string;
          granted_at?: string;
          expires_at?: string | null;
          revoked_at?: string | null;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          room_id: string;
          paypal_order_id: string;
          paypal_capture_id: string | null;
          amount_cents: number;
          currency: string;
          status: PaymentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          room_id: string;
          paypal_order_id: string;
          paypal_capture_id?: string | null;
          amount_cents: number;
          currency: string;
          status?: PaymentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          room_id?: string;
          paypal_order_id?: string;
          paypal_capture_id?: string | null;
          amount_cents?: number;
          currency?: string;
          status?: PaymentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      payment_status: PaymentStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
