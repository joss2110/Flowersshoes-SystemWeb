import { Color } from "../color/color";
import { Talla } from "../talla/talla"

export interface Producto{
    idpro       :   number;
    codbar      :   string;
    imagen      :   string;
    nompro      :   string;
    precio      :   number;
    talla       :   Talla;
    color       :   Color;
    categoria   :   string;
    temporada   :   string;
    descripcion :   string;
    estado      :   string;
}

