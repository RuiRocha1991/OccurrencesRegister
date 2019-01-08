<?php

$con= pg_connect("host=localhost dbname=IS_OccurrencesRegister user=postgres password=dados2018");

$action = isset($_GET['action']) ? $_GET['action']: null;

if($action == 'getAllPoints' ) {
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
} elseif($action == 'getPointHoles'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_holes&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPointLights'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_lights&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPointDeadBodies'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_deadBodies&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPointInundation'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_inundation&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPointGarbage'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_garbage&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getAllPolygons' ) {
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPolygonsHoles'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_holes&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPolygonsLights'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_lights&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPolygonsDeadBodies'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_deadBodies&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPolygonsInundation'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_inundation&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}elseif($action == 'getPolygonsGarbage'){
    $URL ='http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_garbage&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0';
    echo file_get_contents($URL);
}
?>