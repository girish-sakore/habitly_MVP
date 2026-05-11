import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-4 pb-6 pt-3 bg-[#f5f5f5] dark:bg-[#212121] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl">
      {/* Play Button (Active) */}
      <Link
        href="#"
        className="flex flex-col items-center justify-center bg-[#d4e9e2] dark:bg-[#3A6757] text-[#3a6757] dark:text-white rounded-xl px-6 py-2 shadow-[0_2px_0_0_#3a6757] translate-y-0.5 transition-all duration-75"
      >
        <span className="material-symbols-outlined">joystick</span>
        <span className="font-bold text-xs uppercase">Play</span>
      </Link>

      {/* Rankings Button */}
      <Link
        href="#"
        className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
      >
        <span className="material-symbols-outlined">leaderboard</span>
        <span className="font-bold text-xs uppercase">Rankings</span>
      </Link>

      {/* Profile Button */}
      <Link
        href="#"
        className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
      >
        <span className="material-symbols-outlined">person</span>
        <span className="font-bold text-xs uppercase">Profile</span>
      </Link>
    </nav>
  );
}