export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      api_usage: {
        Row: {
          billing_tier: string | null
          cost_usd: number | null
          created_at: string | null
          endpoint: string | null
          error_code: string | null
          error_message: string | null
          id: string
          ip_address: unknown | null
          method: string | null
          processing_time_ms: number | null
          report_id: string | null
          request_headers: Json | null
          request_size_bytes: number | null
          response_size_bytes: number | null
          service_name: string
          success: boolean
          tokens_used: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          billing_tier?: string | null
          cost_usd?: number | null
          created_at?: string | null
          endpoint?: string | null
          error_code?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          method?: string | null
          processing_time_ms?: number | null
          report_id?: string | null
          request_headers?: Json | null
          request_size_bytes?: number | null
          response_size_bytes?: number | null
          service_name: string
          success: boolean
          tokens_used?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          billing_tier?: string | null
          cost_usd?: number | null
          created_at?: string | null
          endpoint?: string | null
          error_code?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          method?: string | null
          processing_time_ms?: number | null
          report_id?: string | null
          request_headers?: Json | null
          request_size_bytes?: number | null
          response_size_bytes?: number | null
          service_name?: string
          success?: boolean
          tokens_used?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          accuracy_rating: number | null
          created_at: string | null
          experience_level: string | null
          helpful_insights: string[] | null
          id: string
          improvement_suggestions: string | null
          ip_address: unknown | null
          rating: number
          report_id: string
          specific_feedback: Json | null
          training_weight: number | null
          unhelpful_insights: string[] | null
          used_for_training: boolean | null
          user_agent: string | null
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          accuracy_rating?: number | null
          created_at?: string | null
          experience_level?: string | null
          helpful_insights?: string[] | null
          id?: string
          improvement_suggestions?: string | null
          ip_address?: unknown | null
          rating: number
          report_id: string
          specific_feedback?: Json | null
          training_weight?: number | null
          unhelpful_insights?: string[] | null
          used_for_training?: boolean | null
          user_agent?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          accuracy_rating?: number | null
          created_at?: string | null
          experience_level?: string | null
          helpful_insights?: string[] | null
          id?: string
          improvement_suggestions?: string | null
          ip_address?: unknown | null
          rating?: number
          report_id?: string
          specific_feedback?: Json | null
          training_weight?: number | null
          unhelpful_insights?: string[] | null
          used_for_training?: boolean | null
          user_agent?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          ai_cost_usd: number | null
          ai_model_used: string | null
          analysis_mode: string
          analysis_version: string
          clarity_score: number
          crawl_service: string | null
          created_at: string | null
          description: string | null
          domain: string
          error_message: string | null
          final_url: string | null
          id: string
          is_public: boolean | null
          previous_score: number | null
          processing_status: string | null
          processing_time_ms: number | null
          report_data: Json
          retry_count: number | null
          score_breakdown: Json
          score_trend: string | null
          screenshot_service: string | null
          share_expires_at: string | null
          shareable_token: string | null
          title: string | null
          updated_at: string | null
          url: string
          user_id: string | null
          view_count: number | null
        }
        Insert: {
          ai_cost_usd?: number | null
          ai_model_used?: string | null
          analysis_mode?: string
          analysis_version?: string
          clarity_score: number
          crawl_service?: string | null
          created_at?: string | null
          description?: string | null
          domain: string
          error_message?: string | null
          final_url?: string | null
          id?: string
          is_public?: boolean | null
          previous_score?: number | null
          processing_status?: string | null
          processing_time_ms?: number | null
          report_data: Json
          retry_count?: number | null
          score_breakdown: Json
          score_trend?: string | null
          screenshot_service?: string | null
          share_expires_at?: string | null
          shareable_token?: string | null
          title?: string | null
          updated_at?: string | null
          url: string
          user_id?: string | null
          view_count?: number | null
        }
        Update: {
          ai_cost_usd?: number | null
          ai_model_used?: string | null
          analysis_mode?: string
          analysis_version?: string
          clarity_score?: number
          crawl_service?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string
          error_message?: string | null
          final_url?: string | null
          id?: string
          is_public?: boolean | null
          previous_score?: number | null
          processing_status?: string | null
          processing_time_ms?: number | null
          report_data?: Json
          retry_count?: number | null
          score_breakdown?: Json
          score_trend?: string | null
          screenshot_service?: string | null
          share_expires_at?: string | null
          shareable_token?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string
          user_id?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      repositories: {
        Row: {
          description: string | null
          forks_count: number | null
          full_name: string
          github_id: number
          html_url: string
          id: string
          imported_at: string | null
          language: string | null
          last_synced_at: string | null
          name: string
          stargazers_count: number | null
          user_id: string
        }
        Insert: {
          description?: string | null
          forks_count?: number | null
          full_name: string
          github_id: number
          html_url: string
          id?: string
          imported_at?: string | null
          language?: string | null
          last_synced_at?: string | null
          name: string
          stargazers_count?: number | null
          user_id: string
        }
        Update: {
          description?: string | null
          forks_count?: number | null
          full_name?: string
          github_id?: number
          html_url?: string
          id?: string
          imported_at?: string | null
          language?: string | null
          last_synced_at?: string | null
          name?: string
          stargazers_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "repositories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_authentications: {
        Row: {
          created_at: string | null
          id: string
          password_hash: string | null
          provider: string
          provider_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          password_hash?: string | null
          provider: string
          provider_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          password_hash?: string | null
          provider?: string
          provider_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_authentications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_connections: {
        Row: {
          access_token: string
          created_at: string | null
          id: string
          provider: string
          refresh_token: string | null
          scopes: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string | null
          id?: string
          provider: string
          refresh_token?: string | null
          scopes?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string | null
          id?: string
          provider?: string
          refresh_token?: string | null
          scopes?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          last_report_reset: string | null
          monthly_report_count: number | null
          preferences: Json | null
          referral_source: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_expires_at: string | null
          subscription_status: string | null
          subscription_tier: string
          total_reports_generated: number | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          last_report_reset?: string | null
          monthly_report_count?: number | null
          preferences?: Json | null
          referral_source?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          subscription_tier?: string
          total_reports_generated?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          last_report_reset?: string | null
          monthly_report_count?: number | null
          preferences?: Json | null
          referral_source?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          subscription_tier?: string
          total_reports_generated?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_dashboard_data: {
        Args: { p_user_id: string }
        Returns: {
          connected_accounts: Json
          recent_reports: Json
          repositories: Json
          usage_stats: Json
          user_data: Json
        }[]
      }
      increment_user_report_count: {
        Args: { user_id: string }
        Returns: undefined
      }
      reset_monthly_report_counts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never