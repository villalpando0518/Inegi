var dummy = [
  ["uno", 50000, 30000, 20000],
  ["dos", 40000, 20000, 20000],
  ["tres", 30000, 20000, 10000],
  ["cuatro", 20000, 10000, 10000],
  ["cinco", 10000, 5000, 5000],
];

var grafico = new CanvasJS.Chart("contenedor_grafico", {
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
        { label: dummy[0][0], y: dummy[0][1] },
        { label: dummy[1][0], y: dummy[1][1] },
        { label: dummy[2][0], y: dummy[2][1] },
        { label: dummy[3][0], y: dummy[3][1] },
      ],
    },
    {
      type: "column",
      name: "Población femenina",
      showInLegend: true,
      dataPoints: [
        { label: dummy[0][0], y: dummy[0][2] },
        { label: dummy[1][0], y: dummy[1][2] },
        { label: dummy[2][0], y: dummy[2][2] },
        { label: dummy[3][0], y: dummy[3][2] },
      ],
    },
  ],
});

grafico.render();
