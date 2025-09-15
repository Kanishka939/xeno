export default function StatsGrid({ 
  items 
}: { 
  items: { label: string; value: string | number; delta?: number }[] 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative card-glass p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="space-y-4">
            {/* Label and delta */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                {item.label}
              </p>

              {typeof item.delta === 'number' && (
                <div
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border
                    ${item.delta >= 0
                      ? 'bg-green-100/30 text-green-500 border-green-400/30'
                      : 'bg-red-100/30 text-red-500 border-red-400/30'}
                  `}
                >
                  <span className="mr-1">
                    {item.delta >= 0 ? '↗' : '↘'}
                  </span>
                  {Math.abs(item.delta).toFixed(1)}%
                </div>
              )}
            </div>

            {/* Value */}
            <div>
              <p className="text-4xl font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                {item.value}
              </p>
              {typeof item.delta === 'number' && (
                <p className="text-xs text-gray-300 mt-1">
                  {item.delta >= 0 ? 'Increased' : 'Decreased'} from last period
                </p>
              )}
            </div>
          </div>

          {/* Gradient glow line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Decorative floating circle */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-indigo-500/20 animate-pulse blur-2xl pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
}
