export default function Analytics() {
  // Generate a more sophisticated grid pattern
  const gridPattern = Array.from({ length: 25 }, (_, i) => {
    const isActive = [2, 7, 12, 13, 14, 17, 22].includes(i)
    const intensity = Math.random() * 0.8 + 0.2
    return { isActive, intensity }
  })

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            The power database that has
            <br />
            everything for your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Great projects
            </span>
          </h2>
        </div>

        {/* Grid Pattern */}
        <div className="mt-20 flex justify-center">
          <div className="grid grid-cols-5 gap-3 max-w-xs">
            {gridPattern.map(({ isActive, intensity }, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30`
                    : 'bg-gray-800/40 border border-gray-700/30'
                }`}
                style={{
                  opacity: isActive ? intensity : 0.6
                }}
              />
            ))}
          </div>
        </div>

        {/* Terminal Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold text-white mb-12">
            Start Developing Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Great Apps
            </span>
          </h3>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-400 text-sm font-mono">Terminal</div>
            </div>
            
            <div className="bg-black/60 rounded-xl p-6 font-mono text-left space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">→</span>
                <span className="text-green-400">npm start</span>
              </div>
              <div className="text-gray-400 ml-4">Starting development server...</div>
              <div className="text-gray-400 ml-4">Compiling application...</div>
              <div className="flex items-center space-x-2 mt-3">
                <span className="text-green-400">✓</span>
                <span className="text-white">Ready in 2.3s</span>
              </div>
              <div className="text-blue-300 ml-4">Local: http://localhost:3000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}