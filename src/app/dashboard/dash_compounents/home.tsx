import React from 'react'

export default function Home() {
  return (
<div className="max-w-7xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Stats Cards */}
  <div 
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
  >
    <h3 className="text-lg font-semibold text-gray-800">សរុបកម្ចី</h3>
    <p className="text-3xl font-bold text-blue-600 mt-2">$50,000</p>
  </div>

  <div
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
  >
    <h3 className="text-lg font-semibold text-gray-800">អ្នកខ្ចីសរុប</h3>
    <p className="text-3xl font-bold text-green-600 mt-2">24</p>
  </div>

  <div
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
  >
    <h3 className="text-lg font-semibold text-gray-800">ការបង់ប្រាក់ថ្ងៃនេះ</h3>
    <p className="text-3xl font-bold text-purple-600 mt-2">$1,200</p>
  </div>
</div>
</div>
  )
}


