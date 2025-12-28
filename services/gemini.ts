import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyD97ZJzKX6bsfS4TY-PGQMmYwTR7spR008'; // Your Gemini API key

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private isInitialized = false;

  constructor() {
    this.initializeModel();
  }

  private initializeModel() {
    try {
      // Validate API key format
      if (!API_KEY || API_KEY.length < 20) {
        console.warn('Invalid API key format. Using fallback responses.');
        this.isInitialized = false;
        return;
      }

      this.genAI = new GoogleGenerativeAI(API_KEY);
      // Use the correct model name for Gemini API
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
      this.isInitialized = false;
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    // Fallback to mock responses if API is not properly configured
    if (!this.isInitialized || !this.model) {
      return this.getMockResponse(prompt);
    }

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text || text.trim().length === 0) {
        return this.getMockResponse(prompt);
      }
      
      return text;
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Check for specific quota errors
      if (error instanceof Error && error.message && error.message.includes('quota')) {
        console.warn('Gemini API quota exceeded, falling back to local responses');
        this.isInitialized = false; // Temporarily disable API to avoid repeated quota errors
      }
      
      // Return mock response instead of throwing error
      return this.getMockResponse(prompt);
    }
  }

  private getMockResponse(prompt: string): string {
    // Extract key financial topics from the prompt
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('laptop') || lowerPrompt.includes('afford')) {
      return `Based on your current financial situation, I'd recommend checking your budget first. To determine if you can afford a new laptop:

1. **Review your monthly budget** in the app's Balance section
2. **Check your emergency fund** - ensure you have 3-6 months of expenses saved
3. **Compare prices** - look for deals or consider refurbished options
4. **Use the 50/30/20 rule** - this purchase should come from your 30% "wants" budget

Would you like me to help you set up a savings goal for this purchase?`;
    }
    
    if (lowerPrompt.includes('spending') || lowerPrompt.includes('pattern')) {
      return `Here's how to analyze your spending patterns:

**In your Finance Tracker:**
1. Go to **Insights** tab to view your spending breakdown
2. Check **Categories** to see where your money goes
3. Look for **Trends** over the past 3 months

**Key things to watch for:**
• Largest expense categories
• Unusual spikes in spending
• Recurring subscriptions you might have forgotten
• Cash vs card spending patterns

**Actionable steps:**
- Set spending limits for top categories
- Use the budget feature to track monthly goals
- Review transactions weekly

Would you like help setting up spending alerts?`;
    }
    
    if (lowerPrompt.includes('budget') || lowerPrompt.includes('money')) {
      return `Great question about budgeting! Here's my advice:

**Getting Started:**
1. Use the **Set Budget** feature in your app
2. Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings
3. Track your spending daily using the expense tracker

**Smart Money Tips:**
• Automate your savings first
• Pay bills on time to avoid fees
• Review subscriptions monthly
• Build an emergency fund gradually

Your finance tracker has tools to help with all of these! Check out the Budget section to get started.`;
    }
    
    if (lowerPrompt.includes('invest') || lowerPrompt.includes('investment')) {
      return `Investment advice for beginners:

**Before investing:**
1. Build an emergency fund (3-6 months expenses)
2. Pay off high-interest debt
3. Use your app's Investment section to learn more

**Investment basics:**
• Start with low-cost index funds
• Diversify your portfolio
• Invest regularly (dollar-cost averaging)
• Think long-term (5+ years)

**Using your app:**
- Check the Invest tab for opportunities
- Track your investment goals
- Monitor performance over time

Remember: Never invest money you can't afford to lose!`;
    }
    
    // Default response
    return `I'm your AI financial assistant! I can help you with:

• **Budgeting** - Create and stick to monthly budgets
• **Spending Analysis** - Understand your money habits  
• **Saving Goals** - Plan for purchases and emergencies
• **Bill Management** - Stay on top of payments
• **Investment Basics** - Learn about growing your money

Try asking specific questions like:
- "How can I save more money?"
- "What's a good emergency fund amount?"
- "Should I pay off debt or invest?"

How can I help you improve your financial health today?`;
  }

  async generateFinancialAdvice(userInput: string): Promise<string> {
    // If using mock responses, add a note for the user
    if (!this.isInitialized) {
      const mockResponse = this.getMockResponse(userInput);
      return `${mockResponse}

*Note: Currently using offline AI responses. Gemini API may be temporarily unavailable due to quota limits.*`;
    }

    const systemPrompt = `You are a helpful AI financial assistant. You help users with financial questions, budgeting, investment advice, and money management. 

User context: This is a finance tracking app where users can:
- Track expenses and income
- Set budgets
- Pay bills
- Transfer money
- View financial insights
- Make investments

Please provide helpful, concise, and actionable financial advice. If the user asks about features in the app, guide them on how to use those features.

User question: ${userInput}`;

    return this.generateResponse(systemPrompt);
  }

  // Method to check if Gemini API is properly configured
  isGeminiEnabled(): boolean {
    return this.isInitialized;
  }

  // Method to get API status
  getApiStatus(): string {
    if (this.isInitialized) {
      return 'Connected to Google Gemini AI';
    } else {
      return 'Using local AI responses (Gemini not configured)';
    }
  }
}

export default new GeminiService();