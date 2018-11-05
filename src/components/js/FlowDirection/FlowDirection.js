import urlClass from '@/components/js/UrlClass'
import axios from 'axios'
import global from '@/components/js/Global'
import drawClass from '@/components/js/DrawClass'
import PictureProperty from '../PipeBurst/PictureProperty';
import WindowsEvent from "@/components/js/WindowsEvent";
import DrawConditional from "./DrawConditional";
class Methods {
    DrawPipeFlowDirection(re, layer, field, conditional) {
        for (var i = 0; i < re.features.length; i++) {
            var feature = re.features[i];
            var flow = feature.attributes[field];
            var length = feature.attributes['HMIGeometryScaledLength'];
            var diameter = feature.attributes['Physical_PipeDiameter'];
            var path = feature.geometry.paths[0];
            
            if(length < conditional.length||diameter< conditional.diameter) continue;

            var fromP = path[0];
            var toP = path[1];
            var fx, fy, tx, ty, angle;

            if (flow > 0) {
                fx = fromP[0];
                fy = fromP[1];
                tx = toP[0];
                ty = toP[1]
            }
            else if (flow < 0) {
                fx = toP[0];
                fy = toP[1];
                tx = fromP[0];
                ty = fromP[1]
            }
            else {
                return;
            }

            var midX = (Number(fx) + Number(tx)) / 2;
            var midY = (Number(fy) + Number(ty)) / 2;

            if (fx >= tx && fy > ty)//第二象限
            {
                angle = (Math.atan((fx - tx) / (fy - ty)) * 180 / Math.PI) + 180 - 180;
            }
            else if (fx < tx && fy >= ty)//第一象限
            {
                angle = 180 - (Math.atan((tx - fx) / (fy - ty)) * 180 / Math.PI) - 180;
            }
            else if (fx <= tx && fy < ty)//第三象限
            {
                angle = Math.atan((tx - fx) / (ty - fy)) * 180 / Math.PI - 180;
            }
            else {
                angle = 360 - (Math.atan((fx - tx) / (ty - fy)) * 180 / Math.PI) - 180;
            }
            PictureProperty.SVGArrow.color = conditional.color;
            PictureProperty.SVGArrow.size = conditional.size;
            var gra1 = drawClass.CreateSVGGraphic(PictureProperty.SVGArrow, angle, new esri.geometry.Point(Number(midX), Number(midY), new esri.SpatialReference({ wkid: global.spatialReference })));
            layer.add(gra1);
        }
    }
    GetConditionalByScale(scale) {
        for (var i = 0; i < DrawConditional.conditionals.length; i++) {
            var minScale = DrawConditional.conditionals[i].minScale;
            var maxScale = DrawConditional.conditionals[i].maxScale;
            if (scale >= minScale && scale < maxScale) {
                return DrawConditional.conditionals[i];
            }
        }
    }
}
export default new Methods()