const FALLBACK_IMAGE = '/car-fallback.svg';

const MODELOS_CONHECIDOS = [
  'Corolla Cross',
  'Land Cruiser',
  'Corolla',
  'Hilux',
  'RAV4',
  'Yaris',
  'Camry',
  'Prius',
  'Etios',
  'Supra',
  'SW4',
];

export function extractModelFamily(modelName) {
  const modelo = String(modelName);

  for (const nome of MODELOS_CONHECIDOS) {
    if (modelo.toLowerCase().includes(nome.toLowerCase())) {
      return nome;
    }
  }

  return modelo.split(' ')[0];
}

export function getVehicleImageUrl(brand, model) {
  const make = encodeURIComponent(brand);
  const modelFamily = encodeURIComponent(extractModelFamily(model));

  return `https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=${make}&modelFamily=${modelFamily}&zoomType=fullscreen&angle=23&width=640&height=360`;
}

export { FALLBACK_IMAGE };
