export function Input({ label, phtext }: { label: string; phtext: string }) {
    return (
   <div>
      <label className="block text-lg text-gray-700 mb-1 font-bold ">{label}</label>
      <input type="text" placeholder={phtext} className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black"  />
    </div>
  );
}
