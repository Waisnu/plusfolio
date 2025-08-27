# 🚀 PlusFolio
### AI-Powered Website Analysis for Developers

**Transform your portfolio from technical to professional in 60 seconds**

[![Version](https://img.shields.io/badge/version-1.1-blue.svg)](https://github.com/your-repo/plusfolio)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

---

## 🎯 **What is PlusFolio?**

PlusFolio is the first AI-powered website analysis tool built specifically for developers. Unlike generic website auditing tools, PlusFolio combines **visual design analysis** with **technical insights** to provide actionable feedback that bridges the gap between technical implementation and design excellence.

### **The Problem We Solve**

- **86% of developers** lack UX/design expertise for their portfolios
- Professional website audits cost **$500-2000** and take weeks
- Existing tools focus on technical metrics but **miss design and conversion optimization**
- Early-stage founders need rapid validation before investor meetings

### **Our Solution**

🔍 **60-Second Analysis** - Comprehensive website audit in under a minute  
🎨 **Visual + Technical** - AI vision models analyze design AND technical performance  
👨‍💻 **Developer-Native** - Built for technical users with GitHub integration  
💰 **Affordable** - $12/month vs $500+ consultations  
📊 **Transparent Scoring** - Clear 0-100 PlusFolio score with actionable insights  

---

## ✨ **Current Features (Phase 1)**

### **🔬 Hybrid AI Analysis Engine**
- **Visual Design Analysis**: AI-powered assessment of layout, color, typography, and visual hierarchy
- **Technical SEO Audit**: Performance, accessibility, and search optimization
- **UX Evaluation**: User experience principles and conversion optimization
- **Content Analysis**: Messaging clarity and professional presentation

### **👨‍💻 Developer-Focused Experience**  
- **GitHub Integration**: Import repositories and analyze portfolio sites
- **Technical Terminology**: Developer-friendly interface and insights
- **Professional Dashboard**: Track analysis history and progress over time
- **Real-time Progress**: 60-second analysis with live status updates

### **📊 Transparent Scoring System**
- **PlusFolio Score**: 0-100 overall rating with clear methodology
- **Category Breakdown**: Design (25%), UX (35%), Technical (25%), Accessibility (15%)
- **Visual Data**: Professional charts and progress indicators
- **Trend Tracking**: Compare improvements over time

### **🤝 Professional Sharing**
- **Stakeholder Reports**: Clean, professional presentation for non-technical audiences  
- **Public Sharing**: Shareable links with conversion-optimized design
- **Trust Signals**: Credibility markers for professional presentations
- **PDF Export**: Professional reports for client/employer presentations (Pro tier)

---

## 🏗️ **Technical Architecture**

### **Frontend Stack**
- **Next.js 15** with App Router for modern React patterns
- **TypeScript** for type safety and developer experience  
- **Tailwind CSS** with glass morphism design system
- **Shadcn/ui** components for production-ready interface
- **Recharts** for professional data visualization

### **Backend Infrastructure** 
- **Serverless Architecture** on Vercel for automatic scaling
- **Supabase** (PostgreSQL) for data storage and authentication
- **NextAuth.js** with Google/GitHub OAuth integration
- **Vercel KV** (Redis) for caching and rate limiting

### **AI & Analysis Pipeline**
- **Google Gemini 2.5 Flash** for visual analysis and report generation  
- **Firecrawl API** for reliable web crawling and content extraction
- **CaptureKit** for automated full-page screenshots
- **Multi-service fallbacks** for reliability and cost optimization

### **Key APIs & Services**
```typescript
// Core Analysis Pipeline
Firecrawl API    →  Web crawling & content extraction
CaptureKit      →  Full-page screenshots  
Gemini 2.5      →  AI visual & content analysis
Supabase        →  Data storage & user management
Vercel          →  Hosting & serverless functions
```

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 20+
- Bun (recommended) or npm
- Supabase account
- API keys for external services

### **Installation**

```bash
# Clone the repository
git clone https://github.com/your-repo/plusfolio.git
cd plusfolio

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local

# Configure environment variables
# See Environment Setup section below
```

### **Environment Setup**

Create a `.env.local` file with the following variables:

```env
# Database & Authentication
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key  
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id  
GITHUB_CLIENT_SECRET=your_github_client_secret

# External APIs
FIRECRAWL_API_KEY=your_firecrawl_api_key
CAPTUREKIT_API_KEY=your_capturekit_api_key
GEMINI_API_KEY=your_gemini_api_key

# Optional: Backup Services
SCREENSHOTONE_ACCESS_KEY=your_screenshotone_key
CRAWL4AI_ENDPOINT=your_crawl4ai_endpoint
```

### **Database Setup**

1. Create a new Supabase project
2. Run the database migrations:

```sql
-- Copy and run the schema from docs/ERD.md
-- This includes users, reports, feedback, and api_usage tables
-- Plus proper indexing and Row Level Security policies
```

### **Development**

```bash
# Start development server
bun run dev

# Build for production  
bun run build

# Run type checking
bun run type-check

# Run linting
bun run lint
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📈 **Roadmap: Four-Phase Expansion Strategy**

PlusFolio follows a strategic multi-phase expansion plan targeting different market segments:

### **Phase 1: Developers (Current - Months 0-12)** ✅
**Status: In Progress**  
**Target: 5,000 active users, $50k MRR**

- ✅ Hybrid AI analysis (visual + technical)
- ✅ Developer-native UI with GitHub integration
- ✅ Transparent scoring system  
- ✅ Professional sharing capabilities
- ✅ Real-time analysis workflow
- 🔄 OAuth authentication & personal dashboard
- 📋 Freemium pricing model (3 reports/month free, $12/month Pro)

### **Phase 2: Freelancers & Founders (Months 6-18)**
**Target: 15,000 users, $150k MRR**

- **Client Management**: Project organization and client dashboards
- **Enhanced Reporting**: PDF exports and presentation modes  
- **Collaboration Tools**: Comments, feedback loops, version history
- **Advanced Integrations**: Figma, project management tools
- **Pricing**: Freelancer tier ($25/month), Founder tier ($39/month)

### **Phase 3: SMB Market (Months 12-24)**  
**Target: 25,000 users, $350k MRR**

- **Team Management**: Multi-user accounts with role-based permissions
- **Advanced Analytics**: Conversion tracking and competitor analysis
- **API Development**: RESTful API for custom integrations
- **Business Intelligence**: Automated insights and trend analysis  
- **Pricing**: Professional ($49/month), Business ($99/month), Enterprise ($199/month)

### **Phase 4: Agencies & B2B2C (Months 18-36)**
**Target: 30,000 direct + 50k via partners, $750k MRR**

- **White-label Platform**: Custom branding for agency partners
- **Embeddable Widgets**: JavaScript SDK for agency websites
- **Multi-tenant Architecture**: Isolated agency environments  
- **Revenue Sharing**: Partnership model with agencies
- **Pricing**: Agency Starter ($99/month), Agency Pro ($199/month), Agency Enterprise ($499/month)

---

## 💰 **Business Model & Pricing**

### **Current Pricing (Phase 1)**

| **Plan** | **Price** | **Features** | **Target User** |
|----------|-----------|--------------|------------------|
| **Free** | $0/month | 3 reports/month, basic analysis | Trial users, occasional use |
| **Pro** | $12/month | Unlimited reports, PDF export, priority support | Active developers, job seekers |

### **Unit Economics**
- **Free User Cost**: $0.10/month (infrastructure + AI)
- **Pro User Margin**: $10/month (83% gross margin)  
- **Customer Lifetime Value**: $180 (18 months average)
- **Customer Acquisition Cost**: $15 average
- **LTV:CAC Ratio**: 12:1 (excellent economics)

---

## 🎯 **Competitive Advantage**

### **What Makes Us Different**

| **PlusFolio** | **UX Pilot** | **Lighthouse** | **Manual Audits** |
|---------------|--------------|----------------|-------------------|
| ✅ Visual + Technical | UX only | Technical only | Comprehensive but slow |
| ✅ Developer-focused | Agency-focused | Developer tool | Business-focused |
| ✅ $12/month | Unknown pricing | Free | $500-2000 |
| ✅ 60 seconds | 3+ minutes | 30 seconds | Days/weeks |
| ✅ AI-powered insights | AI analysis | Automated metrics | Human expertise |

### **Market Position**
- **Primary**: "AI design consultant for developers"  
- **Secondary**: "Lighthouse for visual design and UX"
- **Differentiation**: Only tool combining visual AI + technical analysis for developers

---

## 🛠️ **Development Workflow**

### **Current Sprint (Weeks 1-2): Authentication & Dashboard**
- [ ] Implement NextAuth.js with Google/GitHub OAuth
- [ ] Create personal dashboard with user analytics  
- [ ] GitHub integration for repository importing
- [ ] User onboarding flow and welcome experience

### **Project Structure**
```
src/
├── app/                    # Next.js app router
│   ├── dashboard/         # User dashboard
│   ├── report/[id]/       # Individual reports  
│   ├── share/[token]/     # Public sharing
│   ├── analyze/           # Analysis workflow
│   └── api/               # API routes
├── components/            
│   ├── ui/                # Shadcn components
│   ├── layout/            # Layout components
│   └── providers/         # Context providers
├── lib/                   # Utilities & services
│   ├── external-apis.ts   # API integrations
│   ├── supabase.ts       # Database client
│   └── auth.ts           # Authentication
└── types/                 # TypeScript definitions
```

### **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`  
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript strict mode  
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📊 **Performance & Analytics**

### **Key Metrics We Track**
- **Analysis Speed**: Target <60 seconds processing time
- **User Satisfaction**: >4.0/5 average report rating
- **Conversion Rate**: >8% free-to-paid conversion
- **Monthly Churn**: <10% subscriber churn rate
- **System Uptime**: 99.9% availability target

### **Cost Optimization**
- **Tiered AI Models**: Flash-Lite (development) → Flash (production) → Pro (advanced)
- **Smart Caching**: 1-hour cache for repeated analyses
- **Usage-based Scaling**: Resources scale with subscription tier
- **API Fallbacks**: Multiple providers for reliability

---

## 🌍 **Deployment & Infrastructure**

### **Production Stack**
- **Frontend**: Vercel (automatic deployments from main branch)
- **Database**: Supabase (managed PostgreSQL with auto-scaling)
- **Caching**: Vercel KV (global Redis for performance)
- **File Storage**: Vercel Blob (screenshots and reports)
- **Monitoring**: Built-in analytics + Sentry for error tracking

### **Scaling Strategy**
- **Phase 1 (0-1K users)**: Current serverless architecture
- **Phase 2 (1K-10K users)**: Redis cluster, database read replicas  
- **Phase 3 (10K-100K users)**: Microservices, event-driven processing
- **Phase 4 (100K+ users)**: Multi-region, advanced caching

---

## 🔒 **Security & Privacy**

### **Data Protection**
- **Authentication**: Secure OAuth with NextAuth.js
- **Database Security**: Row Level Security (RLS) with Supabase
- **API Security**: Rate limiting and request validation
- **Privacy Compliance**: GDPR-ready data handling
- **Encryption**: All data encrypted at rest and in transit

### **User Privacy**
- **Minimal Data Collection**: Only necessary information
- **Data Ownership**: Users control their analysis data
- **Anonymization**: AI training data properly anonymized  
- **Right to Deletion**: Full GDPR compliance for data removal

---

## 📚 **Documentation**

### **Additional Resources**
- [📋 Product Requirements Document](docs/PRD.md) - Detailed product specifications
- [🏗️ Technical Architecture](docs/architecture.md) - System design and infrastructure  
- [💼 Business Flow](docs/businessflow.md) - User journeys and business model
- [📊 Database Schema](docs/ERD.md) - Complete database design
- [🎯 Market Strategy](docs/market-expansion-strategy.md) - Four-phase expansion plan
- [✅ Development Roadmap](docs/todo.md) - Current development priorities

### **API Documentation**
Coming in Phase 3 - RESTful API for custom integrations

---

## 🤝 **Support & Community**

### **Get Help**
- 📧 **Email Support**: support@plusfolio.ai
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/plusfolio)  
- 📖 **Documentation**: [docs.plusfolio.ai](https://docs.plusfolio.ai)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-repo/plusfolio/issues)

### **For Developers**
- 🔧 **Contributing Guide**: See Contributing section above
- 📝 **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- 🚀 **Roadmap**: [GitHub Projects](https://github.com/your-repo/plusfolio/projects)

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Anthropic** for Claude 3.5 Sonnet AI capabilities
- **Vercel** for seamless deployment and hosting  
- **Supabase** for database and authentication infrastructure
- **Next.js Team** for the incredible framework
- **Open Source Community** for the tools and libraries that make this possible

---

## 📈 **What's Next?**

PlusFolio is on track to become the definitive AI-powered website analysis platform for developers and beyond. With strong product-market fit in Phase 1, we're preparing for expansion into adjacent markets while maintaining our core focus on technical excellence and user experience.

**Ready to transform your website?** [Start your free analysis →](https://plusfolio.ai)

---

*Built with ❤️ for developers who want their work to shine*
