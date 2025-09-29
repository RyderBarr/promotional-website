import fs from 'fs/promises'

async function refresh()
{

        const rawData = await fs.readFile(file,"utf-8")
        $('members').html('')
        rawData.forEach(member => {
                
                $('members').append(`
                  
                        <section class="flex flex-row justify-evenly items-center w-[100vw] h-min-[15vw] m-5">

                                <div id="text1" class="w-[50vw] h-min-[15vw] flex flex-col justify-around items-center">

                                        <div class=" w-[15vw]">

                                                ${member.name} is a member
                                        
                                                this member is signed up for a news letter${member.newsLetter} 
                                        
                                        </div>

                                </div>

                        </section>
                        
                `)

        });

}

setInterval(()=>{

        refresh()

},1000)