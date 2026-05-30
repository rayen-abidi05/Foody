import homeCss from '../app/homeCss.module.css';
export default function Footer() {
  return (
            <>
            <hr className='max-[720px]:w-[130%] max-[720px]:ml-20'/>
            <div className="flex flex-col justify-start mt-10 w-full h-[200px] p-10 gap-10 max-[720px]:ml-20">
                
                <div className="flex gap-10 w-full">
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-col gap-1'>
                            <h1 className="text-4xl font-bold mb-3 text-amber-500 ">Foody</h1>
                            <p className='opacity-70'>Discover, create, and share recipes that bring people together around the table.</p>
                        </div>
                        <div className="flex gap-2 " >
                            <h1>facebook</h1>
                            <h1>twitter</h1>
                            <h1>instagram</h1> 


                        </div>
                    </div>
                    <div >
                        <h1>Explore</h1>
                        <p className='opacity-70'>Home</p>
                        <p className='opacity-70'>Recipes</p>
                        <p className='opacity-70'>About us</p>
                    </div>
                    <div>
                        <h1>Account</h1>
                        <p className='opacity-70'>sign up</p>
                        <p className='opacity-70'>Login</p>
                        <p className='opacity-70'>My recipes</p>
                        <p className='opacity-70'>Profil</p>
                    </div>
                    <div>
                        <h1>Stay in the loop</h1>
                        <p className='opacity-70'>Get weekly recipe inspiration straight to your inbox.</p>
                    </div>
                </div>
                <div className={homeCss.footer}>
                    <div>  
                    <p className="text-lg">© 2026 Foody. Made with ♥ in Tunisia.</p>
                    </div>
                    <div className="flex gap-10 text-lg ">
                        <h1>Privacy policy</h1>
                        <h1>Terms of service</h1>
                        <h1>Contact us</h1>

                    </div>
                </div>
            </div>
        </>
  );
}