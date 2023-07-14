import { useState } from "react"

function Home(){
    const [isLove, setIsLove] = useState(false)

    function handleMoveButton(){
        const noButton = document.querySelector("#no-btn")
        noButton.style.position = "absolute"

        const screenWidth = screen.width/1.2
        const screenHeight = screen.height/1.2

        const x = Math.floor(Math.random()*screenWidth) + 1
        const y = Math.floor(Math.random()*screenHeight) + 1

        noButton.style.left = x+"px"
        noButton.style.top = y+"px"
    }
    return(
        <div>
            <h1>{
                    isLove ? "Uhuuuu! (ﾉ´ з `)ノ" : "Olá irmãzinha, eu amo você, você também me ama??? 🥺"}</h1>


            {!isLove && 
                <div>
                    <button onClick={() => setIsLove(true)}>Sim! 🥰</button>
                    <button id="no-btn" onMouseOver={handleMoveButton} onClick={handleMoveButton}>Não 😒</button>

                </div>
            }
            

        </div>
    )
}

export default Home