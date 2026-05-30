export function Icon({ iconimg }: { iconimg: string }) {
  return (
<div className="justify-center pt-2">
  <button 
    type="button" 
    className="flex items-center justify-center w-12 h-12 bg-white border border-gray-400 rounded-2xl shadow-[0px_10px_10px_rgb(0,0,0,0.1)] hover:bg-slate-50 hover:border-slate-300 "
  >
    <img 
      src={iconimg}
      className="w-5 h-5" 
      alt="Google" 
    />
  </button>
</div>
  )
}
