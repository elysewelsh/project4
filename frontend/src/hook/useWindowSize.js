import { useState, useEffect } from 'react'

function useWindowSize() {
    const [dimensions, setDimensions] = useState ({
        width: window.innerWidth, 
        height: window.innerHeight
    })

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth, 
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize)
        //need to make handleResize function, otherwise can't remove it during clean-up.

        return() => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);
    return dimensions
}

export default useWindowSize