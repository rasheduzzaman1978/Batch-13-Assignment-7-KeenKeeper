export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold text-[#1F2937]">
          Terms of Service
        </h1>

        <p className="mb-4 text-gray-600">
          By using KeenKeeper, you agree to use the platform responsibly and
          respectfully.
        </p>

        <p className="mb-4 text-gray-600">
          You are responsible for the information you add to the platform and
          for maintaining the accuracy of your records.
        </p>

        <p className="text-gray-600">
          KeenKeeper reserves the right to update these terms at any time.
        </p>
      </div>
    </main>
  );
}