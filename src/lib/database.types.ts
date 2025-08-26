export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
      }
    }
  }
}