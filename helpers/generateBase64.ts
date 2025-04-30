import { getCssVariableHex } from './littleSpicy';

// const generateBase64SVG = (
//     opacity: number = 0.8,
//     shadowOpacity: number = 0.5,
//     blurAmount: number = 4
// ): string => {
//     const color = getCssVariableHex('--header-color');
//     const shadowColor = getCssVariableHex('--text-color');

//     const svg = `
//       <svg xmlns="http://www.w3.org/2000/svg" width="320" height="200">
//         <defs>
//           <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
//             <feOffset dx="0" dy="0" />
//             <feGaussianBlur stdDeviation=${blurAmount} result="blur" />
//             <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k2="-1" k3="1" />
//             <feFlood flood-color="${shadowColor}" flood-opacity="${shadowOpacity}" result="color" />
//             <feComposite in="color" in2="blur" operator="in" />
//             <feComposite in="SourceGraphic" in2="blur" operator="over" />
//           </filter>
//         </defs>
//         <rect width="100%" height="100%" fill="${color}" fill-opacity="${opacity}" filter="url(#inner-shadow)" />
//       </svg>
//     `;

//     const base64 = Buffer.from(svg).toString('base64');
//     return `data:image/svg+xml;base64,${base64}`;
// };

const generateBase64 = (
    opacity: number = 1,
    shadowOpacity: number = 0.25,
    blurAmount: number = 4,
    width: number = 32,
    height: number = 20,
    borderRadius: number = 0,
    insetOffsetX: number = 0,
    insetOffsetY: number = 2
): string => {
    const color = getCssVariableHex('--header-color') || '#ff0000';
    const shadowColor = getCssVariableHex('--text-color') || '#000000';

    const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <filter id="innerShadow" x="0" y="0" width="100%" height="100%">
          <!-- Create the shape -->
          <feFlood flood-color="${color}" flood-opacity="${opacity}" result="shape"/>
          <feComposite in="SourceGraphic" in2="shape" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" result="composite1"/>
          
          <!-- Create inner shadow -->
          <feOffset dx="${insetOffsetX}" dy="${insetOffsetY}" result="offset"/>
          <feGaussianBlur stdDeviation="${blurAmount}" result="blur"/>
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
          <feFlood flood-color="${shadowColor}" flood-opacity="${shadowOpacity}" result="shadowColor"/>
          <feComposite in="shadowColor" in2="shadowDiff" operator="in" result="innerShadow"/>
          
          <!-- Combine shape with shadow -->
          <feComposite in="shape" in2="innerShadow" operator="over" result="final"/>
        </filter>
      </defs>
      <rect 
        width="${width}" 
        height="${height}" 
        rx="${borderRadius}" 
        ry="${borderRadius}" 
        fill="${color}" 
        fill-opacity="${opacity}" 
        filter="url(#innerShadow)"
      />
    </svg>
        `
        .replace(/\s+/g, ' ')
        .trim();
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
};

export default generateBase64;
