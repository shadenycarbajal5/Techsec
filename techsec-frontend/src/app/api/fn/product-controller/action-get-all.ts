import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { ResponseProductGetAll } from '../../models/response-product-get-all';

export interface ProductGetAllParams {}

const MOCK_PRODUCTS: ResponseProductGetAll[] = [
  {
    id: 1,
    name: 'Cámara Domo IP 4MP Hikvision',
    category: { id: 1, name: 'Cámaras', description: 'Cámaras de seguridad' },
    description: 'Cámara domo metálica para interiores y exteriores, resolución 4 Megapíxeles, visión nocturna infrarroja EXIR hasta 30m, compresión H.265+.',
    specifications: 'Resolución: 2560x1440 | Lente: 2.8mm | Grado de protección: IP67 | Alimentación: PoE o 12VDC',
    price: 45.00,
    stock: 25,
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80'
  },
  {
    id: 2,
    name: 'Cámara Bullet Exterior Dahua 1080p',
    category: { id: 1, name: 'Cámaras', description: 'Cámaras de seguridad' },
    description: 'Cámara de seguridad exterior formato bala, resolución Full HD 1080p, iluminación IR inteligente de 20 metros, lente fijo.',
    specifications: 'Resolución: 1920x1080 | Lente: 3.6mm | Carcasa: Plástica | Tecnología: Multi-tecnología (HDCVI/AHD/TVI/CVBS)',
    price: 29.90,
    stock: 50,
    minStockAlert: 10,
    imageUrl: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80'
  },
  {
    id: 3,
    name: 'Kit de Video Seguridad (4 Cámaras + DVR)',
    category: { id: 1, name: 'Cámaras', description: 'Cámaras de seguridad' },
    description: 'Kit de CCTV completo para monitoreo residencial. Incluye DVR de 4 canales, 4 cámaras tipo bullet de 1080p, fuentes y cables listos para instalar.',
    specifications: 'DVR: H.265+ de 4 Canales | Accesorios: Fuentes, Conectores, 4 Rollos de cable de 18m | Almacenamiento: No incluye disco duro',
    price: 179.99,
    stock: 8,
    minStockAlert: 2,
    imageUrl: 'https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=400&q=80'
  },
  {
    id: 4,
    name: 'Tablero de Distribución Eléctrica Schneider 12 Polos',
    category: { id: 2, name: 'Equipos Eléctricos', description: 'Equipamiento de distribución' },
    description: 'Tablero eléctrico metálico para empotrar de 12 divisiones. Alta durabilidad y excelente acabado para distribución domiciliaria.',
    specifications: 'Material: Acero galvanizado | Capacidad: 12 Llaves monopolares | Tipo de montaje: Empotrar',
    price: 85.00,
    stock: 12,
    minStockAlert: 3,
    imageUrl: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&q=80'
  },
  {
    id: 5,
    name: 'Interruptor Termomagnético 2x20A Bticino',
    category: { id: 2, name: 'Equipos Eléctricos', description: 'Equipamiento de distribución' },
    description: 'Llave térmica bipolar de 20 amperios de la serie Domus Bticino, ideal para proteger circuitos de tomacorrientes e iluminación general.',
    specifications: 'Corriente nominal: 20 Amperios | Tensión: 230/400V | Capacidad de ruptura: 6kA | Curva de disparo: C',
    price: 12.50,
    stock: 120,
    minStockAlert: 15,
    imageUrl: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?w=400&q=80'
  },
  {
    id: 6,
    name: 'Bobina de Cable Coaxial RG6 + Energía 100m',
    category: { id: 3, name: 'Accesorios', description: 'Cableado y conectividad' },
    description: 'Bobina de cable siamés (coaxial RG6 más cable de energía de cobre) de 100 metros de longitud, ideal para instalaciones de CCTV en tramos largos.',
    specifications: 'Longitud: 100m | Coaxial: RG6 de alta conductividad | Hilos de corriente: 2 x 18AWG | Color: Negro',
    price: 24.90,
    stock: 35,
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=400&q=80'
  },
  {
    id: 7,
    name: 'Balun de Video Pasivo HD Dahua (Par)',
    category: { id: 3, name: 'Accesorios', description: 'Cableado y conectividad' },
    description: 'Transceptores pasivos de video por cable UTP. Transmite video de alta definición en tiempo real a distancias de hasta 400 metros.',
    specifications: 'Tecnologías soportadas: HDCVI/AHD/TVI/CVBS | Conector: Presión tipo push | Cantidad: 1 par (2 piezas)',
    price: 5.90,
    stock: 180,
    minStockAlert: 20,
    imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&q=80'
  },
  {
    id: 8,
    name: 'Fuente de Poder Regulada Centralizada 12V 10A 9CH',
    category: { id: 3, name: 'Accesorios', description: 'Cableado y conectividad' },
    description: 'Fuente de alimentación en gabinete metálico con fusible térmico PTC independiente por cada salida. Alimenta hasta 9 cámaras de seguridad.',
    specifications: 'Salida: 12V DC regulado | Corriente total: 10 Amperios | Canales: 9 salidas protegidas | Gabinete: Con chapa de seguridad',
    price: 19.99,
    stock: 15,
    minStockAlert: 4,
    imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=400&q=80'
  }
];

export function productGetAll(
  http: HttpClient,
  rootUrl: string,
  params?: ProductGetAllParams,
  context?: HttpContext
): Observable<StrictHttpResponse<ResponseProductGetAll[]>> {
  const rb = new RequestBuilder('GET', '/product');
  return http.request(
    rb.build(rootUrl)
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseProductGetAll[]>;
    }),
    catchError((err) => {
      console.warn('Real product service endpoint failed. Using mock catalog data.', err);
      // Simulate strict HttpResponse
      const mockRes = new HttpResponse({
        body: MOCK_PRODUCTS,
        status: 200,
        statusText: 'OK',
        url: `${rootUrl}/product`
      });
      return of(mockRes as StrictHttpResponse<ResponseProductGetAll[]>);
    })
  );
}
