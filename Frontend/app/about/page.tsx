


type card_attribut = {
    icon : String,
    title : String,
    description : String,
}
type card_attributi = {
    icon : String,
    name : String,
    domain :String,
    description : String,
}

function Card_info(props : card_attributi ){
    return(
        <div className="bg-[#3d1e06] flex p-5 rounded-4xl w-full  md:w-[49%] gap-10 justify-center items-center">
            <div>
                <h1 className="w-20 h-20 flex justify-center items-center text-4xl bg-[#522909] rounded-full outline-4 outline-amber-300"><span className="scale-100 text-amber-400">{props.icon}</span> </h1>
            </div>
            <div>
                 <h1 className="text-4xl ">{props.name}</h1>
                 <h1 className="text-l text-amber-400">{props.domain}</h1>
                 <p className="opacity-80 max-w-xl flex text-lg mt-4">{props.description}</p>
            </div>
      
        </div>
    );
}

function Card(props : card_attribut ){
    return(
        <div className="bg-[#3d1e06] flex flex-col p-10 rounded-4xl w-full  md:w-[49%] ">
            <h1 className="p-3 flex justify-center items-center text-4xl bg-[#522909] w-fit rounded-4xl">{props.icon}</h1>
            <h1 className="text-4xl">{props.title}</h1>
            <p className="opacity-80 max-w-xl flex text-lg mt-4">{props.description}</p>
        </div>
    );
}



export default function About() {
    return (
        <div className="w-full p-10 flex justify-center flex-col">
            <div className="flex w-full flex-col items-center">
                <h1 className="text-3xl flex justify-center">Our story</h1>
                <h1 className="text-7xl flex justify-center gap-4">Built with passion for <span className="text-amber-400">good food</span></h1>
                <p className="opacity-80 py-3 text-center text-lg max-w-xl mx-auto">Foody was born from a simple idea — make cooking accessible, fun, and nutritious for everyone. We built this platform to bring people together through the love of food.</p>
            </div>
            <div className="  flex flex-col w-full px-8 md:px-20">
                <div className=" flex flex-col bg-[#522909] w-full p-10 gap-1">
                    <h1 className="text-amber-400 text-2xl">What we stand for</h1>
                    <h1 className="text-4xl">Our mission</h1>
                    <div className="px-5 flex  flex-wrap justify-between gap-6 w-full mt-4">
                        <Card icon="🥗" title="Healthy eating made simple" description="We believe healthy food should be delicious and easy to prepare — no complicated diets, just real ingredients" />
                        <Card icon="👨‍🍳" title="Empower home chefs" description="Whether you're a beginner or a seasoned cook, Foody gives you the tools to create and share your culinary creations." />
                        <Card icon="🌍" title="A global kitchen" description="We believe healthy food should be delicious and easy to prepare — no complicated diets, just real ingredientsDiscover recipes from cultures around the world — from Tunisian tagines to Italian pasta, all in one place." />
                        <Card icon="📊" title="Track your nutrition" description="Every recipe comes with a detailed macro profile so you always know what goes into your body." />   
                    </div>
                    <hr className="my-30 opacity-50"/>
                </div>
                
            </div> 
            <div className="  flex flex-col w-full px-8 md:px-20">
                <div className=" flex flex-col bg-[#522909] w-full p-10 gap-1">
                    <h1 className="text-amber-400 text-2xl">The people behind it</h1>
                    <h1 className="text-4xl">Meet the team</h1>
                    <div className="px-5 flex  flex-wrap justify-between gap-6 w-full mt-4">
                        <Card_info icon="RA" name="Abidi Rayen" domain="Full-stack developer" description="Passionate about clean code and great user experiences. Built the backend architecture and authentication system." />
                        <Card_info icon="YF" name="Lajili Youssef" domain="Full-stack developer" description="Focused on crafting beautiful interfaces and smooth interactions that make Foody a joy to use." />
                    </div>
                    <hr className="my-30 opacity-50"/>
                </div>
                
            </div>  
            <div className="  flex flex-col w-full px-8 md:px-20">
                <div className=" flex flex-col bg-[#522909] w-full p-10 gap-1">
                    <h1 className="text-amber-400 text-2xl">By the numbers</h1>
                    <h1 className="text-4xl">Foody in numbers</h1>
                    <div className="px-5 flex flex-wrap justify-between w-full mt-4">
                        <div className="bg-[#3d1e06] flex flex-col p-10 rounded-4xl w-full md:w-[23%]  items-center">
                            
                            <h1 className="text-4xl text-amber-400">2</h1>
                            <p className="opacity-80 max-w-xl flex text-lg mt-4">Developers</p>
                        </div>
                        <div className="bg-[#3d1e06] flex flex-col p-10 rounded-4xl w-full md:w-[23%]  items-center">
                            <h1 className="text-4xl text-amber-400">2</h1>
                            <p className="opacity-80 max-w-xl flex text-lg mt-4">Developers</p>
                        </div>
                        <div className="bg-[#3d1e06] flex flex-col p-10 rounded-4xl w-full md:w-[23%]  items-center">
                            <h1 className="text-4xl text-amber-400">2</h1>
                            <p className="opacity-80 max-w-xl flex text-lg mt-4">Developers</p>
                        </div>
                        <div className="bg-[#3d1e06] flex flex-col p-10 rounded-4xl w-full md:w-[23%]  items-center">
                            <h1 className="text-4xl text-amber-400">2</h1>
                            <p className="opacity-80 max-w-xl flex text-lg mt-4">Developers</p>
                        </div>
                    </div>
                    <hr className="my-30 opacity-50"/>
                    <div className="w-full flex flex-col p-10 rounded-4xl items-center px-5">
                        <div className="bg-[#3d1e06] py-10 w-full flex flex-col items-center justify-center">
                            <h1 className="text-amber-400 flex gap-2 text-4xl"><span className="text-white">Ready to cook something</span>amazing?</h1>
                            <p className="opacity-80 max-w-xl flex text-lg mt-4">Join Foody and start sharing your recipes with the world.</p>
                            <h1 className="px-5 py-3 mt-5 bg-amber-400 text-black rounded-4xl text-3xl cursor-pointer hover:bg-amber-300">Get started</h1>
                        </div>
                    </div>
                </div>
                
                
            </div> 

        </div>
    );
}