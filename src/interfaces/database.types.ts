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
      bookings: {
        Row: {
          cabinId: number | null
          cabinPrice: number | null
          created_at: string
          endDate: string | null
          extrasPrice: number | null
          guestId: number | null
          hasBreakfast: boolean | null
          id: number
          isPaid: boolean | null
          numGuests: number | null
          numNights: number | null
          startDate: string | null
          status: string | null
          totalPrice: number | null
          userNotes: string | null
        }
        Insert: {
          cabinId?: number | null
          cabinPrice?: number | null
          created_at?: string
          endDate?: string | null
          extrasPrice?: number | null
          guestId?: number | null
          hasBreakfast?: boolean | null
          id?: number
          isPaid?: boolean | null
          numGuests?: number | null
          numNights?: number | null
          startDate?: string | null
          status?: string | null
          totalPrice?: number | null
          userNotes?: string | null
        }
        Update: {
          cabinId?: number | null
          cabinPrice?: number | null
          created_at?: string
          endDate?: string | null
          extrasPrice?: number | null
          guestId?: number | null
          hasBreakfast?: boolean | null
          id?: number
          isPaid?: boolean | null
          numGuests?: number | null
          numNights?: number | null
          startDate?: string | null
          status?: string | null
          totalPrice?: number | null
          userNotes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cabinId_fkey"
            columns: ["cabinId"]
            isOneToOne: false
            referencedRelation: "cabins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_guestId_fkey"
            columns: ["guestId"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      cabins: {
        Row: {
          created_at: string
          description: string | null
          discount: number | null
          id: number
          image: string | null
          maxCapacity: number | null
          name: string | null
          regularPrice: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          maxCapacity?: number | null
          name?: string | null
          regularPrice?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          maxCapacity?: number | null
          name?: string | null
          regularPrice?: number | null
        }
        Relationships: []
      }
      guests: {
        Row: {
          countryFlag: string | null
          created_at: string
          email: string | null
          fullName: string | null
          id: number
          nationalID: string | null
          nationality: string | null
        }
        Insert: {
          countryFlag?: string | null
          created_at?: string
          email?: string | null
          fullName?: string | null
          id?: number
          nationalID?: string | null
          nationality?: string | null
        }
        Update: {
          countryFlag?: string | null
          created_at?: string
          email?: string | null
          fullName?: string | null
          id?: number
          nationalID?: string | null
          nationality?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          breakfastPrice: number | null
          created_at: string
          id: number
          maxBookingLength: number | null
          maxGuestsPerBooking: number | null
          minBookingLength: number | null
        }
        Insert: {
          breakfastPrice?: number | null
          created_at?: string
          id?: number
          maxBookingLength?: number | null
          maxGuestsPerBooking?: number | null
          minBookingLength?: number | null
        }
        Update: {
          breakfastPrice?: number | null
          created_at?: string
          id?: number
          maxBookingLength?: number | null
          maxGuestsPerBooking?: number | null
          minBookingLength?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
