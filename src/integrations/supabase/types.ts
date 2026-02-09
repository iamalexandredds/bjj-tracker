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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      coach_students: {
        Row: {
          coach_id: string
          created_at: string
          id: string
          student_id: string
        }
        Insert: {
          coach_id: string
          created_at?: string
          id?: string
          student_id: string
        }
        Update: {
          coach_id?: string
          created_at?: string
          id?: string
          student_id?: string
        }
        Relationships: []
      }
      goal_techniques: {
        Row: {
          created_at: string
          goal_id: string
          id: string
          technique_id: string
        }
        Insert: {
          created_at?: string
          goal_id: string
          id?: string
          technique_id: string
        }
        Update: {
          created_at?: string
          goal_id?: string
          id?: string
          technique_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_techniques_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goal_techniques_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          assigned_by: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: Database["public"]["Enums"]["goal_priority"]
          status: Database["public"]["Enums"]["goal_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["goal_priority"]
          status?: Database["public"]["Enums"]["goal_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["goal_priority"]
          status?: Database["public"]["Enums"]["goal_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          belt: Database["public"]["Enums"]["belt_level"]
          created_at: string
          full_name: string | null
          id: string
          stripes: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          belt?: Database["public"]["Enums"]["belt_level"]
          created_at?: string
          full_name?: string | null
          id?: string
          stripes?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          belt?: Database["public"]["Enums"]["belt_level"]
          created_at?: string
          full_name?: string | null
          id?: string
          stripes?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      session_techniques: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          rating: number | null
          session_id: string
          technique_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          rating?: number | null
          session_id: string
          technique_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          rating?: number | null
          session_id?: string
          technique_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_techniques_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "training_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_techniques_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      techniques: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          is_global: boolean
          min_belt: Database["public"]["Enums"]["belt_level"]
          mode: Database["public"]["Enums"]["training_mode"]
          name: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          is_global?: boolean
          min_belt?: Database["public"]["Enums"]["belt_level"]
          mode?: Database["public"]["Enums"]["training_mode"]
          name: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          is_global?: boolean
          min_belt?: Database["public"]["Enums"]["belt_level"]
          mode?: Database["public"]["Enums"]["training_mode"]
          name?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          created_at: string
          duration_minutes: number
          id: string
          intensity: number
          notes: string | null
          session_date: string
          training_type: Database["public"]["Enums"]["training_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_minutes?: number
          id?: string
          intensity?: number
          notes?: string | null
          session_date?: string
          training_type?: Database["public"]["Enums"]["training_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          id?: string
          intensity?: number
          notes?: string | null
          session_date?: string
          training_type?: Database["public"]["Enums"]["training_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_techniques: {
        Row: {
          created_at: string
          id: string
          learned_at: string
          mastery_level: number
          notes: string | null
          technique_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          learned_at?: string
          mastery_level?: number
          notes?: string | null
          technique_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          learned_at?: string
          mastery_level?: number
          notes?: string | null
          technique_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_techniques_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_coach_of: {
        Args: { _coach_id: string; _student_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "practitioner" | "coach"
      belt_level: "bianca" | "blu" | "viola" | "marrone" | "nera"
      difficulty_level: "beginner" | "intermediate" | "advanced"
      goal_priority: "low" | "medium" | "high"
      goal_status: "active" | "completed" | "paused"
      training_mode: "gi" | "nogi" | "both"
      training_type: "technique" | "sparring" | "drill" | "conditioning"
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

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["practitioner", "coach"],
      belt_level: ["bianca", "blu", "viola", "marrone", "nera"],
      difficulty_level: ["beginner", "intermediate", "advanced"],
      goal_priority: ["low", "medium", "high"],
      goal_status: ["active", "completed", "paused"],
      training_mode: ["gi", "nogi", "both"],
      training_type: ["technique", "sparring", "drill", "conditioning"],
    },
  },
} as const
