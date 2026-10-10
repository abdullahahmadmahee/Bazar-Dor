export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
      <span className="loading loading-spinner text-[#057A55] loading-lg"></span>
      <p className="text-gray-500 font-medium">ডেটা লোড হচ্ছে, দয়া করে অপেক্ষা করুন...</p>
    </div>
  );
}