import { ReactNode } from 'react'

export default function Card({ 
  title, 
  subtitle, 
  right, 
  children,
  variant = 'default',
  animated = true 
}: { 
  title?: string
  subtitle?: string
  right?: ReactNode
  children?: ReactNode
  variant?: 'default' | 'gradient' | 'glass' | 'neon'
  animated?: boolean
}) {
  const getCardStyles = () => {
    const baseStyles = "relative overflow-hidden rounded-3xl transition-all duration-500 ease-out"
    const animationStyles = animated ? "transform hover:scale-[1.02] hover:-translate-y-2 hover:rotate-1" : ""
    
    switch (variant) {
      case 'gradient':
        return `${baseStyles} ${animationStyles} bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-[1px] shadow-2xl hover:shadow-purple-500/25`
      case 'glass':
        return `${baseStyles} ${animationStyles} bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-cyan-500/25`
      case 'neon':
        return `${baseStyles} ${animationStyles} bg-slate-900 border border-cyan-400/50 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:border-cyan-400`
      default:
        return `${baseStyles} ${animationStyles} bg-white/95 backdrop-blur-sm border border-slate-200/60 shadow-xl hover:shadow-2xl hover:shadow-slate-900/10`
    }
  }

  const getInnerStyles = () => {
    switch (variant) {
      case 'gradient':
        return "bg-white rounded-[calc(1.5rem-1px)] h-full"
      case 'glass':
        return "rounded-3xl h-full"
      case 'neon':
        return "rounded-3xl h-full"
      default:
        return "rounded-3xl h-full"
    }
  }

  const getTitleStyles = () => {
    switch (variant) {
      case 'gradient':
        return "text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
      case 'glass':
        return "text-2xl font-bold text-white drop-shadow-lg"
      case 'neon':
        return "text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      default:
        return "text-2xl font-bold text-slate-800"
    }
  }

  const getSubtitleStyles = () => {
    switch (variant) {
      case 'glass':
        return "text-sm text-white/80 font-medium"
      case 'neon':
        return "text-sm text-slate-300 font-medium"
      default:
        return "text-sm text-slate-600 font-medium"
    }
  }

  return (
    <div className={getCardStyles()}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-orange-500/30 rounded-full blur-lg animate-bounce" style={{animationDuration: '3s'}}></div>
      </div>
      
      <div className={getInnerStyles()}>
        <div className="relative z-10 p-8">
          {(title || subtitle || right) && (
            <div className="flex items-start justify-between mb-6 group">
              <div className="space-y-2">
                {title && (
                  <div className={`${getTitleStyles()} transform transition-all duration-300 group-hover:scale-105`}>
                    {title}
                    {variant === 'neon' && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    )}
                  </div>
                )}
                {subtitle && (
                  <div className={`${getSubtitleStyles()} transform transition-all duration-300 delay-100 group-hover:translate-x-1`}>
                    {subtitle}
                  </div>
                )}
              </div>
              {right && (
                <div className="transform transition-all duration-300 hover:scale-110 hover:rotate-3">
                  {right}
                </div>
              )}
            </div>
          )}
          
          <div className="transform transition-all duration-500 hover:translate-y-[-2px]">
            {children}
          </div>
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[calc(100%+1rem)] h-[calc(100%+1rem)] rotate-12 transform -translate-x-full animate-shimmer"></div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%) rotate(12deg); }
            100% { transform: translateX(200%) rotate(12deg); }
          }
          .animate-shimmer {
            animation: shimmer 3s ease-in-out infinite;
          }
        `
      }} />
    </div>
  )
}

// Demo Component to showcase different variants
function CardDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Modern Card Component Showcase</h1>
          <p className="text-slate-600">Professional, animated, and eye-catching card designs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            title="Default Card" 
            subtitle="Clean and professional" 
            right={<span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">New</span>}
          >
            <p className="text-slate-700 leading-relaxed">
              This is the default variant with subtle animations and modern styling. Perfect for professional applications.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                Action
              </button>
              <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
                Cancel
              </button>
            </div>
          </Card>

          <Card 
            variant="gradient"
            title="Gradient Card" 
            subtitle="Eye-catching and vibrant" 
            right={<div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>}
          >
            <p className="text-slate-700 leading-relaxed">
              Features a stunning gradient border that catches attention while maintaining readability.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all">
                Get Started
              </button>
            </div>
          </Card>

          <Card 
            variant="glass"
            title="Glass Card" 
            subtitle="Futuristic glassmorphism" 
            right={<div className="w-6 h-6 bg-white/30 rounded-full backdrop-blur-sm"></div>}
          >
            <p className="text-white/90 leading-relaxed">
              Beautiful glassmorphism effect with backdrop blur and translucent elements.
            </p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30">
                Explore
              </button>
            </div>
          </Card>

          <Card 
            variant="neon"
            title="Neon Card" 
            subtitle="Cyberpunk aesthetic" 
            right={<div className="w-8 h-8 border border-cyan-400 rounded-full bg-cyan-400/20"></div>}
          >
            <p className="text-slate-300 leading-relaxed">
              Cyberpunk-inspired design with glowing effects and neon colors.
            </p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors border border-cyan-400/50 hover:border-cyan-400">
                Access
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Export both the Card component and demo
export { CardDemo }