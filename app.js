document.getElementById('weatherForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const city = document.getElementById('city').value;
  const apiKey = '501f7df7ac1617914c2892fbece5a2f7'; // Tu API Key de OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

  // Mostrar mensaje de carga
  document.getElementById('result').innerHTML = '<p>Consultando...</p>';

  fetch(url)
    .then(response => {
      console.log('Status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Datos recibidos:', data);
      if (data.cod === 200) {
        document.getElementById('result').innerHTML = `
          <h2>El tiempo en ${data.name}, ${data.sys.country}</h2>
          <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
          <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
          <p><strong>Sensación térmica:</strong> ${data.main.feels_like} °C</p>
          <p><strong>Temperatura mínima:</strong> ${data.main.temp_min} °C</p>
          <p><strong>Temperatura máxima:</strong> ${data.main.temp_max} °C</p>
          <p><strong>Humedad:</strong> ${data.main.humidity} %</p>
          <p><strong>Presión:</strong> ${data.main.pressure} hPa</p>
          <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono clima">
        `;
      } else {
        document.getElementById('result').innerHTML = `
          <p><strong>Error:</strong> ${data.message}</p>
          <p>Código de error: ${data.cod}</p>
          <p>Intenta con otra ciudad o verifica que esté bien escrita.</p>
        `;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').innerHTML = `
        <p><strong>Error de conexión:</strong> No se pudo consultar el tiempo.</p>
        <p>Verifica tu conexión a internet o que la API key sea válida.</p>
      `;
    });
});