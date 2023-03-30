import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TurkeyMap from 'turkey-map-react'

const Home = () => {

    const [selectedCities, setSelectedCities] = useState(JSON.parse(localStorage.getItem('city')) || [])

    const handleMapClick = (city) => {
        if (selectedCities.includes(city.id)) {
            document.getElementById(`${city.id}`).classList.remove("selected")
            const newCities = selectedCities.filter((cities) => cities !== city.id);
            setSelectedCities(newCities)
        }
        else {
            setSelectedCities(selectedCities => [...selectedCities, city.id])
        }
    }
    useEffect(() => {
        localStorage.setItem('city',JSON.stringify(selectedCities))
        selectedCities.map((city)=>{
            document.getElementById(`${city}`).classList.add("selected")
        })
    })

    return (
        <div className='turkey-map'>
            <h1>Ziyaret Ettiğiniz İlleri Seçiniz</h1>
            <div className='calculate'>
                <h2>
                    Seçilen İl Sayısı: {selectedCities.length} / 81
                </h2>
                <h2>
                    Yüzdesel Hesap:%{((selectedCities.length * 100)/81).toFixed(2)}
                </h2>
            </div>
            <div className='cities'>
                {
                    selectedCities.map((item,i)=>(
                        <label key={i}>{item}</label>
                    ))

                }
            </div>
            <TurkeyMap
                hoverable={true}
                customStyle={{ idleColor: "#2b2d42", hoverColor: "ef233c" }}
                showTooltip={true}
                onClick={(city) => handleMapClick(city)}
            />


                <footer>
                    <Link to="https://github.com/burakcankaba" >Burak Can Kaba - Github Link</Link>
                </footer>


        </div>
    )
}

export default Home