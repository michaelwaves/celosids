"use client"
import dynamic from 'next/dynamic'

const SQRCode = dynamic(
  () => import('../components/VerificationPage'),
  { ssr: false }
)
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Verify Me</h1>
        <p className="text-gray-600 mt-2">Scan the QR code to verify your passport</p>
        <div className="mt-4">
          <SQRCode />
        </div>
      </div>
    </div>
  );
}
