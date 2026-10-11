export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#057A55]/20 border-t-[#057A55] rounded-full animate-spin"></div>
      <p className="text-[#057A55] font-medium text-[15px] animate-pulse">লোড হচ্ছে...</p>
    </div>
  );
}