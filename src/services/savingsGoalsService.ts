
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface SavingsGoal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date: string | null;
  created_at: string;
  updated_at: string | null;
  user_id: string;
}

export interface CreateSavingsGoalParams {
  name: string;
  target_amount: number;
  current_amount?: number;
  target_date?: string | null;
}

export const savingsGoalsService = {
  async getAllGoals(): Promise<SavingsGoal[]> {
    try {
      const { data, error } = await supabase
        .from('savings_goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching savings goals:', error);
      toast({
        title: 'Error fetching goals',
        description: error.message,
        variant: 'destructive',
      });
      return [];
    }
  },

  async getGoalById(id: string): Promise<SavingsGoal | null> {
    try {
      const { data, error } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error fetching savings goal:', error);
      toast({
        title: 'Error fetching goal',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  },

  async createGoal(goal: CreateSavingsGoalParams): Promise<SavingsGoal | null> {
    try {
      const { data, error } = await supabase
        .from('savings_goals')
        .insert({
          name: goal.name,
          target_amount: goal.target_amount,
          current_amount: goal.current_amount || 0,
          target_date: goal.target_date,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: 'Goal created',
        description: `Your savings goal "${goal.name}" has been created.`,
      });
      
      return data;
    } catch (error: any) {
      console.error('Error creating savings goal:', error);
      toast({
        title: 'Error creating goal',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  },

  async updateGoal(id: string, updates: Partial<CreateSavingsGoalParams>): Promise<SavingsGoal | null> {
    try {
      const { data, error } = await supabase
        .from('savings_goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: 'Goal updated',
        description: `Your savings goal has been updated.`,
      });
      
      return data;
    } catch (error: any) {
      console.error('Error updating savings goal:', error);
      toast({
        title: 'Error updating goal',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  },

  async deleteGoal(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('savings_goals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Goal deleted',
        description: 'Your savings goal has been deleted.',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting savings goal:', error);
      toast({
        title: 'Error deleting goal',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  },

  async contributeToGoal(id: string, amount: number): Promise<SavingsGoal | null> {
    try {
      // First get the current goal
      const { data: goal, error: fetchError } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      if (!goal) throw new Error('Goal not found');

      const newAmount = (goal.current_amount || 0) + amount;

      // Update the goal with the new amount
      const { data, error } = await supabase
        .from('savings_goals')
        .update({ 
          current_amount: newAmount,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Send a notification about the contribution
      await supabase.functions.invoke("send-notification", {
        body: {
          email: 'user@example.com', // In a real app, get this from the user's profile
          subject: 'Contribution to Savings Goal',
          message: `You've added $${amount.toFixed(2)} to your "${goal.name}" savings goal. Current progress: $${newAmount.toFixed(2)} of $${goal.target_amount.toFixed(2)}`,
          type: 'goal_contribution'
        }
      });
      
      toast({
        title: 'Contribution added',
        description: `You've added $${amount.toFixed(2)} to your savings goal.`,
      });
      
      return data;
    } catch (error: any) {
      console.error('Error contributing to savings goal:', error);
      toast({
        title: 'Error adding contribution',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  }
};
