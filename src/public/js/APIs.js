document.addEventListener("DOMContentLoaded", function () {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data =>{
        let code = 0;
        let i = 0;
        const codeArray = [];

        const select = document.getElementById('country');
        const selectCode = document.getElementById('country-code');

        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca3;
            option.textContent = country.name.common;
            select.appendChild(option);
        });

        data.forEach(country => {
            if (country.cca3 === 'USA' || country.cca3 === 'NAN ATA' || country.cca3 === 'PRI'
            || country.cca3 === 'DOM' || country.cca3 === 'RUS' || country.cca3 === 'ESH' 
            || country.cca3 === 'SHN' || country.cca3 === 'NAN HMD' || country.cca3 === 'VAT'
            || country.cca3 === 'KAZ' || country.cca3 === 'ATA' || country.cca3 === 'HMD') {
            } else {
                codeArray[i] = parseInt(country.idd.root + country.idd.suffixes);  
                i++;
            }
        });
        let previous, next;
        for (let i = 0; i < codeArray.length; i++) {
            for (let j = 0; j < codeArray.length; j++) {
                previous = codeArray[j];
                next = codeArray[j+1];

                if (previous > next) {
                    codeArray[j] = next;
                    codeArray[j+1] = previous;
                }
            }
        }
        codeArray.forEach(area => {
            const optionCode = document.createElement('option');
            optionCode.value = '+' + area;
            optionCode.textContent = '+' + area;
            selectCode.appendChild(optionCode);
        });
        
    })
    .catch(error =>{
        console.error('Error al cargar ');
    })
});