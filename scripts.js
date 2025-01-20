const token = "bf3f4259-6bd9-52db-5c62-913a2a4da1c4";
const estados = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Coahuila",
  "Colima",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Edo Mex",
  "Michoacan",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];
const estadosAlfabetico = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacan",
  "Morelos",
  "Edo Mex",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];
const informacion = [];
const id_inicio = 7000000;

async function hacer_consultas() {
  for (i = 0; i <= 31; i++) {
    informacion[i] = [estados[i], "0" + String(id_inicio + i + 1), ""];
    url =
      "https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001,1002000002,1002000003/es/" +
      informacion[i][1] +
      "/true/BISE/2.0/" +
      token +
      "?type=json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      informacion[i][2] = parseInt(data.Series[0].OBSERVATIONS[0].OBS_VALUE);
      informacion[i][3] = parseInt(data.Series[1].OBSERVATIONS[0].OBS_VALUE);
      informacion[i][4] = parseInt(data.Series[2].OBSERVATIONS[0].OBS_VALUE);
    } catch (error) {
      console.error(error);
    }
  }
}
async function ordenar() {
  informacion.sort((a, b) => {
    const numA = Number(a[2]);
    const numB = Number(b[2]);

    if (isNaN(numA) && isNaN(numB)) return 0;
    if (isNaN(numA)) return 1;
    if (isNaN(numB)) return -1;

    return numB - numA;
  });
}
function hacer_grafico() {
  var grafico = new CanvasJS.Chart("contenedor_grafico", {
    theme: "dark2",
    title: {
      text: "Estados de la República con mayor Población",
    },
    animationEnabled: true,
    data: [
      {
        type: "column",
        name: "Población general",
        showInLegend: true,
        dataPoints: [
          { label: informacion[0][0], y: informacion[0][2] },
          { label: informacion[1][0], y: informacion[1][2] },
          { label: informacion[2][0], y: informacion[2][2] },
          { label: informacion[3][0], y: informacion[3][2] },
          { label: informacion[4][0], y: informacion[4][2] },
        ],
      },
      {
        type: "column",
        name: "Población masculina",
        showInLegend: true,
        dataPoints: [
          { label: informacion[0][0], y: informacion[0][3] },
          { label: informacion[1][0], y: informacion[1][3] },
          { label: informacion[2][0], y: informacion[2][3] },
          { label: informacion[3][0], y: informacion[3][3] },
          { label: informacion[4][0], y: informacion[4][3] },
        ],
      },
      {
        type: "column",
        name: "Población femenina",
        showInLegend: true,
        dataPoints: [
          { label: informacion[0][0], y: informacion[0][4] },
          { label: informacion[1][0], y: informacion[1][4] },
          { label: informacion[2][0], y: informacion[2][4] },
          { label: informacion[3][0], y: informacion[3][4] },
          { label: informacion[4][0], y: informacion[4][4] },
        ],
      },
    ],
  });
  grafico.render();
}

hacer_consultas()
  .then(console.log(informacion))
  .then(() => ordenar())
  .then(console.log(informacion))
  .then(() => hacer_grafico())
  .then(console.log(informacion));
