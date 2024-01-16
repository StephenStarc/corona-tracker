import axios from 'axios'
const Intialurl = 'https://coronavirus-smartable.p.rapidapi.com/stats/v1/'
const url = `${Intialurl}global/`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aed0ab734emshd56fe0467051e93p1d29ccjsn638007335fe6',
		'X-RapidAPI-Host': 'coronavirus-smartable.p.rapidapi.com'
	}
};


export const fetchData = async (country) =>{
   let changableurl = url
   if(country){
    changableurl = `${Intialurl}${country}/`
    console.log(changableurl);
   }
 try {
        const {data} = await axios.request(changableurl, options)

        const modifedData = {
            confirmed : data.stats.totalConfirmedCases,
            recovered: data.stats.totalRecoveredCases,
            deaths:data.stats.totalDeaths,
            lastUpdated:data.updatedDateTime
        }
        return modifedData;

    }
    catch(error){
        console.log(error);
    }
}


export const fetchGobalData = async () =>{
    try {
           const data = await axios.request(url, options)
        //    console.log(data.data.stats.history)
        const DataArray =  data.data.stats.history
        const modifedData = DataArray.map(daily => ({
            recovered:daily.recovered,
            confirmed: daily.confirmed,
            deaths: daily.deaths,
            date: daily.date
        }))
           return modifedData 
   
       }
       catch(error){
   
       }
   }

   export const countries = async () => {
        const country = await axios.request(url, options)

 const countryList = country.data.stats.breakdowns
        return countryList

   }